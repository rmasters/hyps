const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');
const dedupe = require('postcss-discard-duplicates');
const autoprefixer = require('autoprefixer');
const postcss = () => [ cssnext, autoprefixer, dedupe ];

const loaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    },
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    },
    {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
            [
                'css-loader?' + [
                    'modules',
                    'importLoaders=1',
                    'localIdentName=[name]__[local]_[hash:base64:5]'
                ],
                'postcss-loader'
            ].join('!')
        )
    },
];

const plugins = [
    new ExtractTextPlugin('style.css'),
    new webpack.NoErrorsPlugin()
];

module.exports = [
    {
        name: 'server',
        target: 'node',
        entry: [path.join(__dirname, 'src/server.js')],
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'server.js',
            libraryTarget: 'commonjs2'
        },
        module: { 
            loaders: loaders
        },
        plugins: plugins,
        postcss: postcss
    },
    {
        name: 'client',
        target: 'web',
        entry: [path.join(__dirname, 'src/client.js')],
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'client.js'
        },
        module: {
            loaders: loaders
        },
        plugins: plugins,
        postcss: postcss
    }
];
