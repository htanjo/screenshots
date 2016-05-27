var Pageres = require('pageres');
var Promise = require('bluebird');
var urls = require('./urls.json');

function start() {
  console.log('Starting...');
  Promise.map(urls, capture, {concurrency: 5})
    .then(function () {
      console.log('Done!');
    });
}

function capture(url) {
  return new Pageres({delay: 2})
    .src(url, ['1024x768'])
    .dest('screenshots')
    .run()
    .then(function () {
      console.log('  captured: ' + url);
    })
    .catch(function (err) {
      console.error('  error: ' + url);
      console.error(err.toString());
    });
}

start();
