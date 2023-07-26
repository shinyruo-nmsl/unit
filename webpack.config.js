const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: 'none',
    entry: {
        app: './src/main.ts',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, './dist')
        
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin(
            {template:'./public/index.html'}
        ),
        new MiniCssExtractPlugin({
            filename:'css/[name].[contenthash].css'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test:/\.ts$/, 
                loader: 'ts-loader', 
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader'
                    },
                ]
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".js"],
    },
    
}