'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Job_Applications", deps: [JobSeekers, Jobs]
 * changeColumn "phone" on table "JobSeekers"
 * changeColumn "phone" on table "Recruiters"
 *
 **/

var info = {
    "revision": 9,
    "name": "Adding Job_Application model",
    "created": "2020-06-17T07:46:48.137Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Job_Applications",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "status": {
                    "type": Sequelize.ENUM('JS_VIEWED', 'JS_CALLED', 'R_CALLED'),
                    "field": "status"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "js_id": {
                    "type": Sequelize.INTEGER,
                    "field": "js_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "JobSeekers",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "job_id": {
                    "type": Sequelize.INTEGER,
                    "field": "job_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Jobs",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
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
