require('dotenv').config();
var settings = {};

var sqlCredentials = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  dbName: process.env.DATABASE_NAME,
  tableName: process.env.TABLE_NAME,
};

var errMsg = '';
for (var key of Object.keys(sqlCredentials))
  if (!sqlCredentials[key])
    errMsg += `MISSING REQUIRED KEY: ${key.toUpperCase()};\n`;

if (errMsg)
  console.warn(
    `=================================\n\n${errMsg.slice(0, -2)}.\n\n`,
  );

settings.sqlCredentials = sqlCredentials;
module.exports = settings;
