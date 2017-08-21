import React, {Component, PropTypes} from 'react'
import wrapper from 'Component/wrapper'
import { createSong,createAlbumDetail} from 'common/js/song'
import AlbumWrapper from './albumWrapper'
import 'Style/songSheet.less'

class Main extends Component{
  constructor (props) {
    super(props)
  }
  _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
          if (item.songid && item.albummid) {
              ret.push(createSong(item))
          }
      })
      return ret
  }
  render(){
    let { cdlist,isFetching} = this.props.albumDetail;
    let AlbumProps = {
        list:cdlist && this._normalizeSongs(cdlist[0].songlist),
        isFetching:isFetching,
        album:cdlist && createAlbumDetail(cdlist[0]),
    }
    return (
      <AlbumWrapper {...AlbumProps} {...this.props}></AlbumWrapper>
    )
  }  
}


export default wrapper({
  id:'albumDetail',
  method:'getSongSheet',
  component:Main,
  urlParams:{
    disstid:''
  }
})
