module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('grunt/tasks');

  grunt.initConfig({
    davos: require('./grunt/config/davos.js')
  });
};
