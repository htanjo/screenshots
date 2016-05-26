var Pageres = require('pageres');
var Promise = require('bluebird');
var urls = require('./urls.json');

function start() {
  console.log('Starting...');
  Promise.map(urls, capture, {concurrency: 5})
    .then(function () {
      console.log('Complete!');
    })
    .catch(function (err) {
      console.error('Error!');
      console.error(err.toString());
    });
}

function capture(url) {
  return new Pageres({delay: 2})
    .src(url, ['1024x768'])
    .dest('screenshots')
    .run()
    .then(function () {
      console.log('  captured: ' + url);
    });
}

start();
