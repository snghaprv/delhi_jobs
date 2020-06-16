'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "expiry_date" to table "Jobs"
 * addColumn "status" to table "Jobs"
 * changeColumn "maximum_salary" on table "Jobs"
 * changeColumn "minimum_salary" on table "Jobs"
 * changeColumn "phone" on table "JobSeekers"
 * changeColumn "phone" on table "Recruiters"
 *
 **/

var info = {
    "revision": 7,
    "name": "Job Model fields added and updated. v2",
    "created": "2020-06-16T10:11:06.574Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Jobs",
            "expiry_date",
            {
                "type": Sequelize.DATEONLY,
                "field": "expiry_date"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Jobs",
            "status",
            {
                "type": Sequelize.ENUM('ACTIVE', 'DEACTIVATED', 'BLOCKED', 'EXPIRED'),
                "field": "status"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Jobs",
            "maximum_salary",
            {
                "type": Sequelize.INTEGER,
                "field": "maximum_salary",
                "validate": {
                    "min": 999,
                    "max": 99999
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Jobs",
            "minimum_salary",
            {
                "type": Sequelize.INTEGER,
                "field": "minimum_salary",
                "validate": {
                    "min": 999,
                    "max": 99999
                },
                "allowNull": true
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
