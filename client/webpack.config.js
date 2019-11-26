const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/js/app.js',
        './src/less/index.less'
    ],
    output: {
        filename: "./js/app.js",
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        },
                    },
                    'css-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                            publicPath: '../fonts'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'content',
                            publicPath: '../content'
                        }
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'content',
                            publicPath: '../content'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/app.css',
            chunkFilename: 'css/[id].css',
            ignoreOrder: false,
        }),

        new CopyWebpackPlugin([
            {
                from: './src/fonts', to: 'fonts'
            }
            ,
            {
                from: './src/content', to: 'content'
            }
        ]),

        new webpack.DefinePlugin({
            BACKEND_ENDPOINT: `"${process.env.BACKEND}"`
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],

    devtool: "source-map",
};
