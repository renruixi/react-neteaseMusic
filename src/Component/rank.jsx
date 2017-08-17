import React, {Component, PropTypes} from 'react';
import ScrollView from 'baseComponent/scrollview'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import Header from 'baseComponent/header'
import Tab from 'baseComponent/tab'
import wrapper from './wrapper'
import Loading from 'baseComponent/Loading/Loading'
import 'Style/rank.less'


class RankList extends Component{
    constructor(props) {
        super(props);
    }
    _normalizeListenCount(count){
        return  parseFloat(count/10000).toFixed(1) +'万'
    }
    _rankSongList(data){
        return data.map((item,index)=>{
            return (
                <p key={index}>
                    {index + 1}&nbsp;
                    <span className="text_name">{item.songname}</span>
                    -&nbsp;
                    {item.singername}
                </p>
            )
        })
    }
    render(){
        let {topList} = this.props;
        return (
            <ul>
                {
                    topList.map((item,index)=>{
                        return (
                            <LazyLoad height={110} throttle={100} once={true} key={index} > 
                                <li className='rank_item flex vertical-middle' >
                                    <div className='rank_media'>
                                        <img src={item.picUrl} alt="" />
                                        <span className='listen_count'>{this._normalizeListenCount(item.listenCount)}</span>
                                    </div>
                                    <div className='rank_info flex1'>
                                        <h3 className='rank_title'>{item.topTitle}</h3>
                                        {this._rankSongList(item.songList)}
                                        <i className='rank_arrow'></i>
                                    </div>
                                </li>
                            </LazyLoad>
                        )
                    })
                }
            </ul>
        )
    }    
}


class Main extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.refs.scrollview.onScroll((e)=>{  //在iscroll或者better-scroll中 lazyload监听不到原始的scroll事件  只能通过监听 上层scroll-view的scroll事件去触发回调  触发lazyLoad的forceCheck()
            forceCheck()
        })
        this.refs.scrollview.onScrollEnd((e)=>{
            this.props._setScrollPos(e)
        })
    }
    render(){
        let {isFetching,topList,scrollX,scrollY} = this.props.rankList;
        let scrollProps = {
            scrollX:scrollX,
            scrollY:scrollY
        }
        return (
            <div>
                <Header></Header>
                <Tab></Tab>
                <div className='rank' ref='rank'>
                    {
                        (typeof isFetching != 'boolean' || isFetching) && <Loading />
                    }
                    <ScrollView className='rank_list' ref='scrollview' {...scrollProps}>
                        <div>
                        {
                            topList && <RankList topList={topList} />
                        }
                        </div>
                    </ScrollView>
                </div>
            </div>
        )
    }    
}

export default wrapper({id: 'rankList', component: Main, method: 'getRank'})