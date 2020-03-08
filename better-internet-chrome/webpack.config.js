const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index_options: './src/options.ts',
        index_popup: './src/popup.ts'
    },
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
    },
    plugins: [
        new CopyPlugin([
            { from: './src/images/', to: './' },
            { from: './src/pages/', to: './' },
            { from: './src/manifests/', to: './' }
        ]),
    ]
};