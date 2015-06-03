/*
 * Template file
 */

'use strict';

var exec = require('child_process').exec;
var os = require('os');

var format = require('./format');
var sort = require('./sort');

module.exports = function (options, callback) {
  var defaults = {
    sort: 'chronological', // Alphabetical, commits
    email: false, // Show emails in the output
    nomerges: false, // Only works when sorting by commits
  };

  var cmd = 'git';

  options = _.extend({}, defaults, options);

  if (options.sort === 'chronological' || options.sort === 'alphabetical') {
    cmd += ' log --pretty="%aN';

    // Show email
    if (options.email) {
      cmd += ' <%aE>';
    }

    cmd += '"';

  // Sort by number of commits
  } else if (options.sort === 'commits') {
    cmd += ' shortlog -ns';

    // Show email
    if (options.email) {
      cmd += 'e';
    }

    // Omit merge commits
    if (options.nomerges) {
      cmd += ' --no-merges';
    }

    // Detect current system use the appropriate terminal
    if (/win32/.test(process.platform)) {
      cmd += ' < CON';
    } else {
      cmd += ' < /dev/tty';
    }
  }

  exec(cmd, function (err, stdout, stderr) {
    if (err) {
      throw err;
    } else {
      stdout = format(stdout);
      stdout = sort(stdout);
      stdout = stdout.join(os.EOL);
      callback = typeof callback === 'function' ? callback : console.log;
      callback(stdout);
    }
  });
};
