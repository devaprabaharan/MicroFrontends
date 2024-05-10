const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const devConfig = {
    mode: 'development',
    output:{
        publicPath:'http://localhost:4200/'
    },
    devServer:{
        port:4200,
        historyApiFallback:{
            index: '/index.html'
        },
        headers: {'Access-Control-Allow-Origin': '*'}
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes:{
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                //auth: 'auth@http://localhost:8082/remoteEntry.js',
                //dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
                //store: 'store@http://localhost:8084/remoteEntry.js'
            },
            shared:packageJson.dependencies  //we can provide individual dependencies to be shared as well
        })
        
    ]
};

module.exports = merge(commonConfig, devConfig);