import React, {Component, PropTypes} from 'react';
import ScrollView from 'baseComponent/scrollview'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import wrapper from './wrapper'
import Loading from 'baseComponent/Loading/Loading'
import IndexWrapper from 'Component/index'
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
    onScroll(){
        forceCheck()
    }
    render(){
        let {isFetching,topList,scrollX,scrollY} = this.props.rankList;
        let scrollProps = {
            onScroll:this.onScroll.bind(this),
            onScrollEnd:this.props._setScrollPos.bind(this),
            scrollToCallback:forceCheck,
            scrollX:scrollX,
            scrollY:scrollY
        }
        return (
            <IndexWrapper>
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
            </IndexWrapper>
        )
    }    
}

export default wrapper({id: 'rankList', component: Main, method: 'getRank'})