const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const devConfig = {
    mode: 'development',
    output:{
        publicPath:'http://localhost:8082/'
    },
    devServer:{
        port:8082,                              // different for different apps
        historyApiFallback:{
            index: '/index.html'
        }
    },
    plugins: [
        //if publicpath is never set, scripts are loaded up from the remoteEntry.js file
        //relative to the Domain URL that we loaded remoteEntry.js from
        // sub app will load up the main.js file by going to (where we got remoteentry.js)/main.js
        new ModuleFederationPlugin({
            name:'auth',                        // different for different apps
            filename: 'remoteEntry.js',
            exposes:{
                './AuthApp':'./src/bootstrap'   // different for different apps
            },
            shared:packageJson.dependencies
        }),
    ]
};

module.exports = merge(commonConfig, devConfig);