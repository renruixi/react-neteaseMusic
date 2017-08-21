import React, {Component, PropTypes} from 'react';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import { findIndex } from 'common/js/util'
import { connect }  from 'react-redux'
import '../Style/mvList.less'
import { browserHistory } from 'react-router'

import { setSinger } from 'Redux/Action'

class MvList extends Component{
    constructor(props) {
        super(props);
    }
    playMV(){

    }
    formatDuration(time){
        let originMin = Math.floor(time / 60)
        let min = originMin < 10 ? '0'+originMin : originMin;
        let sec = parseInt(time % 60 < 10 ? '0'+time % 60 : time % 60);
        return min+':'+sec
    }
    render(){
        let { list,style } = this.props;
        return (
            <ul className="mv_list clearfix">
                {
                    list.map((item,index)=>{
                        return (
                            <li className="mv_item" key={index} onClick={()=>this.playMV(item,index)}>
                                <div className="mv_item_container">
                                    <img className="mv_pic" src={item.image}></img>
                                    <p className="mv_play_count">{item.playCount}</p>
                                    {
                                        item.duration && <p className="mv_duration">{this.formatDuration(item.duration)}</p>
                                    }
                                </div>
                                <div className="mv_info">
                                    <div className="mv_title">{item.title}</div>
                                    <div className="mv_subtitle">{item.publicTime}&nbsp;&nbsp;&nbsp;{item.singer}</div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }    
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}   

export default connect((state)=>state,mapDispatchToProps)(MvList);