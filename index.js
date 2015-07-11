
'use strict';
'use strong';

const http = require('http');
const endpoint = require('endpoint');

function genurl(zipcode) {
  return `http://dawa.aws.dk/vejstykker/autocomplete?postnr=${zipcode}&per_side=1000000`;
}

function streetnames(zipcode, cb) {
  let called = false;
  function callback(err, content) {
    if (called) return;
    called = true;
    cb(err, content || null);
  }

  const req = http.get(genurl(zipcode), function (res) {
    res.pipe(endpoint(function (err, content) {
      if (err) return callback(err);

      const data = JSON.parse(content);
      if (!Array.isArray(data) || data.length === 0) {
        return callback(new Error('Invalid zipcode'));
      }

      callback(null, data.map(function (item) {
        return item.tekst;
      }));
    }));
  });

  req.on('error', callback);
}
module.exports = streetnames;
