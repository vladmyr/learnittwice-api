'use strict';

var fs = require('fs');

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db
    .createTable('Language', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      iso: {
        type: 'char',
        length: 5,
        notNull: true,
        unique: true
      }
    })
    .then(() => {
      return db.addIndex('Language', 'idx_language__iso', ['iso'], true);
    })
    .then(() => {
      fs.readFile(
        'src/App/Persistence/Repositories/Postgres/Seeds/0001_seed_table_language.sql', 
        'utf8',
        (err, sqlSeed) => {
          if (err) throw err;
          return db.runSql(sqlSeed);
      });
    })
};

exports.down = function(db) {
  return db
    .removeIndex('Language', 'idx_language__iso')
    .then(() => {
      return db.dropTable('Language');
    })
};

exports._meta = {
  "version": 1
};
