import React, {Component, PropTypes} from 'react';
import wrapper from './wrapper'
import { is, fromJS } from 'immutable';
import ScrollView from 'baseComponent/scrollview'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import { Link } from 'react-router'
import Loading from 'baseComponent/Loading/Loading'
import {createAlbumDetail,createSong} from 'common/js/song'
import ReactDOM from 'react-dom';
import AlbumWrapper from './albumWrapper'


class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            scrollY:''
        }
    }
    _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
            if (item.songid && item.albummid) {
                ret.push(createSong(item))
            }
        })
        return ret
    }
    render(){
        let { list,isFetching,id,mid,name} = this.props.albumDetail;
        let AlbumProps = {
            list:list && this._normalizeSongs(list),
            isFetching:isFetching,
            album:id && createAlbumDetail(this.props.albumDetail),
            ...this.props,
        }
        return (
            <AlbumWrapper {...AlbumProps}></AlbumWrapper>
        )
    }
}



export default wrapper({
    id:'albumDetail',
    component:Main,
    method:'getAlbumDetail',
    urlParams:{
        'albumId':''
    }
})