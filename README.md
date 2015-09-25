#denmark-streetname [![Build Status](https://travis-ci.org/denmark-io/denmark-streetname.svg?branch=master)](https://travis-ci.org/denmark-io/denmark-streetname)

> A list of streetname given a zipcodes

## Installation

```sheel
npm install denmark-streetname
```

## Documentation

```javascript
streetnames = require('denmark-streetname')
```

This is a function with the signature `streetnames(zipcode)`,
it will return an object stream where each item is a steetname.

```javascript
streetnames(2800).on('data', function (steetname) {
  console.log(steetname); // e.q. Lyngby Hovedgade
});
```

## Source

The source is: http://dawa.aws.dk/vejedok

This uses the autocomplete feature, with an empty search. This way a
minimal (in terms of size) response is obtained.
