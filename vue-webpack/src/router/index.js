import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
const Routers = [
		//resolve在请求页面时，才去加载这个页面的js。异步实现懒加载。 使用了异步路由后，编译出的每个页面的js都叫chunk(块)
		//如要一次性加载，可以： component:require('.views/index.vue')
	{
		path:'/index',
		meta:{
			title:'首页'
		},
		component:(resolve) => require(['@views/index'],resolve)
	},
	{
		path:'/about',
		meta:{
			title:'关于'
		},
		component:()=>import('@views/about.vue')
	},
	{
		path:'/test',
		component:()=>import('@views/test.vue'),
		meta:{
			title:'嵌套路由'
		},
		children: [{
	      path: 'about',
	      meta: { title: '权限管理'},
	      component:()=>import('@views/about.vue')
	    }]
	},
	{
		path:'/user/:id',
		meta:{
			title:'个人主页'
		},
		component:(resolve) => require(['@views/user.vue'],resolve)
	},
	//当访问的路径不存在，重新定向到首页
	{
		path:'*',
		redirect:'/index',
		hidden:true
	}
];

const router = new VueRouter({
	//使用html的History路由模式,默认hash
	// mode:'history',
	routes: Routers
});


router.beforeEach((to,from,next)=>{
	window.document.title = to.meta.title;
	next();
});

export default router;