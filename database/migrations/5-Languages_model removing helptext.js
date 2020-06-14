'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "helptext" from table "Languages"
 * changeColumn "phone" on table "JobSeekers"
 * changeColumn "phone" on table "Recruiters"
 *
 **/

var info = {
    "revision": 5,
    "name": "Languages model removing helptext",
    "created": "2020-06-14T06:33:19.036Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Languages", "helptext"]
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
