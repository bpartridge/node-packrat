
var Packrat = require('.');
var fs = require('fs');

function verifyCb(err) {
  if (err) throw err;
}

var packrat = new Packrat(__dirname + "/testdata");
var called = false;

packrat.get("http://www.google.com/", function(err, path) {
  if (err) throw err;
  called = true;

  console.log("http://www.google.com/ => " + path);
  fs.exists(path, function(exists) {
    if (!exists) throw "File doesn't exist";
  });
});

setTimeout(function() {
  if (!called) throw "Timeout.";
}, 1000);
