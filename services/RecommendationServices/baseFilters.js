const metadata = require ('../../services/MetaDataServices.js');
const {localities,categories} = metadata;

const getFilters = async function(){
    const filters = [{
        "header": "जिला चुनें (District)",
        "title" : "जिला चुनें (District)",
        "id": "locality",
        "type": "multi_select",
        "is_selected": false,
        "options": localities.map(({id,label}) => ({id,label,is_selected:false}))
    },{
        "header": "रोल चुनें (Job Category)",
        "title" : "रोल चुनें (Job Category)",
        "id": "category",
        "type": "multi_select",
        "is_selected": false,
        "options": categories.map(({id,label}) => ({id,label,is_selected:false}))
    }]

    return filters;

}
module.exports =getFilters