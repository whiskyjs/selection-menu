const {resolve} = require("path");
const fs = require("fs");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const merge = require("webpack-merge");
const base = require("./webpack.base");

module.exports = (env) => {
    const contents = JSON.parse(fs.readFileSync("./package.json"));
    const manifest = JSON.parse(fs.readFileSync("./app/common/assets/manifest.json"));

    if (env) {
        if (env.version === "next") {
            const version = contents.version.split(".").map(s => parseInt(s, 10));
            version[version.length - 1] += 1;
            contents.version = version.join(".");
        } else if (/\d+\.\d+\.\d+/.test(env.version)) {
            contents.version = env.version;
        }
    }

    manifest.version = contents.version;
    contents.config.date = /(.+?)T/.exec(new Date().toISOString())[1].replace(/-/g, ".");

    fs.writeFileSync("./package.json", JSON.stringify(contents, null, 2));
    fs.writeFileSync("./app/common/assets/manifest.json", JSON.stringify(manifest, null, 2));

    return merge(base, {
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
                            options: {
                                configFileName: "tsconfig.production.json",
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": "production",
            }),

            new CopyWebpackPlugin([
                {
                    from: "common/assets", to: resolve(__dirname, "dist"),
                    ignore: [
                        "manifest*json",
                    ],
                },
                {
                    from: "common/assets/manifest.production.json", to: resolve(__dirname, "dist/manifest.json"),
                },
            ]),
        ],
    });
};
