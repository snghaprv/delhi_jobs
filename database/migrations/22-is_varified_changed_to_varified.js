'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "is_varified" from table "Companies"
 * addColumn "varified" to table "Companies"
 * changeColumn "shift_end_time" on table "Jobs"
 * changeColumn "shift_start_time" on table "Jobs"
 * changeColumn "phone" on table "JobSeekers"
 * changeColumn "phone" on table "Recruiters"
 *
 **/

var info = {
    "revision": 22,
    "name": "is_varified_changed_to_varified",
    "created": "2020-08-11T17:51:56.970Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Companies", "is_varified"]
    },
    {
        fn: "addColumn",
        params: [
            "Companies",
            "varified",
            {
                "type": Sequelize.BOOLEAN,
                "field": "varified",
                "defaultValue": false,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Jobs",
            "shift_end_time",
            {
                "type": Sequelize.TIME,
                "field": "shift_end_time",
                "validate": {},
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Jobs",
            "shift_start_time",
            {
                "type": Sequelize.TIME,
                "field": "shift_start_time",
                "validate": {},
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
