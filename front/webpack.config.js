const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode:"production",
    module:{
        rules:[{
            test: [/\.ts$/, /\.css$/],
            use: [
                'style-loader',
                {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                },
                "ts-loader",
            ]
        },
        ],
    },
    resolve:{
        extensions:['.ts','.js', 'tsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin')
    }
};