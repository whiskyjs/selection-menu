const merge = require("webpack-merge");
const base = require("./webpack.base");

module.exports = env => merge(base.config, {
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
        new base.utils.CompilerHookPlugin({
            "after-emit": () => base.utils.setVersion(env),
        }),
    ],
});
