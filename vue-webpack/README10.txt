gulp
http://www.siyuweb.com/gulp/3207.html
gulp.task('makeKitStructure', () =>{
    // return gulp.src(['./**', './.*', '!./cms-kit-example/**', '!./cms-kit-example']) // 提价代码一定要nodemodeuls ,测试方便先加上
    return gulp.src(['./**', '!./cms-kit-example/**', '!./cms-kit-example', '!node_modules'])
        .pipe(gulp.dest('build/cms-kit/cms-kit'));
});



这个还真不能直接简写./**'，因为发现这样的话.babelr会不见，eslingignore以及gitignor会拷贝不不了。

/**
 * 复制整个项目，准备制作工具箱
 */
gulp.task('makeKitStructure', () =>{
    // return gulp.src(['./**', './.*', '!./cms-kit-example/**', '!./cms-kit-example'])
    return gulp.src(['./**', './.*', '!./cms-kit-example/**', '!./cms-kit-example', '!node_modules', '!node_modules/**', '!./build', '!./build/**'])
        .pipe(gulp.dest('build/cms-kit/cms-kit-example'));
});



多一层文件夹包裹 难道是文件没有名字的问题

gulp.task('zipKit', () => {
    // return gulp.src(['./build/cms-kit/**', './build/cms-kit/**/.*'])
    return gulp.src(['./build/*/**', './build/*/**/.*'])
        .pipe(zip('cms-kit-example.zip'))
        .pipe(gulp.dest('./build'));
});


webpack

npm init 
npm install webpack --save-dev
npm install webpack-dev-server --save-dev 它可以在开发环境中提供很多服务，比如启动 个服务器、热更新、接口代理等，配置起来也很简单。

创建webpack.config.js

在package.json scripts 文件夹里加入以下内容。 (json 文件双引号，且不能含有注释)。

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --host 192.168.0.225 --port 8080 --open --config webpack.config.js"
  }

  当运行npm run dev的时候，会执行 webpack-dev-server --open --config webpack.config.js，其中--config webpack.config.js 就是读该文件。

    Q:
    When using npm: npm i -D webpack-cli  -->手动安装下

    WARNING in configuration
    The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
    You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

   默认会打开地址 http://localhost:8080/， 我们可以指定局域网地址，--host 192.168.0.225 --port 8080 ,完整代码如下
    "dev": "webpack-dev-server --host 192.168.0.225 --port 8080 --open --config webpack.config.js"


path.join 与 path.resolve 的区别
1. 对于以/开始的路径片段，path.join只是简单的将该路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃，就像是在terminal中使用cd命令一样。

path.join('/a', '/b') // 'a/b'
path.resolve('/a', '/b') // '/b'
 

2. path.resolve总是返回一个以相对于当前的工作目录（working directory）的绝对路径。

path.join('./a', './b') // 'a/b'
path.resolve('./a', './b') // '/Users/username/Projects/webpack-demo/a/b'

module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。


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