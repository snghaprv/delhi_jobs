const cities = require('../dumps/Cities.json');
const categories = require('../dumps/Categories.json');
const qualifications = require('../dumps/Qualifications.json');
const localities = require('../dumps/Localities.json');
const languages = require('../dumps/Languages.json')
const gender = [
    {id:'MALE', label: 'Male'},
    {id:'FEMALE', label:'Female'}
 ]

const getJobSeekerRegistrationMetaData = async function(req,res){

    const metadata = {cities,categories,qualifications,localities,gender,languages};
    return res.sendSuccessResponse(metadata);
}

module.exports ={
    getJobSeekerRegistrationMetaData
}
