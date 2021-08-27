// const argv = process.argv.slice(2);
const request = require('request');
// const breed = argv.join(' ');


const requestAddress = 'http://api.thecatapi.com/v1/breeds/search';

const fetchBreedDescription = function(breed, callback) {
  request(requestAddress + '?q=' + breed, (error, response, body) => {
    const report = [error];
    if (error === null) {
      if (body !== '[]' && body !== undefined) {
        report.push(breed + ': ' + JSON.parse(body)[0].description);
      } else {
        report.push('Breed: ' + breed + ' not found in the database.');
      }
    }
    callback(report[0], report[1]);
  });
};

// console.log(findBreed('Persian'));

module.exports = {
  fetchBreedDescription
};