
'use strict';
'use strong';

const test = require('tap').test;
const endpoint = require('endpoint');
const streetnames = require('./index.js');

test('valid zipcode', function (t) {
  streetnames(2800).pipe(endpoint({ objectMode: true }, function (err, streets) {
    t.ifError(err);
    t.ok(streets.length > 0, 'there are streetnames in the list');
    for (const name of streets) {
      t.ok(typeof name === 'string', 'street name is string');
    }

    t.end();
  }));
});

test('missing zipcode', function (t) {
  streetnames(1).pipe(endpoint({ objectMode: true }, function (err, streets) {
    t.ifError(err);
    t.equal(streets.length, 0);
    t.end();
  }));
});

test('invalid zipcode', function (t) {
  streetnames(10000).pipe(endpoint({ objectMode: true }, function (err, streets) {
    t.equal(err.name, 'QueryParameterFormatError');
    t.equal(err.message, 'One or more query parameters was ill-formed.' +
                         ' [postnr: Value 10000 is greater than maximum 9999]');
    t.equal(streets.length, 0);
    t.end();
  }));
});
