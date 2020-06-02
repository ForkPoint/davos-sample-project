var Davos = require('davos');
var requireDir = require('require-dir');
var config = requireDir('../config').davos;

module.exports = {
    split: function (done) {
        var davos = new Davos();
        davos.split(config.metaInputFile, config.metaOutput);
        done();
    },
    merge: function (done) {
        var davos = new Davos();
        davos.merge(config.metaOutput, config.metaOutputFile);
        done();
    }
};
