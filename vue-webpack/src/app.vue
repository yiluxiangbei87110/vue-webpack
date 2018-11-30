<template>
    <div class="wrap">
        <Sider class="side">
            <Menu active-name="1-1" width="auto" :open-names="['1']" theme="light">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        测试1
                    </template>
                    <router-link  to="/index">
                        <MenuItem name="1-1">首页</MenuItem>
                    </router-link>
                    <router-link to="/about">
                        <MenuItem name="1-2">关于页</MenuItem>
                    </router-link>
                    <router-link to="/user/12">
                        <MenuItem name="1-3">用户页</MenuItem>
                    </router-link>
                    <router-link to="/test/about">
                        <MenuItem name="1-4">嵌套路由页</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        测试2
                    </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <MenuItem name="2-3">option3</MenuItem>
            </Menu>
        </Sider>
        <Layout class="main">
            <Header class="header">
                <Menu mode="horizontal" theme="light" active-name="1">
                    <div class="header-logo"></div>
                    <div class="header-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>Item 1
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>Item 2
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>Item 3
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>Item 4
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content class="content">
                <router-view></router-view>
            </Content>
        </Layout>
    </div>
</template>
<script>
import routers from '@router/index.js';
export default {
    data() {
        return {

        }
    },
    computed: {
        routes() {
            return routers.options.routes;
        }
    }
}
</script>
<style>
html {
    height: 100%;
}

body {
    height: 100%;
}
</style>
<style lang="less" scoped>
.wrap {
    border: 1px solid #d7dde4;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    height: 100%;
}

.main {
    margin-left: 200px;
    height: 100%;
}

.side {
    position: fixed;
    height: 100vh;
    left: 0;
    overflow: auto;
    background: #fff;
}

.content {
    padding: 0 4px 16px;
    height: 100%;
    overflow: auto;
}

.header {
    background: #fff;
}

.header-logo {
    width: 100px;
    height: 30px;
    background: lightgreen;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.header-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>