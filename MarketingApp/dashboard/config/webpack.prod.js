const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN;

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
                store: `store@${domain}/store/latest/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, prodConfig);