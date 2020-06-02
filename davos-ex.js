const Davos = require('davos');

function init() {
    const davos = new Davos();
    const davosCommands = ['merge', 'split', 'upload-site', 'upload-meta'];
    const args = process.argv;
    let command = '';

    for (let i = 0; i < davosCommands.length; i++) {
        if (args.indexOf(davosCommands[i]) > -1) {
            command = davosCommands[i];
            break;
        }
    }

    switch (command) {
        case 'split':
            davos.split('sites/site_template/meta/system-objecttype-extensions.xml', 'sites/site_template/SplittedMeta');
            break;
        case 'merge':
            davos.merge('sites/site_template/SplittedMeta', 'sites/site_template/Metadata.xml');
            break;
        case 'upload-site':
            // site upload task
            break;
        case 'upload-meta':
            // upload meta task
            break;
        default:
            console.log('\x1b[31m', 'Please provide an valid task command');
            console.log('\x1b[40m');
            console.log('\x1b[37m');
            break;
    }
}

module.exports = init();
