# 这是项目的一些说明（草稿，只能作为参考）
## 项目的api文档
1. 豆瓣
   - 获取正在热映的电影：
   - https://api.douban.com/v2/movie/in_theaters
   - 获取广州热映电影第一页10条数据：https://api.douban.com/v2/movie/in_theaters?city=广州&start=0&count=10
2. 豆瓣
   - 获取电影Top250：
   - https://api.douban.com/v2/movie/top250
   - 获取电影Top250 第一页 10条数据：https://api.douban.com/v2/movie/top250?start=0&count=10
3. 豆瓣
   - 电影搜索：
   - https://api.douban.com/v2/movie/search
   - 搜索电影《神秘巨星》：https://api.douban.com/v2/movie/search?q=神秘巨星&start=0&count=10
   - 搜索喜剧类型的电影：https://api.douban.com/v2/movie/search?tag=喜剧&start=0&count=10
4. 豆瓣数据
   - 电影详情：
   - https://api.douban.com/v2/movie/subject/:id
   - 如：电影《神秘巨星》的电影id为：26942674，搜索此电影的详细信息：https://api.douban.com/v2/movie/subject/26942674
5. 豆瓣数据
   - 即将上映：
   - https://api.douban.com/v2/movie/coming_soon
   - 如：电影《神秘巨星》的电影id为：26942674，搜索此电影的详细信息：https://api.douban.com/v2/movie/coming_soon?start=0&count=10
### 项目的实现
+ 布局
>> 引入布局的layout布局的典型基本布局进行整改
   - 当我们引入css样式时，始终不生效
   - 去掉#components-layout-demo-top
   - 我们还要逐层查看我们的各个div高度是否100%，content才能设为100%
   - 我们发现每次都是选中电影，刷新地址也不变，因为Menu都是key为2.我们使用window.location.hash
+ 请求我们的数据
(```)
  这是我们使用fetch发送ajax请求
  fetch(url).then(res=>{
      return res.json()  //拿到一个对象，调用res.json()得到新的对象，返回一个promise
  })
  .then(data=>{
      console.log(data)
  })
  fetchJSONP 跨域使用
(```)
+ 更改我们的主题颜色
   - 使用我们的antd.less
   - 根据定制主题配置在webpack.config配置options即可
+ 我们在movie模块遇到的问题
   - 我们发现,左边的slider发现选中状态根据地址变化而变化
   - **解决：**我们使用this.props想获取地址状态获取不到，于是我们使用了window.location.href进行字符串的操作获取值，紧接着让key和defaultSelectedKeys保持同步即可
   - 我们发现,右边的content总是慢一步
   - **解决：**我们使用componentWillReceiveProps(nextProps)接收新的参数,更改state,在this.setState({},function(){})里面调用即可,因为shouldComponentUpdate性能不好，最好不要使用
+ 关于分页器
   - 我们可以使用受控制的分页器
   - 我们使用编程导航进行页面的跳转即可
   - this.props.history.push
+ 关于stars评分
    - 可以使用字符代替
    - 也可以使用ant design的评分Rate来使用
+ 豆瓣large获取会出错
   - 我们等到拿到数据在进行渲染
   - 所以我们放在单独的函数进行处理
   - img3改为img1(url.replace('img3', 'img1'))
   - 处理403：`<meta name="referrer" content="no-referrer" />`
   - [https://blog.csdn.net/tiantang_1986/article/details/83748782]





<!-- 这一句很任性 -->
<!-- <meta name="referrer" content="no-referrer" /> -->

1. 初次加载 在子组件的componentDidMout调用接口,有更新state操作（如果没有state操作，则直接是commponentWillMount，commponentDidMount）
commponentWillMount
commponentDidMount 

shouldComponentUpdate
componentWillUpdate
componnentDidUpdate

2. 点击父组件的左侧side导航，会触发  componentWillReceiveProps
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
componnentDidUpdate

3. 生命周期常见的参数
componentWillMount() {
    console.log('Component WILL MOUNT!')
}
componentDidMount() {
     console.log('Component DID MOUNT!')
}
componentWillReceiveProps(newProps) {
      console.log('Component WILL RECEIVE PROPS!')
}
shouldComponentUpdate(newProps, newState) {
      return true;
}
componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
}
componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
}
componentWillUnmount() {
       console.log('Component WILL UNMOUNT!')
}


 