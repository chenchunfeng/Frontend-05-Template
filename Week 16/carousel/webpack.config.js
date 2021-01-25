const path = require('path');

module.exports = {
    // 入口
    entry: "./main.js",
    // output: {
    //     filename: "[name].js",
    //     path:path.resolve(__dirname,"build")
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [[
                            "@babel/plugin-transform-react-jsx",
                            {pragma: "createElement"}
                        ]]
                    }
                }
            }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    }
}