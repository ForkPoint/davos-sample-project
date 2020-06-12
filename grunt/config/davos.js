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