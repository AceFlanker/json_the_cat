const request = require('request');


const requestAddress = 'http://api.thecatapi.com/v1/breeds/search';

const fetchBreedDescription = function(breed, callback) {
  request(requestAddress + '?q=' + breed, (error, response, body) => {
    const report = [error];
    if (error === null) {
      if (body !== '[]' && body !== undefined) {
        report.push(JSON.parse(body)[0].description);
      } else {
        report.push(null);
      }
    } else {
      report.push(null);
    }
    callback(report[0], report[1]);
  });
};

module.exports = {
  fetchBreedDescription
};