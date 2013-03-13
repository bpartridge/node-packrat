var request = require('request');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var Packrat = module.exports = function (opts) {
  if (typeof opts == 'string') {
    opts = {dir: opts};
  }

  opts.hashAlgorithm = opts.hashAlgorithm || 'md5';
  this.opts = opts;
  this.request = request.defaults(opts);
};

Packrat.prototype.hashURI = function(uri) {
  var hash = crypto.createHash(this.opts.hashAlgorithm);
  hash.update(uri, 'utf8');
  return hash.digest('hex');
};

// cb(err) or cb(null, filename)
Packrat.prototype.get = function(uri, cb) {
  var self = this, req, cbCalled = false;
  var file = path.join(self.opts.dir, self.hashURI(uri));

  fs.exists(file, function(exists) {
    if (exists) {
      cb(null, file);
    } else {
      mkdirp(self.opts.dir, function(err) {
        if (err) return cb(err);

        req = self.request.get(uri);
        req.pipe(fs.createWriteStream(file));

        req.on('error', function(err) {
          if (cbCalled) return;
          cbCalled = true;
          cb(err);
        });
        req.on('end', function() {
          if (cbCalled) return;
          cbCalled = true;
          cb(null, file);
        });
      });
    }
  });
};
