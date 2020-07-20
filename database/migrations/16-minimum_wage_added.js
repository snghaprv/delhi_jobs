'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "minimum_wage" to table "Localities"
 *
 **/

var info = {
    "revision": 16,
    "name": "minimum_wage added",
    "created": "2020-07-20T15:19:57.791Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Localities",
            "minimum_wage",
            {
                "type": Sequelize.INTEGER,
                "field": "minimum_wage"
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
