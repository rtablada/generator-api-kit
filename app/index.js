var util = require('util');
var path = require('path');
var _ = require('lodash');
var utils = require('keystone-utils');
var yeoman = require('yeoman-generator');
var wiring = require('html-wiring');

var ProjectGenerator = module.exports = function ProjectGenerator() {

  // Set utils for use in templates
  this.utils = utils;

  // Apply the Base Generator
  yeoman.generators.Base.apply(this, arguments);

  // Welcome
  console.log('\nWelcome to your new Backbone Project.\n');

  // Import Package.json
  this.pkg = JSON.parse(wiring.readFileAsString(path.join(__dirname, '../package.json')));

};

// Extends the Base Generator
util.inherits(ProjectGenerator, yeoman.generators.Base);

ProjectGenerator.prototype.prompts = function prompts() {

  var cb = this.async();

  var prompts = {

    project: [
      {
        name: 'projectName',
        message: 'What is the name of your project?',
        default: 'My Site',
      }, {
        type: 'confirm',
        name: 'newDirectory',
        message: 'Would you like to create a new directory for your project?',
        default: true,
      },
    ],

    config: [],

  };

  this.prompt(prompts.project, function(props) {

    _.each(props, function(val, key) {
      this[key] = val;
    }, this);

    // Keep an unescaped version of the project name
    this._projectName = this.projectName;

    // Create the directory if required
    if (this.newDirectory) {
      this.destinationRoot(utils.slug(this.projectName));
    }

    if (!prompts.config.length) {
      return cb();
    }
  }.bind(this));

};

ProjectGenerator.prototype.project = function project() {
  var copyDir = [
    'app',
    'bin',
    'bootstrap',
    'config',
    'resources',
    'seeds',
    'tests',
  ];
  var _this = this;

  this.template('_package.json', 'package.json');
  this.template('app.json', 'app.json');
  this.template('Procfile', 'Procfile');
  this.copy('_.gitignore', '.gitignore');
  this.copy('app.js', 'app.js');
  this.copy('index.js', 'index.js');
  this.copy('seed.js', 'seed.js');
  this.copy('LICENSE', 'LICENSE');
  this.copy('config/default.json.example', 'config/default.json');

  copyDir.forEach(function(file) {
    _this.bulkDirectory(file, file);
  });

  // This callback is fired when the generator has completed,
  // and includes instructions on what to do next.
  var done = _.bind(function done() {
    console.log(
    '\n------------------------------------------------' +
    '\n' +
    '\nYour API project is ready to go!' +
    '\n' +
    '\nTo create a user run: npm run new-user' +
    '\nTo create an oauth clien run: npm run new-oauth-client' +
    '\nTo start the server run: npm start');

  }, this);

  this.installDependencies({
    bower: false,
    skipMessage: true,
    callback: done,
  });
};
