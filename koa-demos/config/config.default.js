'use strict';

const path = require('path');

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = 'my secret keys';
    config.static = {
        prefix: "/public/",
        dir: path.join(appInfo.baseDir, "public")
    };
    config.view = {
        root: [
            path.join(appInfo.baseDir, 'app/views')
        ].join(','),
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks',
        },
    };
    return config;
};