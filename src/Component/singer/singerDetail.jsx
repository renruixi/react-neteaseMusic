import React, {Component, PropTypes} from 'react';
import { is, fromJS } from 'immutable';
import ScrollView from 'baseComponent/scrollview'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import 'Style/singerdetail.less'
import Loading from 'baseComponent/Loading/Loading'
import {createSong,createSinger,createAlbum,createMV} from 'common/js/song'
import ReactDOM from 'react-dom';
import { getSingerSongs,getSingerAlbum,getSingerMV }  from 'api/api' 

import MvList from 'baseComponent/mvList'
import AlbumList from 'baseComponent/albumList'
import SongList from 'baseComponent/songList'

const singerTitleH = 40;
const defaultSingerBg = require("../../images/default_album.jpg");

import { connect } from 'react-redux'
import {  setSingerDetail,setSinger,clearSingerDetail } from 'Redux/Action'

class SingerDetail extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        let {avatar,name}  = this.props;
        let singerBgStyle = {
        }
        return (
            <div className='singer_detail'>
                <h1 className="singer_name">{name}</h1>
                <div className="singer_bg">
                    {
                        avatar ? <img src={avatar} style={singerBgStyle} /> : <img src={defaultSingerBg}/>
                    }
                </div>
            </div>
        )
    }
}

const SingerDetailTab = (()=>{
    class SingerDetailTab extends Component{
        constructor(props) {
            super(props);
            this.changeTab = this.changeTab.bind(this)
        }
        changeTab(id){
            let { setSingerDetail } = this.props;
            setSingerDetail({
                currentKey:id
            })
        }
        render(){
            let {currentKey} = this.props;
            return (
                <div className="singer_detail_tab flex" ref="tab">
                    {
                        this.props.tab.map((item,index)=>{
                            return (
                                <li 
                                    key={index}  
                                    className={`tab_item flex1 ${!!(currentKey == item.id) && 'active'}`} 
                                    onClick={()=>{this.changeTab(item.id)}}
                                >{item.name}</li>
                            )
                        })
                    }
                </div>
            )
        }    
    }
    SingerDetailTab.defaultProps = {
        tab:[
            {
                name:'热门',
                id:'Songs'
            },
            {
                name:'专辑',
                id:'Album'
            },
            {
                name:'MV',
                id:'MV'
            }
        ]
    }
    const mapStateToProps = (state) => {
        return {
            currentKey: state.singerDetail.currentKey
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            setSingerDetail:(data)=>{
                dispatch(setSingerDetail(data))
            }
        }
    }
    return connect(mapStateToProps,mapDispatchToProps)(SingerDetailTab)
})()

class Main extends Component{
    constructor(props){
        super(props)
        this.setCurrentScroll = this.setCurrentScroll.bind(this)
    }
    _normalizeResult(currentKey,data){
        return this[`_normalize${currentKey}`](data)
    }
    _normalizeAlbum(data){
        let res = {};
        let ret = []
        data.forEach((album)=>{
            ret.push(createAlbum({
                ...album
            }))
        })
        res.type = 'Album'
        res.ret = ret;
        return res;
    }
    _normalizeMV(data){
        let res = {};
        let ret = []
        data.forEach((mvdata) => {
            ret.push(createMV({
                mv_id:mvdata.id,
                vid:mvdata.vid,
                mvtitle:mvdata.title,
                picurl:mvdata.pic,
                listennum:mvdata.listenCount,
                publicTime:mvdata.date
            }))
        })
        res.type = 'MV'
        res.ret = ret;
        return res;
    }
    _normalizeSongs(data){
        let res = {};
        let ret = []
        data.forEach((item) => {
          let musicData = item.musicData
          if (musicData.songid) {
            ret.push(createSong(musicData))
          }
        })
        res.type = 'Songs'
        res.ret = ret;
        return res;
    }
    getSingerDetailList(currentKey){
        currentKey = currentKey || this.props.currentKey;
        let { setSingerDetail,singer,singerDetail } = this.props;
        if(singerDetail[currentKey]){
            return;
        }
        let { singerId } = this.props.params;
        switch(currentKey){
            case 'Album':
                getSingerAlbum(singerId).then((res)=>{
                    if(res.code == '0'){
                        this.setResult(res)
                    }
                });
                break;
            case 'MV':
                getSingerMV(singerId).then((res)=>{
                    if(res.code == '0'){
                        this.setResult(res)
                    }
                })
                break;
            case 'Songs':
                getSingerSongs(singerId).then((res)=>{
                    if(res.code == '0'){
                        this.setResult(res);
                    }
                })
                break;
        }
        
    }
    setResult( res ){
        let { setSingerDetail,singer,currentKey,setSinger } = this.props;
        let result = this._normalizeResult(currentKey,res.data.list);
        if(!singer.id){
            let newSinger = createSinger(res.data);
            setSinger(newSinger)
        }
        setSingerDetail({   //跳转后需要返回显示之前的数据  此数据需要存入store
            [currentKey]:{
                ...result
            }
        })
    }
    setCurrentScroll(e){
        let { setSingerDetail,singerDetail,currentKey} = this.props;
        let { x,y } = e;
        if(singerDetail[currentKey]){
            setSingerDetail({
                [currentKey]:Object.assign({},singerDetail[currentKey],{
                    scrollY:y
                })
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.currentKey !== nextProps.currentKey){
            let { currentKey } = nextProps
            this.getSingerDetailList(currentKey);
        }
    }
    componentWillMount() {
        this.getSingerDetailList();
    }
    componentDidMount() {
        // this.tabMaxTransalteY = ReactDOM.findDOMNode(this.refs.detail).clientHeight - singerTitleH;
        // this.tabClientH = ReactDOM.findDOMNode(this.refs.tab).clientHeight
        // this.singerSongH = ReactDOM.findDOMNode(this.refs.singerSong).clientHeight
    }
    render(){
        let {currentKey} = this.props.singerDetail;
        let currentList = this.props.singerDetail[currentKey]
        let scrollY = !!currentList && currentList.scrollY;
        let tabProps = {
            fetchTab:this.fetchTab,
            // scrollY : Math.max(this.state.scrollY,-this.tabMaxTransalteY)
        }
        let singer = this.props.singer;
        
        let scrollProps = {
            onScrollEnd:this.setCurrentScroll,
            scrollY:scrollY,
        }
        return (
            <div>
                <div className='singer_detail_container'>
                    <SingerDetail {...singer} ref="detail" test="1"></SingerDetail>
                    <SingerDetailTab {...tabProps} ref="tab"></SingerDetailTab>
                    <div className="singer_music"  ref="singerSong">
                        {
                            !(!!currentList) && <Loading />
                        }
                        <ScrollView className="singer_music_container" ref="scrollview" {...scrollProps}>
                            <div>
                                {
                                    (currentList && currentKey == 'Songs') && <SongList list={currentList.ret} listStyle="number"></SongList>
                                }
                                {
                                    (currentList && currentKey == 'Album') && <AlbumList list={currentList.ret}></AlbumList>
                                }
                                {
                                    (currentList && currentKey == 'MV') && <MvList list={currentList.ret}></MvList>
                                }
                            </div>
                        </ScrollView>
                    </div>
                </div>
                {this.props.children}
            </div>
        )
    }
}





const mapStateToProps = (state)=>{
    return {
        singerDetail:state.singerDetail,
        singer:state.singer,
        currentKey:state.singerDetail.currentKey
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        setSingerDetail:(data)=>{
            dispatch(setSingerDetail(data))
        },
        setSinger:(data)=>{
            dispatch(setSinger(data))
        },
        clearSingerDetail:()=>{
            dispatch(clearSingerDetail)
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)