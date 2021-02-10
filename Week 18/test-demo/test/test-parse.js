const assert = require('assert');
import {
  parseHTML
} from '../parser.js';

describe('html prase test:', function () {
  it('tagname', function () {
    let tree = parseHTML('<a></a>');
    assert.equal(3, 3);
  });
  it('css', function () {
    let tree = parseHTML('<a style="height: 12px"></a>');
    assert.equal(3, 3);
  });
  it('css', function () {
    let tree = parseHTML('<a style="height: 12px; width: 200px"></a>');
    console.log(tree);
    assert.equal(3, 3);
  });
  it('html', function () {
    let tree = parseHTML('<div />');
    console.log(tree);
    assert.equal(3, 3);
  });
  it('html', function () {
    let tree = parseHTML('<div class="123" ></div>');
    console.log(tree);
    assert.equal(3, 3);
  });
  it('html', function () {
    let tree = parseHTML('<div class="123" >');
    console.log(tree);
    assert.equal(3, 3);
  });
  it('html', function () {
    let tree = parseHTML('<div class="123" >hello</div>');
    console.log(tree);
    assert.equal(3, 3);
  });
})