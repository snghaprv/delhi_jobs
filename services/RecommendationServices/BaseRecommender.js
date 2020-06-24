const {
  JobSeeker,
  Locality,
  Category,
  sequelize,
  Job,
} = require("../../database/models");
const moment = require("moment");

class BaseRecommender {
  constructor(jobseeker_id, filters = []) {
    return new Promise(async (resolve, reject) => {
      try {
        this.jobseeker_id = jobseeker_id;
        let inclusions = [
          { model: Category, as: "categories" },
          { model: Locality, as: "locality" },
        ];

        let jobseeker = await JobSeeker.findOne({
          where: { id: jobseeker_id },
          include: inclusions,
        });
        jobseeker = jobseeker.toJSON();
        this.city_id = jobseeker.city_id;
        this.locality_id = jobseeker.locality_id;
        this.qualification_id = jobseeker.qualification_id;
        this.gender = jobseeker.gender;
        this.categories = jobseeker.categories.map(({ id }) => id);
        let { latitude, longitude } = jobseeker.locality
          ? jobseeker.locality
          : { latitude: null, longitude: null };
        this.geolocation = { latitude, longitude };
        this.actioned_jobs = await this.getJobsToHide();
        this.filterString = [];
        this.replacements = {
          jobseeker_id: this.jobseeker_id,
          localities: [],
          categories: [],
          actioned_jobs: this.actioned_jobs,
        };
        this.job_ids = [];
        this.job_count =0;

        this.setFilters(filters);
        resolve(this);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  setFilters(filters) {
    let locality_filters = filters.find(
      (d) => d.id == "locality" && d.is_selected == true
    );
    let category_filters = filters.find(
      (d) => d.id == "category" && d.is_selected == true
    );

    if (locality_filters) {
      let localities = locality_filters.options
        .filter((locality) => locality.is_selected == true)
        .map((d) => d.id);
      this.replacements = { ...this.replacements, localities };
      this.filterString.push(this.getLocalityQuery().filter);
    }
    if (category_filters) {
      let categories = category_filters.options
        .filter((category) => category.is_selected == true)
        .map((d) => d.id);
      this.replacements = { ...this.replacements, categories };
      this.filterString.push(this.getCategoryQuery().filter);
    }
  }
  async getJobsToHide() {
    const query = `SELECT 
                         job_id
                    FROM
                        Job_Application_Status
                    WHERE
                        js_id = :jobseeker_id
                    `;

    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { jobseeker_id: this.jobseeker_id },
    });

    const jobs = data.map(({ job_id }) => job_id);
    jobs = [...jobs,-1]
    return jobs;
  }
  getEducationQuery() {
    let filter = ``;
    let QUALIFICATIONS = {
      1: `(1)`,
      2: `(1,2)`,
      3: `(1,2,3)`,
      4: `(1,2,3,4)`,
      5: `(1,2,3,4,5)`,
      6: `(1,2,3,4,5,6)`,
      null: `(1,2,3,4,5,6)`,
    };

    filter = ` (j.qualification_id IN ${
      QUALIFICATIONS[this.qualification_id]
    } OR j.qualification_id IS NULL) `;

    return { filter };
  }

  getGenderQuery() {
    let GENDER = {
      MALE: ` (j.gender IN ('MALE','ANY')) `,
      FEMALE: ` (j.gender IN ('FEMALE','ANY')) `,
      null: ` (j.gender IN ('ANY')) `,
      "": `(j.gender IN ('ANY'))`, // Handling edge case of empty string as user gender.
    };

    let filter = GENDER[this.gender];
    return { filter };
  }
  getLocalityQuery(localities = []) {
    let filter = ` (j.locality_id IN (:localities) ) `;
    this.replacements.localities = [
      ...this.replacements.localities,
      ...localities,
    ];
    return { filter };
  }
  getCategoryQuery(categories = []) {
    let filter = ` (j.category_id IN (:categories) ) `;
    this.replacements.categories = [
      ...this.replacements.categories,
      ...categories,
    ];
    return { filter };
  }
  getBaseQueryStrings() {
    const today = moment().format("YYYY-MM-DD");
    let baseQueryProjection = `j.id`;
    let baseQuerySource = `
    FROM 
      Jobs j
        LEFT JOIN
      Localities l ON l.id = j.locality_id
        LEFT JOIN
      Categories c ON j.category_id = c.id
      `;

    let baseQueryFilter = ` j.id NOT IN (:actioned_jobs)
        AND ${this.getGenderQuery().filter}
        AND ${this.getEducationQuery().filter}
        AND expiry_date >= '${today}'
        AND status ='ACTIVE'
                                `;

    return { baseQueryProjection, baseQuerySource, baseQueryFilter };
  }

  getDistanceScore(multiplier = 1) {
    let distanceString = ` WHEN 
                              (6371 * 2 * ASIN(SQRT(POWER(SIN((${this.geolocation.latitude} - abs(l.latitude)) * pi()/180 / 2),
                                                        2) + COS(${this.geolocation.latitude} * pi()/180 ) * COS(abs(l.latitude) * pi()/180) * POWER(SIN((${this.geolocation.longitude} - l.longitude) * pi()/180 / 2), 2) ))
                                                        )`;

    let rankString = `
                      CASE
                          ${distanceString} <  5 
                          THEN ${1.0 * multiplier}
                          ${distanceString} < 10 
                          THEN ${0.8 * multiplier}
                          ${distanceString} < 20 
                          THEN ${0.6 * multiplier} 
                          ${distanceString} < 40 
                          THEN ${0.4 * multiplier}
                      ELSE 0 
                    END`;
    return { rankString };
  }

  getCategoryScore(multiplier = 1) {
    let rankString =
      this.categories.length > 0
        ? ` 
        CASE 
          WHEN j.category_id IN (${this.categories}) THEN ${1 * multiplier}
          ELSE 0
        END`
        : ` 0 `;

    return { rankString };
  }
  async getRecommendedJobs() {
    let jobs = await Job.findAll({
      attributes: ["id"],
    });
    jobs = jobs.map((job) => job.toJSON());
    jobs = jobs.map(({ id }) => id);
    return jobs;
  }

  async getRecommendedJobs() {
    const {
      baseQueryProjection,
      baseQuerySource,
      baseQueryFilter,
    } = this.getBaseQueryStrings();

    const distanceScore = this.getDistanceScore().rankString;
    const categoryScore = this.getCategoryScore().rankString;
    let whereClause = [`WHERE ${baseQueryFilter}`];

        if(Object.keys(this.filterString).length>0){
          whereClause = [...whereClause,...this.filterString];
        }
        let whereString = whereClause.join(` AND `);

        const job_query =`SELECT
                    ${baseQueryProjection},
                    ${distanceScore} +
                    ${categoryScore}
                    AS score 
                    ${baseQuerySource}
                    ${whereString} 
                    ORDER BY score DESC,  j.id DESC
             `
       const job_count_query = `SELECT 
                                  COUNT(*) AS job_count
                                ${baseQuerySource}
                                ${whereString} 
                                `
     await this.getJobsData(job_query,job_count_query);
     return {
       job_ids : this.job_ids,
       job_count : this.job_count
     } 
  }


  async getJobsData(job_query,job_count_query){

    let [job_ids,[count]] = await Promise.all([
        sequelize.query(job_query, {
            replacements: this.replacements,
            type: sequelize.QueryTypes.SELECT
        }),
        sequelize.query(job_count_query, {
            replacements: this.replacements,
            type: sequelize.QueryTypes.SELECT
        })
    ])
    job_ids = job_ids.map(({id})=>id);
    this.job_ids = job_ids;
    this.job_count =count.job_count;
}
}

module.exports = BaseRecommender;
