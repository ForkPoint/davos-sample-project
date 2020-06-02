module.exports = function (grunt) {
  var path = require('path');

  // Load all Demandware specific plugins (not distributed by npm)
  grunt.loadTasks('grunt/tasks');

  // Display execution time of grunt tasks
  require('time-grunt')(grunt);

  // Load all grunt configs, look in the config directory to modify configuration for any specific task
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/config')
  });
};
