'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "other_city" to table "Jobs"
 * addColumn "job_type" to table "Jobs"
 * addColumn "skills" to table "Jobs"
 * addColumn "incentives_applicable" to table "Jobs"
 * addColumn "maximum_experience" to table "Jobs"
 * addColumn "minimum_experience" to table "Jobs"
 * changeColumn "working_days" on table "Jobs"
 * changeColumn "gender" on table "Jobs"
 * changeColumn "phone" on table "JobSeekers"
 * changeColumn "phone" on table "Recruiters"
 *
 **/

var info = {
    "revision": 6,
    "name": "Job Model fields added and updated",
    "created": "2020-06-16T08:25:05.237Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Jobs",
            "other_city",
            {
                "type": Sequelize.STRING,
                "field": "other_city"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "job_type",
            {
                "type": Sequelize.ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT', 'WORK_FROM_HOME'),
                "field": "job_type"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "skills",
            {
                "type": Sequelize.STRING,
                "field": "skills"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "incentives_applicable",
            {
                "type": Sequelize.BOOLEAN,
                "field": "incentives_applicable"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "maximum_experience",
            {
                "type": Sequelize.INTEGER,
                "field": "maximum_experience",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "minimum_experience",
            {
                "type": Sequelize.INTEGER,
                "field": "minimum_experience",
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Jobs",
            "working_days",
            {
                "type": Sequelize.ENUM('5_DAYS_WORKING', '6_DAYS_WORKING', 'OTHERS'),
                "field": "working_days"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Jobs",
            "gender",
            {
                "type": Sequelize.ENUM('MALE', 'FEMALE', 'ANY'),
                "field": "gender"
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
