import React, {Component, PropTypes} from 'react';
import IndexWrapper from 'Component/index'
import {createSinger} from 'common/js/song'
import wrapper from '../wrapper'
import ScrollView from 'baseComponent/scrollview'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import { Link } from 'react-router'
import 'Style/singerview.less'
import Loading from 'baseComponent/Loading/Loading'
import { browserHistory } from 'react-router';
const ANCHOR_HEIGHT = 18;

class SingerList extends Component{
    constructor(props,context) {
        super(props,context);
        this.state = {
            currentIndex:0,
        }
        this.listHeight;
    }
    componentDidMount() {
        this._calcHeight();
    }
    componentDidUpdate(prevProps, prevState) {
        this._calcHeight();
    }
    _calcHeight(){
        if(!this.hasCaclHeight){
            this.hasCaclHeight = true;
            this.listHeight = [];
            const list = this.refs.singer_list.children;
            let height = 0;
            this.listHeight.push(height);
            for(let i=0;i<list.length;i++){
                height += list[i].clientHeight;
                this.listHeight.push(height)
            }
        }
    }
    _listenScroll(e){
        this.scrollY = e.y;
        const listHeight = this.listHeight;
        if(this.scrollY >= 0){ //滚动到顶部时
            this.setState(Object.assign({},{
                currentIndex:0,
            }))
            return;
        }

        for(let i=0;i<listHeight.length;i++){  //中间滚动
            let heightLow = listHeight[i];
            let heightHigh = listHeight[i+1];
            if (-this.scrollY >= heightLow && -this.scrollY < heightHigh) {
                this.setState(Object.assign({},{
                    currentIndex:i,
                }))
                return;
            }
        }

        //滚动到底部
        this.setState(Object.assign({},{
            currentIndex:listHeight.length-2,
        }))
    }
    onLetterSortTouchStart(e){
        let anchorIndex = getData(e.target,'index');
        let startPos = e.touches[0];
        this.touches.startPos = startPos.pageY;
        this.touches.anchorIndex = anchorIndex;
        this._scrollToPos(anchorIndex)
    }
    onLetterSortTouchMove(e){
        e.preventDefault();
        e.stopPropagation();

        let movePos =  e.touches[0]
        this.touches.movePos = movePos.pageY;
        
        let delta = Math.floor((this.touches.movePos  - this.touches.startPos) / 18)
        if(delta <= 0){
            delta = 0;
        }else if(delta >= this.refs.singer_list.children.length){
            delta = this.refs.singer_list.children.length-1;
        }
        
        let anchorIndex = parseInt(this.touches.anchorIndex) + delta;
        this._scrollToPos(anchorIndex)
    }
    _scrollToPos(index){
        if(index <= 0){  //滑动时字母分类不要超过上下限
            index = 0;
        }else if(index >= this.refs.singer_list.children.length){
            index = this.refs.singer_list.children.length-1;
        }
        this.refs.scrollview.scrollToElement(this.refs.singer_list.children[index],0)
        this.setState(Object.assign({},{
            currentIndex:index
        }))
        forceCheck()
    }
    _letterSortActive(index){
        let active = this.state.currentIndex == index ? 'current' : '';
        return active + ' letter_sort_item'
    }
    _letterSortList(list){
        return (
            <div className='letter_sort'>
                <ul>
                    {
                        list.map((item,index)=>{
                            return (
                                <li 
                                className={this._letterSortActive(index)}
                                onTouchStart={this.onLetterSortTouchStart.bind(this)} 
                                data-index={index} 
                                key={index}
                                onTouchMove={this.onLetterSortTouchMove.bind(this)}
                                >{item.title.substr(0,1)}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    showSinger(singer){
        let { setSinger } = this.props;
        setSinger(singer)
        let path = `/singerdetail/${singer.id}`;
        browserHistory.push(path)
    }
    _singerGroup(data){
        return (
            <ul>
                {
                    data && data.map((item,index)=>{
                        return (
                            <LazyLoad height={70} throttle={100} once={true} key={index} > 
                                <li className='singer_list_item flex vertical-middle' key={index} onClick={()=>this.showSinger(item)}>
                                    <img className='avatar' src={item.avatar} />
                                    <span className="name">{item.name}</span>
                                </li>
                            </LazyLoad>
                        )
                    })
                }
            </ul>
        )
    }
    _normalizeData(list){
        if(!list){
            return
        }
        let map = {
            hot:{
                title:'热门',
                items:[]
            }
        }
        list.forEach((item,index)=>{
            if(index < 10){
                map.hot.items.push(createSinger({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid
                }))
            }
            const key = item.Findex;
            if(!map[key]){
                map[key] = {
                    title:key,
                    items:[]
                }
            }
            map[key].items.push(createSinger({
                name: item.Fsinger_name,
                id: item.Fsinger_mid
            }))
        })
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === '热门') {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
    }
    render(){
        let { list } = this.props;
        list = this._normalizeData(list)
        let letterSortList = this._letterSortList(list);
        //{letterSortList}
        return (
            <ul ref='singer_list'>
            {
                list.map((item,index)=>{
                    return (
                        <li className='singer_list_group'  key={index}>
                            <h2 className='singer_list_title'>{item.title}</h2>
                            {
                                this._singerGroup(item.items)
                            }
                        </li>
                    )
                })
            }
            </ul>
        )
    }    
}

class Main extends Component{
    constructor(props,context) {
        super(props,context);
    }
    componentDidMount(){
        // this.refs.scrollview.onScroll((e)=>{  //在iscroll或者better-scroll中 lazyload监听不到原始的scroll事件  只能通过监听 上层scroll-view的scroll事件去触发回调  触发lazyLoad的forceCheck()
        //     this.refs.singerList && this.refs.singerList._listenScroll(e)
        //     forceCheck()
        // })
        // this.refs.scrollview.onScrollEnd((e)=>{
        //     this.props._setScrollPos({
        //         x:e.x,
        //         y:e.y
        //     })
        // })
    }
    onScroll(e){
        //this.refs.singerList && this.refs.singerList._listenScroll(e)
        forceCheck()
    }
    render(){
        let {isFetching,list,scrollX,scrollY} = this.props.singerList;
        
        let scrollProps = {
            onScrollEnd:this.props._setScrollPos.bind(this),
            onScroll:this.onScroll.bind(this),
            scrollToCallback:forceCheck,
            scrollX,
            scrollY
        }
        let singerListProps = {
            setSinger:this.props.setSinger,
            list:list
        }
        return (
            <IndexWrapper>
                <div className='singer'>
                    {
                        (typeof isFetching != 'boolean' || isFetching) && <Loading />
                    }
                    <ScrollView className="singer_list" ref='scrollview' {...scrollProps}>
                        <div>
                            {
                                list && <SingerList {...singerListProps} ref="singerList"/>
                            }
                        </div>
                    </ScrollView>
                </div>
            </IndexWrapper>
        )
    }    
}


export default wrapper({
    id:'singerList',
    component:Main,
    method:'getSingerList'
})



