const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptmizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/script.js', 'whatwg-fetch'],
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [new OptmizeCssAssetsPlugin(), new TerserPlugin()]
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg|webp)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        emitFile: false,
                        name: 'images/[folder]/[name].[ext]',
                    }
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            template: 'src/style.css'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: ['dist']
            },
            open: 'external',
            // proxy: 'http://localhost:3100/'
        }),
        //   {
        //     // prevent BrowserSync from reloading the page
        //     // and let Webpack Dev Server take care of this
        //     reload: false
        //   }
    ],
}