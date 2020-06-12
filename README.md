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
> This is just a sample code, containing only a few Davos functionalities.
> Please note that the given paths to files will vary depending on the project setup
```javascript
const  Davos = require('davos');

async function switchVer(davos, args) {
    let version = args.find((el) => el.indexOf('--ver') != -1);

    if (!version) {
        console.log('Please specify a version');
        console.log('To list all available versions, execute "npm run davos -- code-list"');
        return;
    }

    version = version.split('=')[1];
    await davos.activateCodeVersion(version);
}

async function site(davos, args) {
    let fileName = args.find((el) => el.indexOf('--file') != -1);

    if (!fileName) {
        await davos.uploadSitesMeta();
    } else {
        fileName = fileName.split('=')[1];
        await davos.uploadSitesMeta(fileName);
    }
}

async function  init() {
	const  davos = new  Davos();
	const  davosCommands = ['merge', 'split', 'upload-site', 'code-switch'];
	const  args = process.argv;
	let  command = '';

	for (let  i = 0; i < davosCommands.length; i++) {
		if (args.indexOf(davosCommands[i]) > -1) {
			command = davosCommands[i];
			break;
		}
	}

	switch (command) {
		case  'code-switch':
			await  switchVer(davos, process.argv);
			break;
		case  'upload-site':	
			await  site(davos, process.argv);
			break;
		case  'split':
			await davos.split('sites/site_template/meta/system-objecttype-extensions.xml', 'sites/site_template/SplittedMeta');
			break;
		case  'merge':
			await davos.merge('sites/site_template/SplittedMeta', 'sites/site_template/Metadata.xml');
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

- Also pass the correct arguments to some of the functions:
```cmd
npm run davos -- code-switch --ver=nameofversion
```

---
### Grunt setup
> NOTE: setup may vary, depending on Gruntfile setup configuration and structure

To setup Grunt to work with Davos, we have a sample Gruntfile
&nbsp;

- Gruntfile
> Setup will vary depending on your project setup
```javascript
module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.loadTasks('grunt/tasks');

  grunt.initConfig({
    davos: require('./grunt/config/davos.js')
  });
};
```

&nbsp;
- Davos tasks in tasks/davos.js
```javascript
var Davos = require('davos');
var requireDir = require('require-dir');
var config = requireDir('../config').davos;

async function switchVer(davos, args) {
    let version = args.find((el) => el.indexOf('--ver') != -1);

    if (!version) {
        console.log('Please specify a version');
        console.log('To list all available versions, execute "gulp davos:code-list"');
        return;
    }

    version = version.split('=')[1];
    await davos.activateCodeVersion(version);
}

async function site(davos, args) {
    let fileName = args.find((el) => el.indexOf('--file') != -1);

    if (!fileName) {
        await davos.uploadSitesMeta();
    } else {
        fileName = fileName.split('=')[1];
        await davos.uploadSitesMeta(fileName);
    }
}

module.exports = {
    split: async function (done) {
        var davos = new Davos();
        await davos.split(config.metaInputFile, config.metaOutput);
        done();
    },
    merge: async function (done) {
        var davos = new Davos();
        await davos.merge(config.metaOutput, config.metaOutputFile);
        done();
    },
    ['code-list']: async function (done) {
        var davos = new Davos();
        await davos.listCode();
        done();
    },
    ['code-switch']: async function (done) {
        var davos = new Davos();
        await switchVer(davos, process.argv);
        done();
    },
    ['code-shift']: async function (done) {
        var davos = new Davos();
        await davos.shiftCodeVers();
        done();
    },
    ['code-deploy']: async function (done) {
        var davos = new Davos();
        await davos.deployCodeVer();
        done();
    },
    ['code-deploylist']: async function (done) {
        var davos = new Davos();
        await davos.listDeploy();
        done();
    },
    ['upload-site']: async function (done) {
        var davos = new Davos();
        await site(davos, process.argv);
        done();
    },
    ['upload-cartridges']: async function (done) {
        var davos = new Davos();
        await davos.uploadCartridges();
        done();
    },
    watch: function (done) {
        var davos = new Davos();

        davos.watch();
    },
};

```

&nbsp;

- Setup configuration in config/davos.js
```javascript
module.exports = {
    options: {
        code: {
            shift: {},
            switch: {},
            deploy: {},
            list: {},
            deploylist: {}
        },
        merge: {
            in: 'sites/site_template/SplittedMeta',
            out: 'sites/site_template/MergedMeta/merged_metadata.xml'
        },
        split: {
            in: 'sites/site_template/meta/system-objecttype-extensions.xml',
            out: 'sites/site_template/SplittedMeta'
        },
        upload: {
            cartridges: {},
            site: {}
        },
        watch: {
            target: {}
        }
    }
}
```

* To execute, simply run the one of the commands with a passed task parameter 'do'

```cmd
grunt davos --do=meta-split
```

```cmd
grunt davos --do=watch
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
gulp.task('davos:code-list', tasks.davos['code-list']);
gulp.task('davos:code-switch', tasks.davos['code-switch']);
gulp.task('davos:code-shift', tasks.davos['code-shift']);
gulp.task('davos:code-deploy', tasks.davos['code-deploy']);
gulp.task('davos:code-deploylist', tasks.davos['code-deploylist']);
gulp.task('davos:upload-site', tasks.davos['upload-site']);
gulp.task('davos:upload-cartridges', tasks.davos['upload-cartridges']);
gulp.task('davos:watch', tasks.davos.watch);
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
var Davos = require('davos');
var requireDir = require('require-dir');
var config = requireDir('../config').davos;

async function switchVer(davos, args) {
    let version = args.find((el) => el.indexOf('--ver') != -1);

    if (!version) {
        console.log('Please specify a version');
        console.log('To list all available versions, execute "gulp davos:code-list"');
        return;
    }

    version = version.split('=')[1];
    await davos.activateCodeVersion(version);
}

async function site(davos, args) {
    let fileName = args.find((el) => el.indexOf('--file') != -1);

    if (!fileName) {
        await davos.uploadSitesMeta();
    } else {
        fileName = fileName.split('=')[1];
        await davos.uploadSitesMeta(fileName);
    }
}

module.exports = {
    split: async function (done) {
        var davos = new Davos();
        await davos.split(config.metaInputFile, config.metaOutput);
        done();
    },
    merge: async function (done) {
        var davos = new Davos();
        await davos.merge(config.metaOutput, config.metaOutputFile);
        done();
    },
    ['code-list']: async function (done) {
        var davos = new Davos();
        await davos.listCode();
        done();
    },
    ['code-switch']: async function (done) {
        var davos = new Davos();
        await switchVer(davos, process.argv);
        done();
    },
    ['code-shift']: async function (done) {
        var davos = new Davos();
        await davos.shiftCodeVers();
        done();
    },
    ['code-deploy']: async function (done) {
        var davos = new Davos();
        await davos.deployCodeVer();
        done();
    },
    ['code-deploylist']: async function (done) {
        var davos = new Davos();
        await davos.listDeploy();
        done();
    },
    ['upload-site']: async function (done) {
        var davos = new Davos();
        await site(davos, process.argv);
        done();
    },
    ['upload-cartridges']: async function (done) {
        var davos = new Davos();
        await davos.uploadCartridges();
        done();
    },
    watch: function (done) {
        var davos = new Davos();

        davos.watch();
    },
};

```
#### This concludes our Gulp setup

* To execute one the created commands:

```cmd
gulp davos:split
```

```cmd
gulp davos:split
```

```cmd
gulp davos:code-switch --version=myversion
```

> Note: don't put XML file extension
```cmd
gulp davos:upload-site --file=xmlFileName
```
