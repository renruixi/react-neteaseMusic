import React, {Component, PropTypes} from 'react';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import { findIndex } from 'common/js/util'
import { connect }  from 'react-redux'
import '../Style/albumList.less'
import { browserHistory } from 'react-router'
import * as router from 'react-router'

import { setSinger } from 'Redux/Action'

class AlbumList extends Component{
    constructor(props) {
        super(props);
    }
    showAlbum(album){
        let { setAlbum } = this.props;
        setAlbum({
            avatar:album.image,
            name:album.title
        })
        let path = `${location.pathname}/albumdetail/${album.mid}`;
        browserHistory.push(path)
    }
    render(){
        let { list } = this.props;
        return (
            <ul className="album_list clearfix">
                {
                    list.map((item,index)=>{
                        return (
                            <li className="flex vertical-middle album_item" key={index} onClick={()=>this.showAlbum(item)}>
                                <img className="album_item_pic" src={item.image}></img>
                                <div className="album_info flex1">
                                    <div className="album_title">{item.title}</div>
                                    <div className="album_subtitle">{item.singer}&nbsp;&nbsp;&nbsp;{item.publicTime}</div>
                                </div>
                                <div className="album_play_icon"></div>
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
        setAlbum:()=>dispatch(setSinger)
    }
}   

export default connect((state)=>state,mapDispatchToProps)(AlbumList);