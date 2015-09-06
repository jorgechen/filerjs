// Customized tool for changing SRDb raw SRD datasets into factory files in JS
var path = require('path');
var Filer = require('./filer');

var p = '/Users/knav/github/srd-vault/www/data/';
var p = '/Users/knav/github/codex/';


var srd = {};

var filter = function (fileContent, fromPath, toPath) {

  var json = '';

  try {
    json = JSON.parse(fileContent);
  }
  catch (exception) {
    console.error('Could not parse ' + fileContent);
  }

  if (json) {

    var fromDirectory = path.dirname(fromPath);
    var srdNumber = path.parse(fromDirectory).base;

    srdNumber = srdNumber.replace(/\D/g, ''); // srd121 -> 121

    srd[srdNumber] = json;
  }
  return null; // null == do not save file
};


Filer.filterFileContent(
  p,
  filter,
  {
    extension: '.json',
    recursive: true,
    depth: 2 // 2 = children and grandchildren
  }
);


// Once we've built a giant SRD, stringify it and save it as a factory.js

// console.log(srd);

