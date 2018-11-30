<template>
	<div>
		<p>嵌套路由页面</p>
		<router-view></router-view>
	</div>
</template>
<script>
	export default{
		methods:{
			handleRouter:function(){
				this.$router.push('/user/123456')
			}
		}
	}
</script>
<style scoped>
	.abc{
		color:yellow;
		font-size: 24px;
	}
</style>