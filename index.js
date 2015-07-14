
'use strict';
'use strong';

const DAWA = require('denmark-dawa');
const mappoint = require('mappoint');

function streetnames(zipcode) {
  const ret = mappoint({ objectMode: true }, function (item, done) {
    done(null, item.tekst);
  });

  new DAWA('/vejstykker/autocomplete', {
    'postnr': zipcode,
    'per_side': 1000000
  })
    .on('error', ret.emit.bind(ret, 'error'))
    .pipe(ret);

  return ret;
}
module.exports = streetnames;
