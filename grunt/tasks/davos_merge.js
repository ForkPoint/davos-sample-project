var Davos = require('davos');

module.exports = function (grunt) {
    grunt.registerMultiTask('davos_merge', 'Merge splitted metadata files into one', function () {
        var done = this.async();
        var input = this.data.in;
        var output = this.data.out;
        var davos = new Davos();

        davos.merge(input, output).then((data) => {
            done();
        }).catch((err) => {
            console.log(err);
            done(false);
        });
    });
};
