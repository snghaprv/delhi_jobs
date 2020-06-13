'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Categories", deps: []
 * createTable "Cities", deps: []
 * createTable "Companies", deps: []
 * createTable "Jobs", deps: []
 * createTable "Qualifications", deps: []
 * createTable "Recruiters", deps: []
 * createTable "Localities", deps: [Cities]
 * createTable "JobSeekers", deps: [Qualifications, Localities, Cities]
 * createTable "JobSeeker_Category", deps: [Categories, JobSeekers]
 *
 **/

var info = {
    "revision": 1,
    "name": "1st migration",
    "created": "2020-06-13T04:12:06.462Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Categories",
            {
                "id": {
                    "type": Sequelize.STRING,
                    "field": "id",
                    "primaryKey": true
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Cities",
            {
                "id": {
                    "type": Sequelize.STRING,
                    "field": "id",
                    "primaryKey": true
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Companies",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "website": {
                    "type": Sequelize.STRING,
                    "field": "website"
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "unique": true
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Jobs",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "title": {
                    "type": Sequelize.STRING,
                    "field": "title"
                },
                "description": {
                    "type": Sequelize.TEXT,
                    "field": "description"
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Qualifications",
            {
                "id": {
                    "type": Sequelize.STRING,
                    "field": "id",
                    "primaryKey": true
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Recruiters",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name"
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name"
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "validate": {},
                    "unique": true
                },
                "other_phone": {
                    "type": Sequelize.STRING,
                    "field": "other_phone"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": {
                            "msg": "INVALID_EMAIL"
                        }
                    },
                    "allowNull": true
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
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Localities",
            {
                "id": {
                    "type": Sequelize.STRING,
                    "field": "id",
                    "primaryKey": true
                },
                "label": {
                    "type": Sequelize.STRING,
                    "field": "label"
                },
                "latitude": {
                    "type": Sequelize.FLOAT,
                    "field": "latitude"
                },
                "longitude": {
                    "type": Sequelize.FLOAT,
                    "field": "longitude"
                },
                "city_id": {
                    "type": Sequelize.STRING,
                    "field": "city_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Cities",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "JobSeekers",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "primaryKey": true,
                    "autoIncrement": true
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone",
                    "validate": {},
                    "unique": true
                },
                "first_name": {
                    "type": Sequelize.STRING,
                    "field": "first_name"
                },
                "last_name": {
                    "type": Sequelize.STRING,
                    "field": "last_name"
                },
                "date_of_birth": {
                    "type": Sequelize.DATEONLY,
                    "field": "date_of_birth"
                },
                "gender": {
                    "type": Sequelize.ENUM('MALE', 'FEMALE'),
                    "field": "gender"
                },
                "current_salary": {
                    "type": Sequelize.INTEGER,
                    "field": "current_salary"
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "validate": {
                        "isEmail": {
                            "msg": "INVALID_EMAIL"
                        }
                    },
                    "allowNull": true
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
                "qualification_id": {
                    "type": Sequelize.STRING,
                    "field": "qualification_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Qualifications",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "locality_id": {
                    "type": Sequelize.STRING,
                    "field": "locality_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Localities",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "city_id": {
                    "type": Sequelize.STRING,
                    "field": "city_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Cities",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "JobSeeker_Category",
            {
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
                "category_id": {
                    "type": Sequelize.STRING,
                    "field": "category_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Categories",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "js_id": {
                    "type": Sequelize.INTEGER,
                    "field": "js_id",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "JobSeekers",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
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
