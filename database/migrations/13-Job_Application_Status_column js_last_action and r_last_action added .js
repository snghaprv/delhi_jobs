'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "js_last_action" to table "Job_Application_Status"
 * addColumn "r_last_action" to table "Job_Application_Status"
 * changeColumn "shift_start_time" on table "Jobs"
 * changeColumn "shift_end_time" on table "Jobs"
 * changeColumn "phone" on table "JobSeekers"
 * changeColumn "status" on table "Job_Applications"
 * changeColumn "phone" on table "Recruiters"
 *
 **/

var info = {
    "revision": 13,
    "name": "Job_Application_Status column js_last_action and r_last_action added ",
    "created": "2020-06-25T07:12:00.673Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Job_Application_Status",
            "js_last_action",
            {
                "type": Sequelize.ENUM('JS_CALLED', 'JS_WHATSAPP'),
                "field": "js_last_action"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Job_Application_Status",
            "r_last_action",
            {
                "type": Sequelize.ENUM('R_CALLED', 'R_REJECTED'),
                "field": "r_last_action"
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
            "Job_Applications",
            "status",
            {
                "type": Sequelize.ENUM('JS_VIEWED', 'JS_CALLED', 'R_CALLED', 'R_REJECTED', 'JS_WHATSAPP'),
                "field": "status"
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
