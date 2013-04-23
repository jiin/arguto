var vows = require('vows'),
   argvs = require('../'),
  assert = require('assert');

argvs.init('first=s;second=i;third=b;fourth=[s];fifth=[s]');

vows.describe('').addBatch({
    'first parameter (string)': {
        topic: argvs.first,
        'return \'foo\'': function (topic) {
            assert.equal(topic, 'foo');
        }
    },
    'secondo parameter (int)': {
        topic: argvs.second,
        'return \'1\'': function (topic) {
            assert.equal(topic, 1);
        }
    },
    'third parameter (boolean)': {
        topic: argvs.third,
        'return \'true\'': function (topic) {
            assert.equal(topic, 'true');
        }
    },
    'optional parameter given (string)': {
        topic: argvs.fourth,
        'return \'bar\' but not caught error if argument isn\'t given': function (topic) {
            assert.equal(topic, 'bar');
        }
    },
    'optional parameter not given (string)': {
        topic: argvs.fifth,
        'return \'undefined\' because not given, but not cause an exception': function (topic) {
            assert.equal(topic, undefined);
        }
    }
}).run();
