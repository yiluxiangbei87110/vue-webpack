import React from 'react';
import {Layout,Menu} from 'antd';
import {Link,Route,Switch} from 'react-router-dom';
import MovieList from './movie/MovieList.js';
import MovieDetail from './movie/MovieDetail.js';
export default class Movie extends React.Component{
	render(){
		return (
				<Layout style={{height:'100%'}}>
					<Layout.Sider width={180} style={{ background: '#fff'}}>
			              <Menu mode='inline'>
			              		<Menu.Item key='in_theaters'><Link to='/movie/in_theaters/1'>1111111111111111</Link></Menu.Item>
			              		<Menu.Item key='coming_soon'><Link to='/movie/coming_soon/1'>2222222222222222222</Link></Menu.Item>
			              		<Menu.Item key='top250'><Link to='/movie/top250/1'>333333333333333</Link></Menu.Item>
			              </Menu>
					</Layout.Sider>
					<Layout.Content>
						<Switch>
							<Route path='/movie/detail/:id' component={MovieDetail}></Route>
							<Route path='/movie/:types/:start' component={MovieList} ></Route>
						</Switch>
					</Layout.Content>
				</Layout>
			)
	}
}