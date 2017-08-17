import React, {Component, PropTypes} from 'react';
import wrapper from '../wrapper'
import { is, fromJS } from 'immutable';
import ScrollView from 'baseComponent/scrollview'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import { Link } from 'react-router'
import 'Style/singerdetail.less'
import Loading from 'baseComponent/Loading/Loading'
import {createSong,createSinger} from 'common/js/song'
import SongList from 'baseComponent/songList'
import ReactDOM from 'react-dom';

const singerTitleH = 40;
const defaultSingerBg = require("../../images/default_album.jpg");

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


class SingerDetailTab extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentTab : '热门'
        }
        this.changeTab = this.changeTab.bind(this)
    }
    changeTab(name,id){
        this.setState({
            currentTab:name
        })

        this.props.fetchTab(id)
    }
    render(){
        let {scrollY} = this.props;
        return (
            <div className="singer_detail_tab flex" style={{transform:`translate3d(0px,${scrollY}px,0px)`}} ref="tab">
                {
                    this.props.tab.map((item,index)=>{
                        return (
                            <li 
                                key={index}  
                                className={`tab_item flex1 ${!!(this.state.currentTab == item.name) && 'active'}`} 
                                onClick={()=>{this.changeTab(item.name,item.id)}}
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
            id:'Hot'
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


class Main extends Component{
    constructor(props){
        super(props)
        this.state = {
            scrollY:''
        }
        this.fetchTab = this.fetchTab.bind(this)
    }
    componentWillUnmount() {
        let { deleStore } = this.props;
        deleStore('singerDetail')
    }
    
    _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
            let {musicData} = item
            if (musicData.songid && musicData.albummid) {
                ret.push(createSong(musicData))
            }
        })
        return ret
    }
    componentDidMount() {
        // this.refs.scrollview.onScroll((e)=>{
        //     let {x,y} = e;
        //     this.setState({
        //         scrollY:y
        //     })
        //     this.singer = {};
        // })
        // this.tabMaxTransalteY = ReactDOM.findDOMNode(this.refs.detail).clientHeight - singerTitleH;
        // this.tabClientH = ReactDOM.findDOMNode(this.refs.tab).clientHeight
        // this.singerSongH = ReactDOM.findDOMNode(this.refs.singerSong).clientHeight
    }
    fetchTab(tabId){
        // let { getSingerAlbum,getSingerMV } = this.props;
        // this.props[`getSinger${tabId}`](this.singer.id).then((res)=>{
        //     console.log(res)
        // })
    }
    render(){
        let {isFetching,list} = this.props.singerDetail;
        let songProps = {
            list: list && this._normalizeSongs(list),
            listStyle:'number',
        }
        let tabProps = {
            fetchTab:this.fetchTab,
            // scrollY : Math.max(this.state.scrollY,-this.tabMaxTransalteY)
        }

        this.singer = !!list && createSinger(this.props.singerDetail);
        return (
            <div className='singer_detail_container'>
                <SingerDetail {...this.singer} ref="detail"></SingerDetail>
                <SingerDetailTab {...tabProps} ref="tab"></SingerDetailTab>
                <div className="singer_music"  ref="singerSong">
                    {
                        (typeof isFetching != 'boolean' || isFetching) && <Loading />
                    }
                    <ScrollView className="singer_music_container" ref="scrollview" >
                        <div>
                            {
                                list && <SongList {...songProps}></SongList>
                            }
                        </div>
                    </ScrollView>
                </div>
            </div>
        )
    }
}


export default wrapper({
    id:'singerDetail',
    component:Main,
    method:'getSingerDetail',
    urlParams:{
        'singerId':''
    }
})