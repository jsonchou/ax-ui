"use strict"

const os = require('os');
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// const HappyPack = require('happypack');
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const env = process.env.NODE_ENV === 'production' ? 'p' : 'd';

const version = process.env.VERSION || require('../package.json').version;
const config = require('./config.js');

const spa = config.spa;

console.log('---------------------------');
console.log(process.env.NODE_ENV);
console.log(`${spa.toUpperCase()} PROJECT`);
console.log('---------------------------\n');

//set base loaders
let myLoaders = [
    {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "autoprefixer-loader"]
        }),
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "sass-loader"]
        }),
    },
    {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "less-loader"]
        }),
    },
    {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '..', spa),
        use: [{
            loader: "file-loader",
            options: {
                publicPath: `/${spa}/`,
                name: `dist/fonts/[name].[ext]`,
                // outputPath
            }
        }]
    }
];

if (spa == 'react') {
    let tmp = [{
        test: /\.js[x]$/,
        include: path.resolve(__dirname, '..', spa),
        exclude: /node_modules/,
        use: ['babel-loader']
    },];
    myLoaders = myLoaders.concat(tmp)
    myAlias = {};
} else if (spa == 'vue') {
    let tmp = [{
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/,
        use: ['babel-loader']
    },
    {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
    },
    ];
    myLoaders = myLoaders.concat(tmp)
}

let plugins = [
    new ExtractTextPlugin({
        filename: `dist/[name].css`,
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendors",
        filename: `dist/[name].js`,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new UglifyJSPlugin({
        exclude: /\.min\.js$/,
        parallel: true,
        uglifyOptions: {
            output: {
                comments: false,
            },
            compress: env === 'p',
            warnings: false,
            sourceMap: env === 'd',
        }
    }),
    new webpack.BannerPlugin({
        banner: `/**
    * ${spa} app v${version}
    * (@) ${new Date().getFullYear()} JSONCHOU
    */`,
        raw: true,
        entryOnly: true
    })
]

module.exports = {
    context: __dirname,
    node: {
        __dirname: true
    },
    //debug: process.env.NODE_ENV === 'development' ? true : false,//#source-map|#cheap-module-eval-source-map|eval
    devtool: env === 'p' ? false : 'eval',
    entry: {
        'ax': `../${spa}/examples/main.js${spa === 'react' ? 'x' : ''}`,
        vendors: [`${spa}`, `${spa}-router`]
    },
    output: {
        path: path.join(__dirname, `../${spa}/src`),
        filename: `dist/[name].js`,
        chunkFilename: 'dist/[name].[id].chunk.js',
        publicPath: `${spa}`,
    },
    // We use PostCSS for autoprefixing only.
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.vue'],
        modules: ['node_modules']
    },
    module: {
        rules: myLoaders
    },
    externals: {

    },
    devServer: {
        "host": '0.0.0.0',
        "disableHostCheck": true,
        "useLocalIp": true,
        "contentBase": "./",
        "historyApiFallback": false,
        "port": config.port,
        "open": false,
        "quiet": false,
        "noInfo": false,
        "inline": true,
        "lazy": false,
        "watchOptions": {
            "aggregateTimeout": 300,
            "ignored": {}
        }
    },
    plugins,
}

// [hash] - [chunkhash] - [name] - [id] - [query] / assets / scripts / [name].chunk.js
// a3f965f56d770e1bce5d - b3dfd9ab151f019d3dea - 0 - 0 - /assets/scripts / 0. chunk.js