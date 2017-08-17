import React, {Component, PropTypes} from 'react';
import wrapper from 'Component/wrapper'
import { is, fromJS } from 'immutable';
import ScrollView from 'baseComponent/scrollview'
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';
import { Link } from 'react-router'
import 'Style/player.less'
import Loading from 'baseComponent/Loading/Loading'
import ReactDOM from 'react-dom';
import Progress from 'baseComponent/progressBar'
import { playerConfig } from 'Config/Config'



import MiniPlayer from './miniPlayer'

import FullScreenPlayer from './fullScreenPlayer'

class Main extends Component{
  constructor (props) {
    super(props)
    this.state = {
      currentTime:0
    }
    this.songStarted = false;
    this.songEnded = false;

    this.songPlay= this.songPlay.bind(this)
    this.songError = this.songError.bind(this)
    this.songTimeUpdate = this.songTimeUpdate.bind(this)
    this.songEnd = this.songEnd.bind(this)
    this.setAudioCurrentTime = this.setAudioCurrentTime.bind(this)
  }
  songPlay(){
    this.songStarted = true;
    if(this.refs.audio.paused){
      this.refs.audio.play();
    }
  }
  songError(){
    //
  }
  songTimeUpdate(e){
    this.setState({
      currentTime:e.target.currentTime
    })
  }
  songEnd(e){
    this.next();
  }
  componentDidUpdate(prevProps){
    let {playerMode,playing,currentSong} = this.props.player;
    if(prevProps.player.playing !== this.props.player.playing){
      playing ? (this.refs.audio.paused && this.refs.audio.play()) : this.refs.audio.pause()
    }
  }
  componentDidMount() {
    window.onpopstate = ()=>{
      let {setPlayerMode} = this.props;
      setPlayerMode({
        playerMode:'mini'
      })
    }  
  }
  setAudioCurrentTime(currentTime){
    let { setPlayingState } = this.props;
    let { playing } = this.props.player
    this.refs.audio.currentTime = currentTime;
    if(!playing){
      setPlayingState({
        playing:!playing
      })
    }
  }
  switchCurrentIndex(mode,dir,rangeMax){
    let {currentIndex} = this.props.player;
    let index = 0;
    switch(mode){
      case 'order':
        if(dir == 'prev'){
          index  = currentIndex - 1;
          if(index <= -1){
            index = rangeMax-1;
          }
        }else if(dir == 'next'){
          index = currentIndex + 1;
          if(index >= rangeMax.length){
            index = 0;
          }
        }
        return index;      
      case 'single':
        return currentIndex;
      case 'random':
        index = Math.floor(Math.random()*rangeMax)
        return index;
      default:
        return currentIndex;
    }
  }
  next(){
    let { currentIndex, playMode} = this.props.player;
    let { playList,playSong } = this.props;

    let index = this.switchCurrentIndex(playMode,'next',playList.length);

    playSong(playList[index],index)
  }
  render(){
    let {playerMode,playing,currentSong,playMode} = this.props.player;
    let { searchShow } = this.props;
    let playProps = {
      setAudioCurrentTime:this.setAudioCurrentTime,
      currentSong:currentSong,
      currentTime:this.state.currentTime,
      playing:playing
    }
    return (
      <div className="player_container">
        {
          !!(currentSong && playerMode == 'fullscreen') &&  <FullScreenPlayer {...playProps} currentTime={this.state.currentTime} ref="fullPlayer"/>
        }
        {
          !!(currentSong && playerMode == 'mini' && !searchShow) &&  <MiniPlayer {...currentSong}  ref="miniPlayer"/>
        }
        <audio ref="audio" src={currentSong.url} onCanPlay={this.songPlay} onPlay={this.songPlay} onError={this.songError} onTimeUpdate={this.songTimeUpdate} onEnded={this.songEnd} ></audio>
      </div>
    )
  }  
}

import { connect } from 'react-redux'
import { setPlayingState,setPlayerMode,setCurrentSong } from 'Redux/Action'


const mapStateToProps = (state)=>{
  return {
    player:state.player,
    playList:state.playList,
    searchShow:state.searchDetail.searchShow
  }
}


const mapDispatchToProps = (dispatch)=>{
  return {
    setPlayingState:(data)=>{
      dispatch(setPlayingState(data))
    },
    setPlayerMode:(data)=>{
      dispatch(setPlayerMode(data))
    },
    playSong:(song, index)=>{
        dispatch(setPlayingState({
            playing: true
        }))
        dispatch(setCurrentSong({
            currentSong: song,
            currentIndex: index
        }))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)

