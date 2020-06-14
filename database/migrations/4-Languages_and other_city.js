'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Languages", deps: []
 * addColumn "other_city" to table "JobSeekers"
 * addColumn "language_id" to table "JobSeekers"
 * changeColumn "phone" on table "JobSeekers"
 * changeColumn "phone" on table "Recruiters"
 *
 **/

var info = {
    "revision": 4,
    "name": "Languages and other_city",
    "created": "2020-06-14T06:27:15.456Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Languages",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label"
                },
                "helptext": {
                    "type": Sequelize.STRING,
                    "field": "helptext"
                }
            },
            {}
        ]
    },
    {
        fn: "addColumn",
        params: [
            "JobSeekers",
            "other_city",
            {
                "type": Sequelize.STRING,
                "field": "other_city",
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "JobSeekers",
            "language_id",
            {
                "type": Sequelize.INTEGER,
                "field": "language_id",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "Languages",
                    "key": "id"
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
