#!/usr/bin/env node
/*jslint indent: 2, maxlen: 80, node: true */
/* -*- coding: UTF-8, tab-width: 2 -*- */
'use strict';
(function readmeDemo() {
  //#u
  var makeChunkifier = require('chunkify-http-body'),
    myStream = makeChunkifier();
  process.stdin.pipe(myStream).pipe(process.stdout);
  //#r
}());
