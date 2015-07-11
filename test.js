
'use strict';
'use strong';

const test = require('tap').test;
const streetnames = require('./index.js');

test('valid zipcode', function (t) {
  streetnames(2800, function (err, streetnames) {
    t.ifError(err);
    for (const name of streetnames) {
      t.ok(typeof name === 'string', 'street name is string');
    }
    t.ok(streetnames.length > 0, 'there are streetnames in the list');

    t.end();
  });
});

test('missing zipcode', function (t) {
  streetnames(1, function (err, streetnames) {
    t.equal(err.name, 'Error');
    t.equal(err.message, 'Invalid zipcode');
    t.equal(streetnames, null);
    t.end();
  });
});

test('invalid zipcode', function (t) {
  streetnames(10000, function (err, streetnames) {
    t.equal(err.name, 'Error');
    t.equal(err.message, 'Invalid zipcode');
    t.equal(streetnames, null);
    t.end();
  });
});
