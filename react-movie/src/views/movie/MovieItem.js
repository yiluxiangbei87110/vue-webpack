import React from 'react';
import '../../common/css/movieitem.less';

export default class MovieItem extends React.Component {
    constructor(props){
        super(props);
        
    }
    starsRender(){
        var starsCount = Math.ceil(this.props.rating.stars/10);
        var starsArrMount = ['☆','☆','☆','☆','☆'];
        var starsNew = starsArrMount.map((item,i)=>{
            if(i<starsCount){
                item = '★'
            }else{
                item = '☆'
            }
             return item;
        });
        return starsNew;
    }
    render(){
        return <div className='movie-item'>
            <img src={this.props.images.small}/>
            <p><span>名称:</span>{this.props.title}</p>
            <p><span>上映年份:</span>{this.props.year}</p>
            <p><span>电影类型:</span>{this.props.genres.join(",")}</p>
            <p>{this.starsRender().join("")}</p>
        </div>
    }
}