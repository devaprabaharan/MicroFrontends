const {merge} = require('webpack-merge');

const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const devConfig = {
    mode: 'development',
    output:{
        publicPath:'http://localhost:8084/'
    },
    devServer:{
        port:8084,
        historyApiFallback:{
            index: '/index.html'
        },
        headers: {'Access-Control-Allow-Origin': '*'}
    },
    plugins: [
        new ModuleFederationPlugin({
            name:'store',
            filename: 'remoteEntry.js',
            exposes:{
                './StoreApp':'./src/store'
            },
            shared:packageJson.dependencies
        }),
    ]
};

module.exports = merge(commonConfig, devConfig);