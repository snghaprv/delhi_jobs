'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "last_name" from table "JobSeekers"
 * removeColumn "date_of_birth" from table "JobSeekers"
 * removeColumn "current_salary" from table "JobSeekers"
 * removeColumn "first_name" from table "JobSeekers"
 * removeColumn "first_name" from table "Recruiters"
 * removeColumn "last_name" from table "Recruiters"
 * addColumn "name" to table "JobSeekers"
 * addColumn "name" to table "Recruiters"
 * addColumn "worked_before" to table "JobSeekers"
 * changeColumn "phone" on table "Recruiters"
 * changeColumn "phone" on table "JobSeekers"
 *
 **/

var info = {
    "revision": 2,
    "name": "changing jobseeker table fields",
    "created": "2020-06-13T10:28:41.585Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["JobSeekers", "last_name"]
    },
    {
        fn: "removeColumn",
        params: ["JobSeekers", "date_of_birth"]
    },
    {
        fn: "removeColumn",
        params: ["JobSeekers", "current_salary"]
    },
    {
        fn: "removeColumn",
        params: ["JobSeekers", "first_name"]
    },
    {
        fn: "removeColumn",
        params: ["Recruiters", "first_name"]
    },
    {
        fn: "removeColumn",
        params: ["Recruiters", "last_name"]
    },
    {
        fn: "addColumn",
        params: [
            "JobSeekers",
            "name",
            {
                "type": Sequelize.STRING,
                "field": "name"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Recruiters",
            "name",
            {
                "type": Sequelize.STRING,
                "field": "name"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "JobSeekers",
            "worked_before",
            {
                "type": Sequelize.BOOLEAN,
                "field": "worked_before",
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
