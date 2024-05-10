const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/dashboard/latest/'                             // different for different apps
    },
    plugins:[
        new ModuleFederationPlugin({
            name:'dashboard',                                        // different for different apps
            filename: 'remoteEntry.js',
            exposes:{
                './DashboardApp': './src/bootstrap'                  // different for different apps
            },
            remotes: {
                //store: 'store@http://localhost:8084/remoteEntry.js'
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);