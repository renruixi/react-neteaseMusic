import React, {Component, PropTypes} from 'react'
import ScrollView from 'baseComponent/scrollview'
import wrapper from 'Component/wrapper'
import IndexWrapper from 'Component/index'
import Loading from 'baseComponent/Loading/Loading'
import {createAlbumDetail} from 'common/js/song'
import Slider from 'baseComponent/slider'
import { browserHistory,Link } from 'react-router';
import 'Style/recommend.less'

/*
    首页轮播图
*/
class HomeSlider extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    let {list} = this.props;
    return (
      <div className='slider_wrapper'>
        <div className="slider-content">
          <Slider ref='sliderView' snap={true}>
            {
              list && list.map((item, index) => {
                return (
                  <div key={index} className='slider-item'>
                    <Link to={item.linkUrl}>
                      <img src={item.picUrl}/>
                    </Link>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    )
  }
}

/* 
    首页tab
 */
const radioIcon = require("../images/radio.png")
const mvIcon = require("../images/mv.png")

class HomeTab extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="recommend_tab flex veritcal-middle horizonal-middle">
          <Link to="/radio" className="recommend_tab_items flex1">
            <img src={radioIcon} alt=""/>
            <p>私人FM</p>
          </Link>
          <Link to="/hotMV" className="recommend_tab_items flex1">
            <img src={mvIcon} alt=""/>
            <p>热门MV</p>
          </Link>
      </div>
    )
  }
}

/* 
    首页推荐歌单列表
 */
class HomeRecomList extends Component {
  constructor(props, context) {
    super(props, context);
    this.play = this.play.bind(this);
  }
  play(item,index){
    let path = `/home/songsheet/${item.id}`;
    browserHistory.push(path)
  }
  render() {
    let {title, list} = this.props;
    return (
      <div className='recommend_list'>
        <h2 className='list_title'>{title}</h2>
        <ul className='list_container'>
          {
            list && list.map((item, index) => {
              return (
                <li key={index} onClick={()=>this.play(item,index)}>
                    <div className='list_media'>
                      <img src={item.image}/>
                      <span className='icon_play'></span>
                    </div>
                    <div className='list_info'>
                      <h3 className='list_tit'>{item.desc}</h3>
                    </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}



class Main extends Component {
  constructor(props) {
    super(props)
  }
  _normalizeAlbum(list){
    let ret = [];
    list.forEach((item,index)=>{
      ret.push(createAlbumDetail({
        id:item.radioid || item.id,
        image:item.picUrl,
        singername:item.songListAuthor,
        desc:item.Ftitle || item.songListDesc
      })) 
    });
    return ret;
  }
  render() {
    let {isFetching,slider,radioList,songList,scrollX,scrollY} = this.props.recommend;
    let recommmendList = !!songList && this._normalizeAlbum(songList);

    let scrollProps= {
      onScrollEnd:this.props._setScrollPos,
      scrollX,
      scrollY
    }
    return (
      <IndexWrapper>
        <div className="recommend">
          {
            (typeof isFetching != 'boolean' || isFetching) && <Loading /> 
          }
          {
            slider && (
              <ScrollView className='recommend_content' ref='scrollview' {...scrollProps}>
                <div>
                    <HomeSlider list={slider} />
                    <HomeTab />
                    <HomeRecomList list={recommmendList}  title='推荐歌单' />
                </div>
              </ScrollView>
            )
          }
        </div>
        {this.props.children}
      </IndexWrapper>
    )
  }
}

export default wrapper({
  id:'recommend',
  component:Main,
  method:'getRecommend'
})



