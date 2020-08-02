'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "is_call_allowed" to table "Recruiters"
 * changeColumn "status" on table "Job_Applications"
 * changeColumn "js_last_action" on table "Job_Application_Status"
 *
 **/

var info = {
    "revision": 17,
    "name": "iscalled column and js_applied status ENUM added",
    "created": "2020-08-01T07:46:29.395Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Recruiters",
            "is_call_allowed",
            {
                "type": Sequelize.BOOLEAN,
                "field": "is_call_allowed"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Job_Applications",
            "status",
            {
                "type": Sequelize.ENUM('JS_VIEWED', 'JS_CALLED', 'R_CALLED', 'R_REJECTED', 'JS_WHATSAPP', 'JS_APPLIED'),
                "field": "status"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Job_Application_Status",
            "js_last_action",
            {
                "type": Sequelize.ENUM('JS_CALLED', 'JS_WHATSAPP', 'JS_APPLIED'),
                "field": "js_last_action"
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
