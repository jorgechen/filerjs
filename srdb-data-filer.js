// Customized tool for changing SRDb raw SRD datasets into factory files in JS
var path = require('path');
var Filer = require('./filer');

var p = '/Users/knav/github/srd-vault/www/data/';

var eligible = [
  'srd111_NIST_Atomic_Ionization_Energies_Output.json',
  'srd144_Atomic_Weights_and_Isotopic_Compositions_for_All_Elements.json',
  'srd13_janaf.species.json',
  'srd121_allascii_2014.json'
]


var srd = {};

var filter = function (fileContent, fromPath, toPath) {


  var fromDirectory = path.dirname(fromPath); // data/srd121/f.json -> data/srd121
  var fileInfo = path.parse(fromDirectory);
  var srdNumber = fileInfo.base; // data/srd121 -> srd121
  srdNumber = srdNumber.replace(/\D/g, ''); // srd121 -> 121


  var fileName = path.basename(fromPath);

  if (-1 !== eligible.indexOf(fileName)) {
    console.log('Appending ' + fromPath);

    var json = '';
    try {
      json = JSON.parse(fileContent);
    }
    catch (exception) {
      console.error('Could not parse ' + fromPath);
      console.error(exception);
    }

    if (json) {
      srd[srdNumber] = json;
    }
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

output = JSON.stringify(srd);
console.log(output.substr(0, 300));

Filer.saveFile('srd.js', output);

