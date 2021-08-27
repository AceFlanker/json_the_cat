const argv = process.argv.slice(2);
const net = require("net");
const request = require('request');
// const fs = require('fs');
// const readline = require('readline');

const noPrefixURL = function(url) {
  const schemePrefix = /(?<=^[A-Za-z]+:\/\/[A-Za-z.]*)[A-Za-z]+\.[A-Za-z]+(?=($|\/))/;
  return url.match(schemePrefix)[0];
}

const breed = argv.join(' ');

const requestAddress = 'https://api.thecatapi.com/v1/breeds/search';
const connAddress = noPrefixURL(requestAddress);
const PORT = 80;

const endSession = function() {
  close.end();
  process.exit();
};

const connect = function(request) {
  const conn = net.createConnection({
    host: connAddress,
    port: PORT
  });
  
  conn.setEncoding('utf-8');
  
  conn.on('connect', () => {
    console.log('=============================\nServer successfully connected\n=============================');
    findBreed(request);
  });

  conn.on('error', (err) => {
    console.log('========================================\nERROR: URL "' + connAddress + '" is not found.');
    console.log('TYPE: ' + err.code + '\n========================================');
  })

  conn.on('data', (data) => {
    console.log('Server Says: ', data)
  });

  conn.on('end', () => {
    console.log('====================\nServer disconnected.');
  });

  close = conn;
  return conn;
}

const findBreed = function() {
  request(requestAddress + '?q=' + breed, (error, response, body) => {
    console.log('ERROR:', error);
    console.log('STATUS CODE:', response && response.statusCode);
    if (body !== '[]') {
      console.log('======================\nIncoming Body Received\n======================');
      console.log(breed + ': ' + JSON.parse(body)[0].description);
    } else {
      console.log('==========================================\nRequested breed not found in the database:\n' + breed + '\n==========================================')
    }
    endSession();
  })
}

connect(breed);