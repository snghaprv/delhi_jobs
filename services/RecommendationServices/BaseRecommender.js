const {
  JobSeeker,
  Locality,
  Category,
  sequelize,
} = require("../../database/models");
const moment = require("moment");

class BaseRecomemnder {
  constructor(jobseeker_id, filters = []) {
    return new Promise(async (resolve, reject) => {
      try {
        this.jobseeker_id = jobseeker_id;
        let inclusions = [
          { model: Category, as: "categories" },
          { model: Locality, as: "locality" } /*{model:User_Job_Category}*/,
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
        resolve(this);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  async getJobsToHide() {
    const query = `SELECT 
                         job_id
                    FROM
                        Job_Applications
                    WHERE
                        js_id = :jobseeker_id
                            AND status IN ("JS_CALLED") 
                            AND job_id IS NOT NULL
                    `;

    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: { jobseeker_id: this.jobseeker_id },
    });

    const jobs = data.map(({ job_id }) => job_id);
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

  getBaseQuerySting() {
    let baseQueryProjection = `j.id`;
    let baseQuerySource = `FROM Jobs j
                              LEFT JOIN Localities l ON l.id = j.locality_id
                              LEFT JOIN Categories c ON j.category_id = c.id
                              `;

    let baseQueryFilter = ` j.id NOT IN (:actioned_jobs)
                                AND ${this.getGenderQuery().filter}
                                AND ${this.getEducationQuery().filter}
                                `;

    return { baseQueryProjection, baseQuerySource, baseQueryFilter };
  }

  getDistanceScore(multiplier = 1) {
    let distanceString = ` WHEN (6371 * 2 * ASIN(SQRT(POWER(SIN((${this.geolocation.latitude} - abs(l.latitude)) * pi()/180 / 2),2) + COS(${this.geolocation.latitude} * pi()/180 ) * COS(abs(l.latitude) * pi()/180) * POWER(SIN((${this.geo_location.longitude} - l.longitude) * pi()/180 / 2), 2) )))`;

    let rankString = `CASE
                          ${distanceString} <  5 THEN ${1.0 * multiplier}
                          ${distanceString} < 10 THEN ${0.8 * multiplier}
                          ${distanceString} < 20 THEN ${0.6 * multiplier} 
                          ${distanceString} < 40 THEN ${0.4 * multiplier}
                      ELSE 0 
                      END`;
    return { rankString };
  }

  getCategoryScore(multiplier = 1) {
    let rankString =
      this.categories.length > 0
        ? ` CASE WHEN j.category_id IN (${this.categories}) THEN ${
            1 * multiplier
          } ELSE 0 END `
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
}

// async function test() {
//   let b = await new BaseRecomemnder(1);
//   const {
//     baseQueryProjection,
//     baseQuerySource,
//     baseQueryFilter,
//   } = b.getBaseQuerySting();

//   console.log(
//     `  SELECT ${baseQueryProjection},${b.getDistanceScore().rankString}, ${b.getCategoryScore().rankString} ${baseQuerySource} WHERE ${baseQueryFilter}`
//   );
//   console.log(b);
// }
// test();

module.exports = BaseRecomemnder;
