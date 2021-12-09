const database = require('../dao/sql.js');
const { v4: uuidv4 } = require('uuid');

module.exports.postFunction = async (body, file) => {
  // simple validation
  if (!body.title || typeof body.title != 'string')
    return 'Invalid or missing video title';
  if (!file || !file.buffer || !file.mimetype.includes('video'))
    return 'Invalid or missing video file';

  try {
    file.id = uuidv4(); // unique id (check get.js filename for more)
    file.date = new Date().toISOString(); // get upload date
    file = Buffer.from(JSON.stringify(file, null, '\t')); // Buffer video data
    var queryResult = await database().insert({
      title: body.title,
      video: file,
    });
    return queryResult; // queryResult is a placeholder, no need to return something useful yet
  } catch (err) {
    return 'Something went wrong with your upload.';
  }
};
