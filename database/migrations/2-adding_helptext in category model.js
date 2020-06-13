'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "helptext" to table "Categories"
 * changeColumn "phone" on table "JobSeekers"
 * changeColumn "phone" on table "Recruiters"
 *
 **/

var info = {
    "revision": 2,
    "name": "adding helptext in category model",
    "created": "2020-06-13T04:31:50.816Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Categories",
            "helptext",
            {
                "type": Sequelize.STRING,
                "field": "helptext"
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
