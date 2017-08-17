import React, {Component, PropTypes} from 'react';
import {getRank} from '../api/api'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import { findIndex } from 'common/js/util'
import '../Style/songList.less'


class SongList extends Component{
    constructor(props) {
        super(props);
    }
    playSong(song,index){
        let {list,playSong} = this.props;
        playSong(song,index,list)
    }
    render(){
        let { list,listStyle} = this.props;
        return (
            <ul className="song_list_container">
                {
                    list.map((item,index)=>{
                        return (
                            <li className={`song_item flex vertical-middle ${listStyle}`} key={index} onClick={()=>{this.playSong(item,index)}}>
                                {
                                  listStyle && <div className="song_listStyle">{listStyle == 'number'&& (index+1)}</div>
                                }
                                <div className="song_item_info flex1">
                                    <div className="song_title">{item.title}</div>
                                    <div className="song_subtitle">{item.singer}&nbsp;-&nbsp;{item.subtitle || item.album.name}</div>
                                </div>
                                <div className="song_play_icon"></div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }    
}




import { setPlayingState,setCurrentSong,setPlayList,setPlayerMode } from 'Redux/Action'
import { connect }  from 'react-redux'



function mapStateToProps(state){
    return {}
}
function mapDispatchToProps(dispatch){
    return{
        playSong:(song, index, list)=>{
            dispatch(setPlayingState({
                playing: true
            }))
            dispatch(setPlayerMode({
                playerMode: 'fullscreen'
            }))
            dispatch(setCurrentSong({
                currentSong: song,
                currentIndex: index
            }))
            dispatch(setPlayList(list))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SongList);