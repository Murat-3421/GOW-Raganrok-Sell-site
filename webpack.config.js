const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: "./src/asets/js/index.js"
    },
    output:{
        clean: true,
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devServer:{
        static: './src',
        compress: true,
        port: 9000,
        hot: true
    },
    module:{
        rules:[
            // reguli pentru stilizare
            {
                // ce fel de file folosim css sau sass
                test: /\.(s[ac]ss|css)$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            // pentru imagini 
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type:  "asset/resource",
            }
        ]
    },
    // plugin pentru html file
    plugins:[
        new HtmlWebpackPlugin({
            title: "God Of War",
            template: 'src/index.html'
        })
    ]
}