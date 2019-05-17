const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            'primary-color': '#faad14',
                            'link-color': '#faad14',
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    },
                }]
            },
            { test: /\.(png|jpg|jpeg|bmp|gif)$/, use: 'url-loader?limit=5000&name=img-[hash:8].[ext]' },
            //当图片超过5000字节，则以原来的名字显示，防止图片重复要加hash值
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                options: {
                  plugins: [
                    ['import', [{ libraryName: 'antd', style: true }]],
                  ],
                  cacheDirectory: true,
                }
              }
        ]
    }
}