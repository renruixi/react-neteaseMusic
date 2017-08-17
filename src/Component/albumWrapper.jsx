import React, {Component, PropTypes} from 'react';
import wrapper from 'Component/wrapper'
import ScrollView from 'baseComponent/scrollview'
import { Link } from 'react-router'
import Loading from 'baseComponent/Loading/Loading'
import SongList from 'baseComponent/songList'
import ReactDOM from 'react-dom';
import 'Style/albumWrapper.less'


const defaultAlbumBg = require('../images/default_album.jpg')

class AlbumDetail extends Component{
    constructor (props) {
        super(props)
    }
    render(){
        let {title,image,singer,publicTime,color}  = this.props;
        return (
            <div className='album_wrapper_detail flex'>
                <div className="album_cover_bg" style={{backgroundImage:`url(${image ? image : defaultAlbumBg})`,backgroundColor:`#${color}`}}></div>
                <div className="album_pic">
                    {
                        image && <img src={image} />
                    }
                </div>
                <div className="album_info flex1">
                    <h1 className="album_name">{title}</h1>
                    <p className="album_singer">歌手：{singer}</p>
                    {
                        publicTime && <p className="album_publicTime">发行时间：{publicTime}</p>
                    }
                </div>
            </div>
        )
    }    
}


class AlbumTab extends Component{
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return (
            <div className="album_detail_tab">
            </div>
        )
    }
}




class Main extends Component{
    constructor (props) {
        super(props);
    }
    componentWillUnmount() {
        let { deleStore }  = this.props;
        deleStore('albumDetail');
    }
    componentDidMount() {
        this.refs.scrollview.onScroll((e)=>{
            let {x,y} = e;
        })
    }
    render(){
        let { isFetching,list,album} = this.props;
        let songListProps = {
            list: list,
            listStyle:'number',
        }
        
        return (
            <div className="album_wrapper_container">
                <AlbumDetail {...album} ref="detail" />
                <AlbumTab></AlbumTab>
                <div className='album_wrapper_song'>
                    {
                        (typeof isFetching != 'boolean' || isFetching) && <Loading />
                    }
                    <ScrollView className="album_song_container" ref="scrollview" >
                        <div>
                            {
                                list && <SongList {...songListProps}></SongList>
                            }
                        </div>
                    </ScrollView>
                </div>
            </div>
        )
    }    
}


export default Main
