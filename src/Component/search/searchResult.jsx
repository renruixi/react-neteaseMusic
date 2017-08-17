import React, {Component, PropTypes} from 'react';
import wrapper from 'Component/wrapper'
import { is, fromJS } from 'immutable';
import ScrollView from 'baseComponent/scrollview'
import Header from 'baseComponent/header'
import { Link } from 'react-router'
import {getSearch} from 'api/api'
import 'Style/search.less'
import Loading from 'baseComponent/Loading/Loading'
import {createSong,createAlbum,createMV} from 'common/js/song'
import { browserHistory } from 'react'

import MvList from 'baseComponent/mvList'
import AlbumList from 'baseComponent/albumList'
import SongList from 'baseComponent/songList'


class SearchResult extends Component{
    constructor(props, context) {
        super(props, context);
    }
    formatDuration(time){
        let originMin = Math.floor(time / 60)
        let min = originMin < 10 ? '0'+originMin : originMin;
        let sec = parseInt(time % 60 < 10 ? '0'+time % 60 : time % 60);
        return min+':'+sec
    }
    componentDidMount() {
        this.refs.scrollview.refresh()
    }
    playSong(song,index){
        let {setPlayingState,setCurrentSong,setPlayList,list} = this.props;
        setPlayingState({
            playing:true
        });
        setCurrentSong({
            currentSong:song,
            currentIndex:index
        })
        setPlayList(list)
    }
    render(){
        let {type,ret} = this.props.result;
        return (
            <ScrollView className="search_result_list_container" ref="scrollview">
                <div>
                    {
                        ret.length == 0 && (
                            <div className="search_noresult">
                                搜索无结果
                            </div>
                        )   
                    }
                    {
                        ret.length > 0 && (
                            <ul className="search_result_list clearfix">
                                {
                                    type == 'songs' && <SongList list={ret} listStyle="icon"></SongList>
                                }
                                {
                                    type == 'album' && <AlbumList list={ret}></AlbumList>
                                }
                                {
                                    type == 'mv' && <MvList list={ret}></MvList>
                                }
                            </ul>
                        )
                    }
                </div>
            </ScrollView>
        )
    }    
}

export default SearchResult

