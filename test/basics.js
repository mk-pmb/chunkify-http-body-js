/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = module.exports, stats = { total: 0, passed: 0, errors: [] },
  async = require('async'),
  collect = require('collect-stream'),
  equal = require('equal-pmb'),
  makeChunkEncoder = require('chunkify-http-body');

EX.stats = stats;


process.on('exit', function (retval) {
  if (retval !== 0) { return; }
  if (stats.passed !== stats.total) {
    console.error('-ERR passed only %s of %s tests', stats.passed, stats.total);
    return process.exit(4);
  }
  console.log('+OK all tests passed');
});


function addTest(inputs, expectedOutput) {
  var ce = makeChunkEncoder();
  stats.total += 1;

  collect(ce, function verify(err, data) {
    if (err) { throw err; }
    data = String(data).split(/\r\n/);
    equal(data, expectedOutput);
    stats.passed += 1;
  });

  async.each(inputs, function (chunk, next) {
    if (typeof chunk === 'function') {
      chunk();
    } else {
      ce.write(chunk);
    }
    return next();
  }, function () { ce.end(); });
}
EX.addTest = addTest;


EX.basics = function () {

  addTest([
    'Hello World,',
    ' have a snowman: ',
    '\u2603\n',
  ], [
    'C',  'Hello World,', '',
    '11', ' have a snowman: ', '',
    '4',  '\u2603\n', '',
    '0',  '', ''
  ]);

};







if (require.main === module) { EX.basics(); }
