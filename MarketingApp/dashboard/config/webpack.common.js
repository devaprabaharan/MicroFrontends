const HTMLWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');

module.exports = {
    entry:'./src/index.js',
    output: {
        filename:'[name].[contenthash].js'
    },
    resolve: {
        extensions:['.js', '.vue']
    },
    module:{
        rules:[
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [
                    { loader: 'file-loader'}
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test:/\.m?js$/, //when we import a file that extends with .mjs or .js process using babel
                exclude:/node_modules/, //do not run this loader in nodemodules
                use:{
                    loader: 'babel-loader', // process different files from es2015,16..20 and turn it into ES5
                    options: {
                        presets:['@babel/preset-env'], //[babel process jsx, transform ES2015.. to ES5]
                        plugins:['@babel/plugin-transform-runtime'], // enable features in browser like async await
                    }
                }
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './public/index.html'
        }),
        new VueLoaderPlugin()
    ]
}