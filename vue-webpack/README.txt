mkdir vue-webpack
cd vue-webpack
mkdir demo
cd demo
npm init
```
初始化配置，一路回车即可。完成后会在demo目录生成package.json

本地局部安装webpack:

`npm install webpack --save-dev`


全局装webpack卸载就把install换成uninstall,更新就是update

`npm install webpack -g`


装webpack-dev-server 他可以在开发环境提供很多服务，比如启动一个服务器，热更新，接口代理等。

`npm install webpack-dev-server --save-dev`             

在demo文件夹下创建一个webpack.config.js文件。之后装的加载器一般都要在这里配置下。
```
var config = {

};
module.exports = config
//ES6: export default config
```  

在package.json的scripts里加一个快速启动：   

`"dev": "webpack-dev-server --mode development --open --config webpack.config.js"`   

--open是自动打开浏览器，默认地址是127.0.0.1:8080 --config是指向读取的配置文件路径。
--mode development是设置为开发模式

局域网下看本机ip，改好后可以手机访问。其中ip和端口是可以配置的：

`"dev": "webpack-dev-server --host 192.168.10.122 --port 8080 --open --config webpack.config.js"`

在demo下新建一个src文件夹，里边创建index.js作为入口文件,在webpack.config.js中进行入口entry和输出output的配置。  
  
在demo下新建一个index.html文件作为spa的入口。 npm run dev就会自动打开页面了。   
**注意：按书中操作会提示找不到module webpack-cli/bin/config-yargs 要装下cli**  
`npm install webpack-cli`

webpack世界里每个文件都是一个模块，不同的模块需要不同的加载器(Loaders)来处理。写css用到：  
```
npm install css-loader --save-dev
npm install style-loader --save-dev
```  

安装完在webpack.config.js里配置：   
```
module:{
rules:[
{
    test: /\.css$/,
    use:[ //数组形式的话，编译是从后往前。
        'style-loader',
        'css-loader'
    ]
}
]
}
```  

在src文件夹下新建style.css，写内容。在main.js里导入：`import './style.css'`  

样式都是通过js创建出来的。要使用插件把散落在各地的css提取出来，并生成一个main.css文件（都要在webpack.config.js里配置），最终在index.html里通过link形式加载。  
`npm install extract-text-webpack-plugin@next --save-dev`  

*书里的插件版本已经不支持webpack4，所以要用插件后边带个@next的版本。*  

配置webpack.config.js：  
```
var ExtractTextPlugin = require('extract-text-webpack-plugin');

{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'style-loader'
    })
}
plugins:[
    new ExtractTextPlugin({
        filename:'main.css',//重命名提取后的css文件
        allChunks: true
    })
]
```   
或者用另一个插件直接支持webpack4，实现：`npm install mini-css-extract-plugin --save-dev`  
```
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

{
	test: /\.css$/,
	use:[ //数组形式的话，编译是从后往前。
		MiniCssExtractPlugin.loader,
	　　 　　"css-loader"
	]
}
plugins:[
	new MiniCssExtractPlugin('main.css')
]
```   

一个.vue文件一般包含三部分template,script,style。使用.vue文件需要先安装vue-loader,vue-style-loader等加载器并做配置，要使用ES6语法，还要装babel和babel-loader等加载器。

```
npm install --save vue
npm install --save-dev vue-loader
npm install --save-dev vue-style-loader
npm install --save-dev vue-template-compiler
npm install --save-dev vue-hot-reload-api
npm install --save-dev babel
npm install --save-dev babel-loader
npm install --save-dev babel-core
npm install --save-dev babel-plugin-transform-runtime
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-runtime
```

*注意:vue-loader需要在webpack.config.js配置里写入vueloadpluin*  
~~npm install --save-dev babel~~ 已换成npm install --save-dev babel-cli  
~~npm install --save-dev babel-preset-es2015~~已换成npm install --save-dev babel-preset-env

在demo目录下用编辑器新建一个名为.babelrc的文件（没有文件名）。写入babel的配置，webpack会依赖此配置文件来使用babel编译ES6:   
```
{
	"presets":["es2015"], （这里要把es2015换成env）
	"plugins":["transform-runtime"],
	"comments":false
}
```   
配置webpack.config.js来支持对.vue文件和es6的解析：   

```
const { VueLoaderPlugin } = require('vue-loader'); 
//vue-loader，15的版本需要再添加plugin的配置

{
	test:/\.vue$/,
	loader:'vue-loader',
	options:{
		loaders:{
			css:[
				'vue-style-loader',
				'mini-css-extract-plugin',
				'css-loader'
			]
		}
	}
},
// 除非您要自定义 entry point(入口点) ，否则无需指定babel-loader。
// {
// 	test:/\.js$/,
// 	loader:'babel-loader',
// 	exclude:/node_modules/
// }
```   
安装url-loader和file-loader来支持图片字体等:   
```
npm install --save-dev url-loader 
npm install --save-dev file-loader
```   
本章最后开发环境配置：  
```
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader'); //vue-loader，15的版本需要再添加plugin的配置
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	//配置的单入口，webpack从index.js开始工作,webpack4默认entry 路径./src/index.js
	// 所以下边的entry可以不写
	// entry:{
	// 	main:'./src/index'
	// },
	output:{//打包后的文件会存储为demo/dist/main.js 在html中引用它就可以了
		path:path.join(__dirname,'./dist'), //打包后文件的输出目录
		publicPath:'/dist/', //指定资源文件引用目录，可以是CDN
		filename:'main.js' //输出文件的名称
	},
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader',
				options:{
					loaders:{
						css:[
							'vue-style-loader',
							'mini-css-extract-plugin',
							'css-loader'
						]
					}
				}
			},
			{
				test: /\.css$/,
				use:[ //数组形式的话，编译是从后往前。
					MiniCssExtractPlugin.loader,
        　　 　　 	'css-loader'
				]
			},
			// {
			// 	test:/\.vue$/,
			// 	loader:'vue-loader',
			// 	options:{
			// 		loaders:{
			// 			css:ExtractTextPlugin.extract({
			// 				use:'css-loader',
			// 				fallback:'vue-style-loader'
			// 			})
			// 		}
			// 	}
			// },
   //          {
   //              test: /\.css$/,
   //              use: ExtractTextPlugin.extract({
   //                  use: 'css-loader',
   //                  fallback: 'style-loader'
   //              })
   //          },
   			// 除非您要自定义 entry point(入口点) ，否则无需指定babel-loader。
			// {
			// 	test:/\.js$/,
			// 	loader:'babel-loader',
			// 	exclude:/node_modules/
			// },
            {
            	test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            	loader:'url-loader?limit=1024' //文件小于1k就以base64形式加载
            }
		]
	},
	plugins:[
		new MiniCssExtractPlugin('main.css'),
		// new ExtractTextPlugin("main.css"), 
		new VueLoaderPlugin() //vue-loader，15的版本需要再添加plugin的配置
	]
};
module.exports = config
//ES6: export default config
```   
到生产环境时打包需要用到：   
```
npm install --save-dev webpack-merge
npm install --save-dev html-webpack-plugin 
```  
webpack-merge用于合并两个webpack文件，方便写生产环境的配置文件  
html-webpack-plugin用来生成html文件，通过template选项来读取指定的模板index.ejs   

为了方便开发和生产环境的切换,demo下新建一个生产环境的配置文件webpack.prod.config.js
在package.json中再加一个build的快捷脚本用来打开:   
`"build": "webpack --progress --mode production --hide-modules --config webpack.prod.config.js"`   

```
webpack.prod.config.js配置文件：  

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');

webpackBaseConfig.plugins = [];

module.exports = merge(webpackBaseConfig,{
	output:{
		publicPath:'/dist/',
		filename:'[name].[hash].js'
	},
	plugins:[
		// new ExtractTextPlugin({
		// 	filename:'[name].[hash].css', 
		// 	allChunks:true
		// }),
		new MiniCssExtractPlugin({
			filename:'[name].[hash].css'
		}),
		new webpack.DefinePlugin({
			'process.env':{
				NODE_ENV:'"production"'
			}
		}),
		// 压缩已经不用写UglifyJsPlugin
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress:{
		// 		warnings:false
		// 	}
		// }),
		new HtmlWebpackPlugin({
			filename:'../index_prod.html',
			template:'./index.ejs',
			inject:false
		}),
		new VueLoaderPlugin() //vue-loader，15的版本需要再添加plugin的配置
	]
});
```   
index.ejs动态设置了静态资源的路径和文件名。   
ejs是一个js模板库，用来从json数据中生成html字符串，常用于nodejs  
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack App</title>
    <link rel="stylesheet" href="<%= htmlWebpackPlugin.files.css[0] %>">
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript" src="<%= htmlWebpackPlugin.files.js[0] %>"></script>
</body>
</html> 
```   
>小知识：项目需要重新安装模块的时候，复制好package.json后，npm install   就会安装dependencies字段内的所有依赖模块了。   

node/npm查看安装过的模块或包。结果和文件夹下面的node_modules目录是对应的：
```
npm ls --depth 0
npm ls -g --depth 0
```   
`npm list` 会显示和你已经安装模块的关联模块---这些没有在 package.json文件中被引用。你可以单独 `npm uninstall` 每一个模块或者全部移除它们： `npm prune`






 



2.path.join 和 path.resolve的区别

path.join只会简单将路径片段进行拼接，而path.resolve总会返回一个相对于当前工作目录的绝对路径，如果遇到"/"开头的目录，此之前的路径都将会被抛弃。
path.join('/a','/b');       //  'a/b'
path.join('./a','/b');      //  'a/b'
path.resolve('/a','/b');    // '/b'
path.resolve('./a','./b')   //'/Users/username/Projects/webpack-demo/a/b'


less 4版本有问题引入"less": "^2.7.3",


一、小括号()、中括号[]、大括号的区别

　1>. 小括号()：匹配小括号内的字符串，可以是一个，也可以是多个，常跟“|”（或）符号搭配使用，是多选结构的

　　示例1：string name = "way2014";  regex：(way|zgw)  result：结果是可以匹配出way的，因为是多选结构，小括号是匹配字符串的

　　示例2：string text = "123456789";  regex：(0-9)　result：结果是什么都匹配不到的，它只匹配字符串"0-9"而不是匹配数字, [0-9]这个字符组才是匹配0-9的数字

　2>.中括号[]：匹配字符组内的字符，比如咱们常用的[0-9a-zA-Z.*?!]等，在[]内的字符都是字符，不是元字符，比如“0-9”、“a-z”这中间的“-”就是连接符号，表示范围的元字符，如果写成[-!?*(]这样的话，就是普通字符

　　示例1： string text = "1234567890";  regex：[0-9]  result：结果是可以匹配出字符串text内的任意数字了，像上边的【或符号“|”在字符组内就是一个普通字符】

　　示例2：string text = "a|e|s|v";  regex：[a|e|s]  result：结果就是匹配字符a、e、|三个字符，这个跟(a|e|s)有区别的，区别就是(a|e|s)匹配的是a、e、s三个字符的随意一个，三个中的任意一个，这是的|是元字符

　3>.大括号{}：匹配次数，匹配在它之前表达式匹配出来的元素出现的次数，{n}出现n次、{n,}匹配最少出现n次、{n,m}匹配最少出现n次，最多出现m次


4.获取环境变量，windows获取有问题，我们可以借助第三方
npm install cross-env --save-dev
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}