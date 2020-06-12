const Davos = require('davos');

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

async function init() {
    const davos = new Davos();
    const davosCommands = [
        'merge',
        'split',
        'code-list',
        'code-switch',
        'code-shift',
        'code-deploy',
        'code-deploylist',
        'upload-site',
        'upload-cartridges',
        'watch'
    ];
    const args = process.argv;
    let command = '';

    for (let i = 0; i < davosCommands.length; i++) {
        if (args.indexOf(davosCommands[i]) > -1) {
            command = davosCommands[i];
            break;
        }
    }

    switch (command) {
        case 'code-list':
            await davos.listCode();
            break;
        case 'code-shift':
            await davos.shiftCodeVers();
            break;
        case 'code-switch':
            await switchVer(davos, process.argv);
            break;
        case 'code-deploy':
            await davos.deployCodeVer();
            break;
        case 'code-deploylist':
            await davos.listDeploy();
            break;
        case 'upload-cartridges':
            await davos.uploadCartridges();
            break;
        case 'upload-site':
            await site(davos, process.argv);
            break;
        case 'watch':
            davos.watch();
            break;
        case 'split':
            davos.split('sites/site_template/meta/system-objecttype-extensions.xml', 'sites/site_template/SplittedMeta');
            break;
        case 'merge':
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
