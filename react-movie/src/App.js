import React from 'react';
import {HashRouter,Route,NavLink} from 'react-router-dom';
import { Layout,Menu } from 'antd';
import Home from './views/Home.js';
import About from './views/About.js';
import Movie from './views/Movie';
import LayoutLogo from './common/css/app.less';
export default class App extends React.Component {
    render() {
        return (
            <HashRouter>
                <Layout className='layout' style={{height:'100%'}}>
                    <Layout.Header style={{display:'flex',alignItems:'center'}}>
                        <div className={LayoutLogo.logo}></div>
                        <Menu theme='dark' mode='horizontal'  defaultSelectedKeys={['home']} style={{lineHeight:'64px'}}>
                            <Menu.Item key='home'><NavLink to='/home'>首页</NavLink></Menu.Item>
                            <Menu.Item key='about'><NavLink to='/about'>关于</NavLink></Menu.Item>
                            <Menu.Item key='movie'><NavLink to='/movie'>天幕</NavLink></Menu.Item>
                        </Menu>
                    </Layout.Header>

                    <Layout.Content style={{background:'lightgreen'}}>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/about' component={About}></Route>
                        <Route path='/movie' component={Movie}></Route>
                    </Layout.Content>

                    <Layout.Footer style={{textAlign:'center'}}>
                        <div>it is footer</div>
                    </Layout.Footer>
                </Layout>
            </HashRouter>
        )
    }
}