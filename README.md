# Arguto.js

![Oh rly](http://codinggeekette.com/wp-content/uploads/2011/03/ORLY.jpg)

## Installation

[![Build Status](https://travis-ci.org/jiin/arguto.png?branch=master)](https://travis-ci.org/jiin/arguto)

Install this version via git: 
```bash
npm install https://github.com/jiin/arguto.git
```

And use in your node source:
```javascript
var argv = require('arguto')
```

## Usage

You can specify desired parameters with two differents variable types: string or object.
In string-init you must specify all parameters in notation:

```javascript
argv.init('first=s;second=i;third=b;fourth=[s]');
// Notation: name=type
// Types: s => string, i => number, b => boolean
// For optional parameters you can specify type in brackets => name=[type]
```

Object method:
```javascript
argv.init([{
  name: 'first',
  type: 'string',
  short: 'f',
  waited: ['hello', 'world'],
  required: true
}, {
  name: 'second',
  type: 'number',
  short: 's',
  waited: [1, 2, 3, 4],
  required: true
}, {
  name: 'third',
  type: 'boolean',
  short: 'b',
  required: true
}, {
  name: 'fourth',
  type: 'string',
  required: false
}]);
```

Now explain fields:
+ *name*: long parameter's name
+ *type*: long parameter's type
+ *short*: short version of parameter's name ( usually one lecter long )
+ *waited*: parameter value MUST be in this array
+ *required*: if true the user must specify parameter
 
You can get “captured“ value with:
```javascript
console.log(argv.first); // argv.variable_name
```

## Tests
```javascript
npm test
```
Tests are written with vows

## License
MIT
