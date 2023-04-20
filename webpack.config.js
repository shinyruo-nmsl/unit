const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'none',
    entry: {
        app: './src/main.ts',
    },
    output: {
        filename: '[name].[hash].js',
        path:path.resolve(__dirname, './dist')
    },
    plugins: [
        new HtmlWebpackPlugin(
            {template:'./public/index.html'}
        )
    ],
    module: {
        rules: [
            {
                test:/\.ts$/, 
                loader: 'ts-loader', 
            }
        ]
    },
    resolve: {
        extensions: [".ts"],
    }

}