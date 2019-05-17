import React from 'react';
import { Button, Icon, Spin, Alert } from 'antd';
import fetchJSONP from 'fetch-jsonp';
export default class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isloading: true,
            moviedetail: {}
        }
    }
    render() {
        return <div style={{marginTop:'10px'}}>
        <Button type="primary"  onClick={this.goMovieList}>
            <Icon type="left"/>返回电影列表
        </Button>
        {this.renderInfo()}
        </div>
    }
    componentWillMount() {
        fetchJSONP('https://douban.uieee.com/v2/movie/subject/' + this.props.match.params.id)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                this.setState({
                    moviedetail: data,
                    isloading: false
                })
            })
    }
    goMovieList = () => {
        this.props.history.go(-1)
    }
    renderInfo = () => {
        if (this.state.isloading) {
            return <Spin tip="Loading...">
            <Alert
              message="正在请求电影数据"
              description="精彩内容，马上呈现....."
              type="info"
            />
          </Spin>
        } else {
            return <div>
            <div style={{ textAlign: 'center' }}>
              <h1>{this.state.moviedetail.title}</h1>
              <img src={this.state.moviedetail.images.large}/>
            </div>
            <p style={{ textIndent: '2em', lineHeight: '30px' }}>{this.state.moviedetail.summary}</p>
          </div>
        }
    }
}