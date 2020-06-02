var Davos = require('davos');

module.exports = function (grunt) {
    grunt.registerMultiTask('davos_split', 'Split metadata file into separate files per type-extension', function () {
        var input = this.data.in;
        var output = this.data.out;
        var davos = new Davos();

        davos.split(input, output);
    });
};
