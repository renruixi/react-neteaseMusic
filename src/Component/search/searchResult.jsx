import React, {Component, PropTypes} from 'react';
import { is, fromJS } from 'immutable';
import ScrollView from 'baseComponent/scrollview'
import 'Style/search.less'
import {createSong,createAlbum,createMV} from 'common/js/song'
import Loading from 'baseComponent/Loading/Loading'


import MvList from 'baseComponent/mvList'
import AlbumList from 'baseComponent/albumList'
import SongList from 'baseComponent/songList'


class SearchResult extends Component{
    constructor(props, context) {
        super(props, context);
        this.setCurrentScroll = this.setCurrentScroll.bind(this)
    }
    _normalizeResult(data){
        if(data.album){
            return this._normalizeAlbum(data.album)
        }
        if (data.song) {
            return this._normalizeSongs(data.song.list)
        }
        if(data.mv){
            return this._normalizeMV(data.mv.list)
        }
    }
    _normalizeAlbum(data){
        let res = {};
        let ret = []
        data.list.forEach((album)=>{
            ret.push(createAlbum({
                ...album
            }))
        })
        res.type = 'album'
        res.ret = ret;
        return res;
    }
    _normalizeMV(data){
        let res = {};
        let ret = []
        data.forEach((mvdata) => {
          if (mvdata.mv_id && mvdata.docid) {
            ret.push(createMV(mvdata))
          }
        })
        res.type = 'mv'
        res.ret = ret;
        return res;
    }
    _normalizeSongs(list){
        let res = {};
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id && musicData.album.mid) {
            ret.push(createSong(musicData))
          }
        })
        res.type = 'songs'
        res.ret = ret;
        return res;
    }
    componentWillReceiveProps(nextProps){
        if(this.props.currentKey != nextProps.currentKey){
            this.changeTab(nextProps.currentKey);
        }
        if(this.props.query != nextProps.query){
            this.changeQuery(nextProps.searchDetail.query)
        }
    }
    componentWillMount() {
        let { query} = this.props;
        this.changeQuery(query)
    }
    _getSearch(query,t){
        let { setSearchState } = this.props;
        getSearch({query,t}).then((res)=>{
            if(res.code == "0"){
                let result = this._normalizeResult(res.data)
                setSearchState({   //跳转后需要返回显示之前的数据  此数据需要存入store
                    [t]:{
                        ...result
                    },
                    currentKey:t,
                    query:query
                })
            }
        })
    }
    changeTab(currentKey){
        let { searchDetail } = this.props;
        if(searchDetail[currentKey]){    //如果当前tab下已经有搜索数据 不再请求
            return false;
        }
        let { query } = this.props
        this._getSearch(query,currentKey)
    }
    changeQuery(query){
        let { currentKey } = this.props
        this._getSearch(query,currentKey)
    }
    setCurrentScroll(e){
        let { setSearchState,searchDetail,currentKey} = this.props;
        let { x,y } = e;
        if(searchDetail[currentKey]){
            setSearchState({
                [currentKey]:Object.assign({},searchDetail[currentKey],{
                    scrollY:y
                })
            })
        }
    }
    render(){
        let { currentKey,searchDetail } = this.props;
        let currentResult = searchDetail[currentKey]
        let {type,ret,scrollY} = !!currentResult &&  currentResult;

        let scrollProps = {
            onScrollEnd:this.setCurrentScroll,
            scrollY:scrollY,
        }
        return (
            <ScrollView className="search_result_list_container" ref="scrollview" {...scrollProps}>
                <div className='search_result_list'>
                    {
                        !currentResult && <Loading />
                    }
                    {
                        currentResult && (
                            <div>
                                {
                                    ret.length == 0 && (
                                        <div className="search_noresult">
                                            搜索无结果
                                        </div>
                                    )
                                }
                                {
                                    type == 'songs' && <SongList list={ret} listStyle="icon"></SongList>
                                }
                                {
                                    type == 'album' && <AlbumList list={ret}></AlbumList>
                                }
                                {
                                    type == 'mv' && <MvList list={ret}></MvList>
                                }
                            </div>
                        )
                    }
                </div>
            </ScrollView>
        )
    }    
}


import { connect } from 'react-redux'

import { getSearch } from 'api/api'

import { setSearchState } from 'Redux/Action'


const mapStateToProps = (state)=>{
    return {
        searchDetail:state.searchDetail,
        currentKey:state.searchDetail.currentKey,
        query:state.searchDetail.query,
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setSearchState:(data)=>{
            dispatch(setSearchState(data))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchResult)


