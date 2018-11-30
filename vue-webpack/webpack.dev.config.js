const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader'); //vue-loader，15的版本需要再添加plugin的配置
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs =require('fs');

console.log("dev开发环境");
console.log(process.env.NODE_ENV);
fs.open(path.resolve(__dirname,'src/build/env.js'), 'w', function (err, fd) {
    if (err) throw err;
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {
        if(err) throw err;
     });
});

const config = {
    //配置的单入口，webpack从index.js开始工作,webpack4默认entry 路径./src/index.js
    mode: 'development', // mode选项有3个可选值：production （默认） 、development、none。
    devtool: 'cheap-module-source-map', //https://webpack.docschina.org/configuration/devtool/
    entry: {
        main: './src/index'
    },
    output: { //打包后的文件会存储为demo/dist/main.js 在html中引用它就可以了
        path: path.join(__dirname, './dist'), //打包后文件的输出目录
        publicPath: '/dist/', //指定资源文件引用目录，可以是CDN
        filename: 'main.js' //输出文件的名称
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [
                            'vue-style-loader',
                            'mini-css-extract-plugin',
                            'css-loader'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ //数组形式的话，编译是从后往前。
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024*20' //文件小于20k就以base64形式加载
            }
        ]
    },
    plugins: [
        // new ExtractTextPlugin({
        // 	filename:'main.css',//重命名提取后的css文件
        // 	allChunks: true //有了chunk，需要在此配置
        // }), 
        new MiniCssExtractPlugin('main.css'),
        // new ExtractTextPlugin("main.css"), 
        new VueLoaderPlugin() //vue-loader，15的版本需要再添加plugin的配置
    ],
    // Resolve配置webpack如何寻找模块对应的文件。
    resolve: {
        extensions: ['.js', '.vue'],  // 可以省略文件后缀名，如果没有js 则找vue，还找不到就报错。
        alias: {
            '@views': path.join(__dirname, 'src/views'),
            '@api': path.join(__dirname, 'src/api'),
            '@imgs': path.join(__dirname, 'src/views'),
            '@mock': path.join(__dirname, 'src/mock'),
            '@request': path.join(__dirname, 'src/request'),
            '@config': path.join(__dirname, 'src/config'),
            '@router': path.join(__dirname, 'src/router'),
            '@theme': path.join(__dirname, 'src/conthemefig')
        }
    }
};
module.exports = config


