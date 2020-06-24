"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * changeColumn "gender" on table "JobSeekers"
 *
 **/

var info = {
  revision: 12,
  name: "JobSeeker model gender ENUM OTHER added",
  created: "2020-06-24T15:29:35.648Z",
  comment: "",
};

var migrationCommands = [
  {
    fn: "changeColumn",
    params: [
      "JobSeekers",
      "gender",
      {
        type: Sequelize.ENUM("MALE", "FEMALE", "OTHER"),
        field: "gender",
      },
    ],
  },
];

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#" + index + "] execute: " + command.fn);
          queryInterface[command.fn].apply(queryInterface, command.params).then(
            () =>
              queryInterface.logMigration
                ? queryInterface
                    .logMigration(null, command, index, info)
                    .then(next)
                : next,
            (err) =>
              queryInterface.logMigration
                ? queryInterface
                    .logMigration(err, command, index, info)
                    .then(reject)
                : reject
          );
          index++;
        } else resolve();
      }
      next();
    });
  },
  info: info,
  migrationCommands: migrationCommands,
};
