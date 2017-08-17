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
import { browserHistory } from 'react-router';
import Singer from 'common/js/singer'

import SearchHot from './searchHot'
import SearchResult from './searchResult'
import SearchTab from './searchTab'
import SearchBox from 'baseComponent/searchBox'


class Main extends Component{
    constructor(props) {
        super(props);

        this._getSearch = this._getSearch.bind(this)
        this.changeTab = this.changeTab.bind(this);
        this.searchPageShow = this.searchPageShow.bind(this)
        this.searchPageHide = this.searchPageHide.bind(this)
        this.onInput = this.onInput.bind(this);
        this.onFocus = this.onFocus.bind(this)
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
    changeTab(t){
        let { setSearchState,searchDetail } = this.props;
        let { query } = searchDetail;
        if(searchDetail[t]){    //如果当前tab下已经有搜索数据
            setSearchState({   //修改搜索当前tab状态 触发tab对应的搜索结果渲染
                currentKey:t,
            })
            return false;
        }
        this._getSearch(query,t)
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
    componentWillUnmount() {
        let { clearSearchState }   = this.props;
        clearSearchState();
    }
    
    componentWillReceiveProps(nextProps){
        // let { query } = nextProps.searchDetail;
        // let { setSearchResult,searchDetail } = this.props;
        // let { currentKey } = searchDetail
        // if(query == this.props.searchDetail.query){
        //     return false;
        // }   
        // !!query && this._getSearch(query,currentKey)
    }
    onInput(e){
        let { currentKey } = this.props.searchDetail;
        let query = e.target.value;
        this._getSearch(query,currentKey)
    }
    onFocus(){
        this.searchPageShow()
    }
    searchPageShow(){
        let { setSearchState } = this.props;
        setSearchState({
            searchShow:true
        })
    }
    searchPageHide(){
        let { clearSearchState }   = this.props;
        clearSearchState();
    }
    render(){
        let { currentKey,searchShow,query } = this.props.searchDetail;
      
        let result = this.props.searchDetail[currentKey];  //渲染当前tab的搜索结果
        let tabProps = {
            changeTab:this.changeTab
        }
        let searchBoxProps = {
            onFocus:this.onFocus,
            onInput:this.onInput,
            query:query
        }
        return (
            <div className="search_container" ref="search_container">
                <div className="searchbox_wrapper flex  vertical-middle">
                    <SearchBox refs="searchBox" {...searchBoxProps}/>
                    <div className="search_cancle" onClick={this.searchPageHide}>{searchShow && '取消'}</div>
                </div>
                {
                    searchShow && (
                        <div className="search_result_container">
                        {
                            result  &&  (
                                <div>
                                    <SearchTab {...tabProps} defaultTab={currentKey}/>
                                    <SearchResult result={result}/>
                                </div>
                            )
                        }
                        {
                            !result && <SearchHot /> 
                        }
                        </div>
                    )
                }
            </div>
        )
    }    
}

import { connect } from 'react-redux'

import { setSearchState,clearSearchState} from 'Redux/Action'

const mapStateToProps = (state)=>{
    return {
        searchDetail: state.searchDetail,
    }
}

const  mapDispatchToProps = (dispatch)=>{
    return {
        setSearchState: (data) => {
            dispatch(setSearchState(data))
        },
        clearSearchState:()=>{
            dispatch(clearSearchState())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main)


