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
