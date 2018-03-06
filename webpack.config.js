const {resolve} = require("path");
const merge = require("webpack-merge");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const base = require("./webpack.base");

module.exports = merge(base.config, {
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "awesome-typescript-loader",
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [
        new HardSourceWebpackPlugin({
            cacheDirectory: resolve(__dirname, ".hscache"),
        }),

        new CopyWebpackPlugin([
            {
                from: "common/assets", to: resolve(__dirname, "dist"),
                ignore: [
                    "manifest*json",
                ],
            },
            {
                from: `common/assets/manifest.${process.env.NODE_ENV}.json`, to: resolve(__dirname, "dist/manifest.json"),
            },
            {
                from: resolve(__dirname, "node_modules/crx-hotreload/hot-reload.js"),
                to: resolve(__dirname, "dist/scripts"),
            },
        ]),
    ],
});
