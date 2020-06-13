const {
  JobSeeker,
  Locality,
  City,
  Category,
  Qualification,
} = require("../database/models");

const getProfile = async function (req, res) {
  try {
    const jobseeker_id = req.token.id;
    const inclusions = [
      {
        model: Category,
        attributes: ["label", "id"],
        through: {
          attributes: [],
        },
      },
      {
        model: Locality,
        attributes: ["id", "label"],
      },
      {
        model: Qualification,
        attributes: ["id", "label"],
      },
      {
        model: City,
        attributes: ["id", "label"],
      },
    ];

    const jobseeker = await JobSeeker.findOne({
      where: {
        id: jobseeker_id,
      },
      include: inclusions,
    });
    return res.sendSuccessResponse(jobseeker);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const editProfile = async function (req, res) {
  const allowed_fields = ["first_name", "last_name", "gender"];
  
  try {
    const jobseeker_id = req.token.id;
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

module.exports = {
  getProfile,
};
