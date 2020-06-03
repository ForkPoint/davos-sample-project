# Davos Sample Setup
This repository contains sample setups for the listed task manager applications to use with Davos
The sole purpose of this documentation is  **NOT to show *Davos* functionalities, but only setup procedures**

> For full list of Davos functionalities and capabilities, please visit official [Davos repo](https://github.com/ForkPoint/davos)

#### App setup list:
- NPM
- Grunt
- Gulp
---
### NPM Setup
To setup **Davos** to work with NPM Script task, we first need to add it to our **package.json** and create a simple **davos javascript** file.

- Davos JS
> This is just a sample code, containing only 2 Davos functionalities.
> Please note that the given paths to files will vary depending on the project setup
```javascript
const  Davos = require('davos');

function  init() {
const  davos = new  Davos();
const  davosCommands = ['merge', 'split'];
const  args = process.argv;
let  command = '';

for (let  i = 0; i < davosCommands.length; i++) {
	if (args.indexOf(davosCommands[i]) > -1) {
		command = davosCommands[i];
		break;
	}
}

switch (command) {
	case  'split':
		davos.split('sites/site_template/meta/system-objecttype-extensions.xml', 'sites/site_template/SplittedMeta');
		break;
	case  'merge':
		davos.merge('sites/site_template/SplittedMeta', 'sites/site_template/Metadata.xml');
		break;
	default:
		console.log('\x1b[31m', 'Please provide an valid task command');
		console.log('\x1b[40m');
		console.log('\x1b[37m');
		break;
	}
}

module.exports = init();
```

- Package.json
> NOTE: Please assure correct path to file
```json
"scripts": {
	"davos": "node davos.js"
},
```

- To execute, simply run the NPM Command with the correct arguments:
```cmd
npm run davos -- split
```

```cmd
npm run davos -- merge
```

---
### Grunt setup
> NOTE: setup may vary, depending on Gruntfile setup configuration and structure

To setup Grunt to work with Davos, we have a sample Gruntfile
&nbsp;

- Gruntfile
>This will vary depending on your project setup
```javascript
module.exports = function (grunt) {
	var  path = require('path');

	grunt.loadTasks('grunt/tasks');

	require('time-grunt')(grunt); // Display execution time of grunt tasks, NOT Required

	// Load all grunt configs, look in the config directory to modify configuration for any specific task
	require('load-grunt-config')(grunt, {
		configPath:  path.join(process.cwd(), 'grunt/config')
	});
};
```

&nbsp;
Our Grunt setup structure, will look for tasks in the *grunt/tasks* path,
configurations will be placed in *grunt/config*

- In *grunt/config* first we create **aliases.yaml** file to properly structure our configurations with the tasks
>For more information on this type of Grunt setup, check the following [guide](https://marioaraque.com/grunt-load-config)
```jaml
# Yaml Parser: http://yaml-online-parser.appspot.com/
davos-split:
- 'davos_split:split'
davos-merge:
- 'davos_merge:merge'
```
* We will also be creating a separate file to keep our paths in one place, create a **davos_settings.js** in the **same folder**
>NOTE: Paths will vary for each project
```javascript
module.exports = {
	folders: {
		metaOutputFile:  'sites/site_template/MergedMeta/merged_metadata.xml',
		metaInputFIle:  'sites/site_template/meta/system-objecttype-extensions.xml',
		metaOutput:  'sites/site_template/SplittedMeta'
	}
}
```

* Afterwards, we create the first configuration js file, **davos_split.js**

```javascript
module.exports = {
	split: {
		in:  '<%= davos_settings.folders.metaInputFile %>',
		out:  '<%= davos_settings.folders.metaOutput %>'
	}
}
```

* We then create configuration for another task, **davos_merge.js**
```javascript
module.exports = {
	merge: {
		in:  '<%= davos_settings.folders.metaOutput %>',
		out:  '<%= davos_settings.folders.metaOutputFile %>'
	}
}
```

#### At this point, the setup configurations for the desired tasks are created
> Extend further more if any additional **Davos** tasks are required

#### We move on to grunt/tasks
- In the *grunt/tasks* folder, we need to create two separate files **davos_split.js** and **davos_merge.js**

- **davos_split.js** 
```javascript
var  Davos = require('davos');

module.exports = function (grunt) {
	grunt.registerMultiTask('davos_split', 'Split metadata file into separate files per type-extension', function () {
	var  input = this.data.in;
	var  output = this.data.out;
	var  davos = new  Davos();

	davos.split(input, output);
	});
};
```

- **davos_merge.js**
>NOTE: We need to let Grunt know this is an *async* task, otherwise execution will fail
```javascript
var  Davos = require('davos');

module.exports = function (grunt) {
	grunt.registerMultiTask('davos_merge', 'Merge splitted metadata files into one', function () {
		var  done = this.async();
		var  input = this.data.in;
		var  output = this.data.out;
		var  davos = new  Davos();

		davos.merge(input, output).then((data) => {
			done();
		}).catch((err) => {
			console.log(err);
			done(false);
		});
	});
};
```
&nbsp;
* To execute, simply run the grunt commands, defined in the .yaml file
```cmd
grunt davos-split
```

```cmd
grunt davos-merge
```
---
### Gulp setup
> NOTE: Gulp setup may/will vary on the project

Our Gulp setup is placed in a folder *gulpfile.js*
We then have an *index.js* which is the main Gulp file
>We use 'require-dir' to load tasks/configs from particular folders
- **index.js**
```javascript
var  gulp = require('gulp');
var  requireDir = require('require-dir');
var  tasks = requireDir('./tasks');

gulp.task('davos:split', tasks.davos.split);
gulp.task('davos:merge', tasks.davos.merge);
```

&nbsp;
We then have to create two folders, in the *gulpfile.js* folder:

 1. tasks
 2. config

- In *config* folder, we create a configuration ***davos.js*** file
> NOTE: Paths will vary for each project
```javascript
module.exports = {
	metaOutputFile:  'sites/site_template/meta/MergedMeta/merged_metadata.xml',
	metaInputFile:  'sites/site_template/meta/system-objecttype-extensions.xml',
	metaOutput:  'sites/site_template/SplittedMeta'
};
```

- In our *tasks* folder, we create a task ***davos.js*** file
```javascript
var  Davos = require('davos');
var  requireDir = require('require-dir');
var  config = requireDir('../config').davos;

module.exports = {
	split:  function (done) {
		var  davos = new  Davos();
		davos.split(config.metaInputFile, config.metaOutput);
		done();
	},
	merge:  function (done) {
		var  davos = new  Davos();
		davos.merge(config.metaOutput, config.metaOutputFile);
		done();
	}
};
```
#### This concludes our Gulp setup

* To execute the created commands:

```cmd
gulp davos:split
```

```cmd
gulp davos:split
```

