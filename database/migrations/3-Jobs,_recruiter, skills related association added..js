'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Skills", deps: []
 * createTable "Job_Skills", deps: [Jobs, Skills]
 * createTable "Category_Skills", deps: [Categories, Skills]
 * addColumn "company_id" to table "Recruiters"
 * addColumn "recruiter_id" to table "Jobs"
 * addColumn "maximum_salary" to table "Jobs"
 * addColumn "shift_start_time" to table "Jobs"
 * addColumn "shift_end_time" to table "Jobs"
 * addColumn "job_address" to table "Jobs"
 * addColumn "working_days" to table "Jobs"
 * addColumn "qualification_id" to table "Jobs"
 * addColumn "gender" to table "Jobs"
 * addColumn "city_id" to table "Jobs"
 * addColumn "category_id" to table "Jobs"
 * addColumn "no_of_openings" to table "Jobs"
 * addColumn "minimum_salary" to table "Jobs"
 * addColumn "locality_id" to table "Jobs"
 * changeColumn "phone" on table "Recruiters"
 * changeColumn "phone" on table "JobSeekers"
 *
 **/

var info = {
    "revision": 3,
    "name": "Jobs, recruiter, skills related association added.",
    "created": "2020-06-14T05:21:35.857Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Skills",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "unique": true
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label",
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Job_Skills",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "job_id": {
                    "type": Sequelize.INTEGER,
                    "field": "job_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Jobs",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "skill_id": {
                    "type": Sequelize.INTEGER,
                    "field": "skill_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Skills",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Category_Skills",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "category_id": {
                    "type": Sequelize.INTEGER,
                    "field": "category_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "skill_id": {
                    "type": Sequelize.INTEGER,
                    "field": "skill_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Skills",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Recruiters",
            "company_id",
            {
                "type": Sequelize.INTEGER,
                "field": "company_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Companies",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "recruiter_id",
            {
                "type": Sequelize.INTEGER,
                "field": "recruiter_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Recruiters",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "maximum_salary",
            {
                "type": Sequelize.INTEGER,
                "field": "maximum_salary",
                "validate": {
                    "max": 99999
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "shift_start_time",
            {
                "type": Sequelize.TIME,
                "field": "shift_start_time",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "shift_end_time",
            {
                "type": Sequelize.TIME,
                "field": "shift_end_time",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "job_address",
            {
                "type": Sequelize.STRING,
                "field": "job_address"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "working_days",
            {
                "type": Sequelize.ENUM('5 days working', '6 days working', '7 days working', 'Others'),
                "field": "working_days"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "qualification_id",
            {
                "type": Sequelize.INTEGER,
                "field": "qualification_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Qualifications",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "gender",
            {
                "type": Sequelize.ENUM('MALE', 'FEMALE'),
                "field": "gender"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "city_id",
            {
                "type": Sequelize.INTEGER,
                "field": "city_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Cities",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "category_id",
            {
                "type": Sequelize.INTEGER,
                "field": "category_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Categories",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "no_of_openings",
            {
                "type": Sequelize.INTEGER,
                "field": "no_of_openings",
                "validate": {
                    "max": 9999
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "minimum_salary",
            {
                "type": Sequelize.INTEGER,
                "field": "minimum_salary",
                "validate": {
                    "min": 999
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "locality_id",
            {
                "type": Sequelize.INTEGER,
                "field": "locality_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Localities",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Recruiters",
            "phone",
            {
                "type": Sequelize.STRING,
                "field": "phone",
                "validate": {},
                "unique": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "JobSeekers",
            "phone",
            {
                "type": Sequelize.STRING,
                "field": "phone",
                "validate": {},
                "unique": true
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    queryInterface[command.fn].apply(queryInterface, command.params).then(
                        () => queryInterface.logMigration
                          ? queryInterface.logMigration(null, command, index, info).then(next)
                          : next,
                        (err) => queryInterface.logMigration
                          ? queryInterface.logMigration(err, command, index, info).then(reject)
                          : reject
                    );
                    index++;
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info,
    migrationCommands: migrationCommands
};
