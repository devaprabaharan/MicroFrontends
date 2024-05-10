const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const devConfig = {
    mode: 'development',
    output:{
        publicPath:'http://localhost:8083/'
    },
    devServer:{
        port:8083,                              // different for different apps
        historyApiFallback:{
            index: '/index.html'
        },
        headers: {'Access-Control-Allow-Origin': '*'}
    },
    plugins: [
        //if publicpath is never set, scripts are loaded up from the remoteEntry.js file
        //relative to the Domain URL that we loaded remoteEntry.js from
        // sub app will load up the main.js file by going to (where we got remoteentry.js)/main.js
        new ModuleFederationPlugin({
            name:'dashboard',                        // different for different apps
            filename: 'remoteEntry.js',
            exposes:{
                './DashboardApp':'./src/bootstrap'   // different for different apps
            },
            remotes: {
                //store: 'store@http://localhost:8084/remoteEntry.js'
            },
            shared:packageJson.dependencies
        }),
    ]
};

module.exports = merge(commonConfig, devConfig);