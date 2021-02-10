const assert = require('assert');
import {default as add} from '../add.js';
it('test', function() {
    assert.equal(add(1,2), 3);
  });