var Pageres = require('pageres');
var Promise = require('bluebird');
var chalk = require('chalk');
var figures = require('figures');
var urls = require('./urls.json');

function start() {
  console.log('Starting...\n');
  Promise.map(urls, capture, {concurrency: 5})
    .then(function () {
      console.log('\nDone!');
    });
}

function capture(url) {
  return new Pageres({delay: 2})
    .src(url, ['1024x768'])
    .dest('screenshots')
    .run()
    .then(function () {
      console.log(chalk.green(figures.tick + ' ' + url));
    })
    .catch(function (err) {
      console.error(chalk.red(figures.cross + ' ' + url));
      console.error(chalk.gray('  ' + err.toString()));
    });
}

start();
