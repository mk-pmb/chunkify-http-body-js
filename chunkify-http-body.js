/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, through2 = require('through2'), eol = '\r\n';


EX = function chunkifyHttpBody(opts) {
  var enc;
  function finishStream(done) {
    this.push('0' + eol);
    if (enc.trailer) { this.push(EX.prepareTrailer(enc.trailer)); }
    this.push(eol);
    return done();
  }
  enc = through2(EX.encodeOneChunk, finishStream);
  Object.assign(enc, opts);
  return enc;
};


EX.encodeOneChunk = function (chunk, enc, done) {
  var len = chunk.length;
  if (enc !== 'buffer') {
    throw new Error('unsupported encoding: expected "buffer", not ' + enc);
  }
  if (len < 1) { return done(); }
  this.push(len.toString(16).toUpperCase() + eol);
  this.push(chunk);
  this.push(eol + eol);
  return done();
};


EX.headersDictToLines = function (h) {
  return Object.keys(h).sort().map(function (k) { return k + ': ' + h[k]; });
};


EX.prepareTrailer = function (trl) {
  if (!trl) { return ''; }
  switch (typeof trl) {
  case 'string':
    break;
  case 'object':
    if (Buffer.isBuffer(trl)) {
      trl = String(trl);
      break;
    }
    if (!Array.isArray(trl)) { trl = EX.headersDictToLines(trl); }
    trl = trl.join(eol);
    break;
  default:
    return '';
  }
  return trl.trim() + eol;
};













module.exports = EX;
