// import required libs
const { getVideoDurationInSeconds } = require('get-video-duration');
const fs = require('fs');

// import sql DAO
const database = require('../dao/sql.js');

// get all videos function
module.exports.getFunction = async () => {
  var allData = await database().get();
  var processedData = [];
  for (var data of allData) {
    processedData.push(
      new Promise(async (resolve) => {
        // pushing Promises do all video tasks simultaneously, greatly reducing task time
        var videoData = JSON.parse(data.video.toString()); // transform buffer data to json
        var fileName = `./src/videos/${
          videoData.originalname.replace(/\./g, '') || ''
        }_${videoData.id}.${videoData.mimetype.split('/')[1]}`; // using id in filename we guarantee that the filename is unique
        if (!fs.existsSync(fileName)) { // no need to overwrite files
          var videoFile = Buffer.from(videoData.buffer); // get filedata
          fs.writeFileSync(fileName, videoFile);
        }
        var videoLength = await getVideoDurationInSeconds(fileName);
        videoLength = `${Math.floor(videoLength / 60)}min${Math.floor(
          videoLength - Math.floor(videoLength / 60),
        )}s`; // get video length using external lib
        resolve({
          title: data.title,
          year: new Date(videoData.date).getFullYear(),
          duration: videoLength,
          link: process.cwd() + fileName.substring(1).replace(/\//g, '\\'),
        });
      }),
    );
  }
  processedData = await Promise.all(processedData); // waits for all tasks to finish
  return JSON.stringify(processedData, null, '\t');
};
