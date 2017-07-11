const path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        //path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)

        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        // directories where to look for modules

        extensions: [".js"],
        // extensions that are used

        alias: {
            backbone: path.join(__dirname, 'src/lib/backbone.js'),
            underscore: path.join(__dirname, 'src/lib/underscore.js'),
            jquery: path.join(__dirname, 'src/lib/jquery.js'),
            handlebars: path.join(__dirname, 'src/lib/handlebars.js')
        }
    },
    devtool: "source-map"
};
