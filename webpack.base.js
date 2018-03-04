const {resolve} = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const config = {
    entry: {
        inject: [
            "./inject/scripts/index.ts",
            "./inject/styles/inject.scss",
        ],
        background: [
            "./background/index.ts",
        ],
    },

    resolve: {
        modules: [
            "node_modules",
        ],

        alias: {
            "@common": resolve(__dirname, "app/common/scripts"),
            "@inject": resolve(__dirname, "app/inject/scripts"),
            "@background": resolve(__dirname, "app/background"),
        },

        extensions: [".js", ".jsx", ".ts", ".css"],
    },

    output: {
        filename: "scripts/[name].js",
        path: resolve(__dirname, "dist"),
    },

    context: resolve(__dirname, "app"),

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].css",
                            outputPath: "styles/",
                        },
                    },
                    {
                        loader: "extract-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },

            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"],
            },

            {
                test: /\.(png|jpg)$/, use: "url-loader?limit=15000",
            },
            {
                test: /\.svg$/,
                loader: "url-loader?limit=65536&mimetype=image/svg+xml&name=fonts/[name].[ext]",
            },
            {
                test: /\.woff$/,
                loader: "url-loader?limit=65536&mimetype=application/font-woff&name=fonts/[name].[ext]",
            },
            {

                test: /\.woff2$/,
                loader: "url-loader?limit=65536&mimetype=application/font-woff2&name=fonts/[name].[ext]",
            },
            {

                test: /\.[ot]tf$/,
                loader: "url-loader?limit=65536&mimetype=application/octet-stream&name=fonts/[name].[ext]",
            },
            {
                test: /\.eot$/,
                loader: "url-loader?limit=65536&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]",
            },
        ],
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new CleanWebpackPlugin([
            "dist",
        ]),

        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "./scripts/commons.js",
            minChunks: 2,
        }),
    ],
};

module.exports = config;
