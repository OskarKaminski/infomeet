var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack({});

module.exports = function (wallaby) {
    return {
        files: [
            { pattern: 'node_modules/babel-polyfill/browser.js', instrument: false },
            { pattern: 'node_modules/mockery/**/*.js', load: false },
            {pattern: 'blackjack/**/*.js', load: false},
            {pattern: 'blackjack/**/*.spec.js', ignore: true}
        ],

        tests: [
            {pattern: 'blackjack/**/*.spec.js', load: false}
        ],

        compilers: {
            '**/*.js': wallaby.compilers.babel({
                presets: ['es2015', 'stage-2']
            })
        },

        postprocessor: wallabyPostprocessor,
        setup: function () {
            // required to trigger test loading
            window.__moduleBundler.loadTests();
        }
    };
};