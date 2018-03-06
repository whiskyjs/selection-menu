const {resolve} = require("path");
const fs = require("fs");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    utils: {
        CompilerHookPlugin: class {
            constructor(hooks) {
                this.hooks = hooks;
            }

            apply(compiler) {
                for (const event of Object.getOwnPropertyNames(this.hooks)) {
                    compiler.plugin(event, (compilation, callback) => {
                        this.hooks[event]();

                        callback();
                    });
                }
            }
        },

        setVersion: (env) => {
            const pkg = JSON.parse(fs.readFileSync("./package.json"));
            const manifest = JSON.parse(fs.readFileSync("./dist/manifest.json"));

            if (env) {
                if (env.version === "next") {
                    const version = pkg.version.split(".").map(s => parseInt(s, 10));

                    version[version.length - 1] += 1;
                    pkg.version = version.join(".");
                } else if (/\d+\.\d+\.\d+/.test(env.version)) {
                    pkg.version = env.version;
                }
            }

            manifest.version = pkg.version;
            pkg.config.date = /(.+?)T/.exec(new Date().toISOString())[1].replace(/-/g, ".");

            fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
            fs.writeFileSync("./dist/manifest.json", JSON.stringify(manifest, null, 2));
        },
    },

    config: {
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
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": process.env.NODE_ENV,
            }),

            new webpack.NoEmitOnErrorsPlugin(),

            new CleanWebpackPlugin([
                "dist",
            ]),

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
            ]),

            new webpack.optimize.CommonsChunkPlugin({
                name: "commons",
                filename: "./scripts/commons.js",
                minChunks: 2,
            }),
        ],
    },
};
