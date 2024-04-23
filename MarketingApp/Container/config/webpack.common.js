module.exports = {
    module:{
        rules:[
            {
                test:/\.m?js$/, //when we import a file that extends with .mjs or .js process using babel
                exclude:/node_modules/, //do not run this loader in nodemodules
                use:{
                    loader: 'babel-loader', // process different files from es2015,16..20 and turn it into ES5
                    options: {
                        presets:['@babel/preset-react', '@babel/preset-env'], //[babel process jsx, transform ES2015.. to ES5]
                        plugins:['@babel/plugin-transform-runtime'], // enable features in browser like async await
                    }
                }
            }
        ]
    }
}