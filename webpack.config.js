const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: ['./src/js/script.js', /* ./src/js/script3.js' */],
        // main2: ['./src/js/script2.js']
    },
    output: {
        filename: 'js/style.min.js',
        path: path.resolve(__dirname, './dist')
    },
    /* devServer: {
        contentBase: "./dist",
        port: 9000
    }, */
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin()
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: './src/images',
                to: './images'
            }]
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.min.css',
            template: './src/css/scss/style.scss'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: ['./dist']
            },
            open: 'external',
            // proxy: 'http://localhost:3100/'
        })
    ],
    module: {
        rules: [{
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', //interpreta @import, url()...
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|webp|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        emitFile: false,
                        name: '../images/[folder]/[name].[ext]',
                    }
                }
            }
        ]
    }
}