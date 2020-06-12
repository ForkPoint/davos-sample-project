async function switchVer(davos, grunt) {
    const version = grunt.option('version');

    if (!version) {
        console.log('Please specify a version');
        console.log('To list all available versions, execute "grunt davos --task=code-list"');
        return;
    }

    await davos.activateCodeVersion(version);
}

async function site(davos, grunt) {
    const fileName = grunt.option('file');

    if (!fileName) {
        await davos.uploadSitesMeta();
    } else {
        await davos.uploadSitesMeta(fileName);
    }
}

module.exports = function (grunt) {
    grunt.registerTask('davos', async function() {
        var Davos = require('davos');
        var done = this.async();
        var davos = new Davos();
        var task = grunt.option('do');
        var options = this.options();

        if (!task) {
            console.log('Please specify a task: --do="taskname"');
            done(false);
        }

        switch (task) {
            case 'code-list':
                await davos.listCode();
                done();
                break;
            case 'code-shift':
                await davos.shiftCodeVers();
                done();
                break;
            case 'code-switch':
                await switchVer(davos, grunt);
                done();
                break;
            case 'code-deploy':
                await davos.deployCodeVer();
                done();
                break;
            case 'code-deploylist':
                await davos.listDeploy();
                done();
                break;
            case 'upload-cartridges':
                await davos.uploadCartridges();
                done();
                break;
            case 'upload-site':
                await site(davos, grunt);
                done();
                break;
            case 'watch':
                davos.watch();
                break;
            case 'meta-merge':
                await davos.merge(options.merge.in, options.merge.out);
                done();
                break;
            case 'meta-split':
                await davos.split(options.split.in, options.split.out);
                done();
                break;
            default:
                console.log('Task doesn\'t exist, please try again');
                break;
        }
    });
};