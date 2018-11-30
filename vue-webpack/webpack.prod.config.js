const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.dev.config');
const fs =require('fs');
console.log("正式环境");
fs.open(path.resolve(__dirname,'src/build/env.js'), 'w', function (err, fd) {
    if (err) throw err;
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {
        if(err) throw err;
     });
});
webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig, {
	output: {
		publicPath: '/dist/',
		filename: '[name].[chunkhash].js'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new HtmlWebpackPlugin({
			filename: '../index_prod.html',
			template: './index.ejs', // 模板类型
			inject: false,           // 1、true或者body：所有JavaScript资源插入到body元素的底部  2、head: 所有JavaScript资源插入到head元素中 3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
			title:'生成的title'
			// favicon:'a.ico'
		}),
		new VueLoaderPlugin() //vue-loader，15的版本需要再添加plugin的配置
	]
});



