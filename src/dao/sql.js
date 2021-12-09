// import settings
const settings = require('../../settings.js');
const sqlCredentials = settings.sqlCredentials;

// import required libs
const mysql = require('mysql');

var db = null;
const dbClass = class sqlDAO {
  constructor() {
    try {
      // connect DB
      this.database = mysql.createConnection({
        host: sqlCredentials.host,
        port: sqlCredentials.port,
        user: sqlCredentials.user,
        password: sqlCredentials.password,
        database: sqlCredentials.dbName,
      });
      this.database.connect();
    } catch (err) {
      console.warn('COULD NOT CONNECT TO DATABASE, CHECK YOUR ENV PARAMS');
    }
  }

  get() {
    return new Promise((resolve) => {
      // query that gets all files
      this.database.query(
        `SELECT * FROM ${sqlCredentials.dbName}.${sqlCredentials.tableName}`,
        (err, res) => {
          if (err) throw err;
          else resolve(res);
        },
      );
    });
  }

  insert(data) {
    return new Promise((resolve) => {
      // query that inserts new entries
      this.database.query(
        `INSERT INTO ${sqlCredentials.dbName}.${sqlCredentials.tableName} SET ?`,
        data,
        (err, res) => {
          if (err) throw err;
          else resolve('ok');
        },
      );
    });
  }
};

module.exports = function () {
  // will only initiate db DAO class if it isn't in cache
  if (!db) db = new dbClass();
  return db;
};
