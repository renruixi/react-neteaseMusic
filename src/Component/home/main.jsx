import React, {Component, PropTypes} from 'react'
import ScrollView from 'baseComponent/scrollview'
import wrapper from 'Component/wrapper'
import Header from 'baseComponent/header'
import Tab from 'baseComponent/tab'
import Loading from 'baseComponent/Loading/Loading'
import {createAlbumDetail} from 'common/js/song'
import { getRecommend } from 'Redux/Action'
import { connect } from 'react-redux'
import 'Style/recommend.less'

import HomeSldier from './homeSlider'
import HomeTab from './homeTab'
import HomeRecomList from './homeRecomList'

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
  componentDidMount(){
    this.refs.scrollview && this.refs.scrollview.onScrollEnd((e)=>{
      this.props._setScrollPos(e)
    })
  }
  render() {
    let {isFetching,slider,radioList,songList,scrollX,scrollY} = this.props.recommend;
    let recommmendList = !!songList && this._normalizeAlbum(songList);

    let scrollProps= {
      scrollX,scrollY
    }
    return (
      <div>
        <Header></Header>
        <Tab></Tab>
        <div className="recommend">
          {
            (typeof isFetching != 'boolean' || isFetching) && <Loading /> 
          }
          {
            slider && (
              <ScrollView className='recommend_content' ref='scrollview' {...scrollProps}>
                <div>
                    <HomeSldier list={slider} />
                    <HomeTab />
                    <HomeRecomList list={recommmendList}  title='推荐歌单' />
                </div>
              </ScrollView>
            )
          }
        </div>
      </div>
    )
  }
}

export default wrapper({
  id:'recommend',
  component:Main,
  method:'getRecommend'
})



