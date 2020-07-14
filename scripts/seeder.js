const categories = require("../dumps/Categories.json");
const cities = require("../dumps/Cities.json");
const languages = require("../dumps/Languages.json");
const localities = require("../dumps/Localities.json");
const qualifications = require("../dumps/Qualifications.json");
const {
  Locality,
  City,
  Category,
  Qualification,
  Language,
} = require("../database/models");

const populateDatabase = async function () {
  await Locality.bulkCreate(localities, {
    updateOnDuplicate: ["label"],
  });
  await Category.bulkCreate(categories, {
    updateOnDuplicate: ["label", "helptext"],
  });
  await City.bulkCreate(cities, {
    updateOnDuplicate: ["label"],
  });
  await Qualification.bulkCreate(qualifications, {
    updateOnDuplicate: ["label"],
  });
  await Language.bulkCreate(languages, {
    updateOnDuplicate: ["label"],
  });
};
try{
    populateDatabase();
}catch(error){
    console.log(error)
}

