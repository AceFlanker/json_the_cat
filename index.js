const { fetchBreedDescription } = require('./breedFetcher');

const argv = process.argv.slice(2);
const breedName = argv.join(' ');

fetchBreedDescription(breedName, (error, desc) => {
  if (error !== null) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});