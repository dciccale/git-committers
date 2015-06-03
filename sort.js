/*
 * Sort stdout
 */

'use strict';

var _ = require('lodash');

// Sort types
var SORT_METHODS = {
  alphabetical: 'sort',
  chronological: 'reverse'
};

moule.exports = function (stdout) {
  if (SORT_METHODS[options.sort]) {
    stdout = _.unique(stdout[SORT_METHODS[options.sort]]());
  }
  return stdout;
};
