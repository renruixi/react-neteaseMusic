import React, {Component, PropTypes} from 'react';
import wrapper from './wrapper'
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

class MiniPlayer extends Component{
  constructor (props) {
    super(props)
  }
  render(){
    return (
      <div className="mini_player"></div>
    )
  }
}




class FullScreenPlayer extends Component{
  constructor (props) {
    super(props)

    this.onProgressChange = this.onProgressChange.bind(this)
  }
  timePlus(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
      num = '0' + num
      len++
    }
    return num
  }
  formatTime(interval) {
    interval = interval | 0
    let minute = interval / 60 | 0
    let second = this.timePlus(interval % 60)
    return `${minute}:${second}`
  }
  percent(){
    return (this.props.currentTime / this.props.interval).toFixed(2);
  }
  onProgressChange(percent){
    let { setAudioCurrentTime,interval } = this.props;
    setAudioCurrentTime(parseInt(percent * interval))
  }
  render(){
    let {image,url,title,subtitle,singer,album,interval,currentTime} = this.props.currentSong
    let { playing } = this.props.player;

    let progressProps = {
      onProgressChange:this.onProgressChange,
      ...this.props
    }
    return (
      <div className="fullscreen_player">
        <div className="fullscreen_bg" style={{backgroundImage:`url(${image})`}}>
        </div>
        <div className="fullscreen_play_header">
          <div className="player_back"></div>
          <h2 className="player_songname">{title}</h2>
          <h4 className="player_singer">{singer}</h4>
        </div>
        <div className="fullscreen_player_info">
          <div className="song_container">
            <div className={`song_disc ${playing ? '' : 'pause'}`}>
              <div className={`song_turn flex vertical-middle horizonal-middle play ${playing ? '' : 'pause'}`}>
                <div className="song_img">
                  {
                    image && <img src={image} alt=""/>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="lyric_container"></div>
        </div>
        <div className="player_bottom">
          <div className="progress_outer flex vertical-middle">
            <span className="player_time load flex1">{this.formatTime(currentTime)}</span>
            <div className="progress_inner">
              <Progress {...progressProps} percent={this.percent()} ref="progress"></Progress>
            </div>
            <span className="player_time total flex1">{this.formatTime(interval)}</span>
          </div>
          <div className="player_ctrl_wrap">
            <PlayerCtrl {...this.props} ref="playerCtrl"></PlayerCtrl>
          </div>
        </div>
      </div>
    )
  }
}


class PlayerCtrl extends Component{
  constructor(props) {
    super(props);
  }
  prev(){
    let { setCurrentSong,playList,setPlayingState } = this.props;
    let { currentIndex, playMode} = this.props.player;
    let index = this.switchCurrentIndex(playMode,'prev',playList.length);
    setCurrentSong({
      currentIndex:index,
      currentSong:playList[index]
    })
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
    let { setCurrentSong,playList,setPlayingState } = this.props;
    let { currentIndex, playMode} = this.props.player;
    let index = this.switchCurrentIndex(playMode,'next',playList.length);
    setCurrentSong({
      currentIndex:index,
      currentSong:playList[index]
    })
  }
  togglePlay(){
      let { playing } = this.props.player;
      let { setPlayingState } = this.props;
      setPlayingState({
        playing:!playing
      })
  }
  toggleMode(){
      let { playMode } = this.props.player;
      let { playModeList } = playerConfig;
      let { setPlayMode } = this.props;
      let modeIndex = (playModeList.indexOf(playMode)+1) % playModeList.length;
      setPlayMode({
        playMode:playModeList[modeIndex]
      })
  }
  render(){
    let { playMode,playing } = this.props.player;
    return (
      <div className="player_ctrl flex vertical-middle horizonal-middle">
        <div className="flex1">
          <div className={`playmode_btn btn ${playMode}`} onClick={this.toggleMode.bind(this)}></div>
        </div>
        <div className="flex1">
          <div className="prev_btn btn" onClick={this.prev.bind(this)}></div>
        </div>
        <div className="flex1">
          <div className={`play_btn btn ${playing ? 'pause' : 'play'}`} onClick={this.togglePlay.bind(this)}></div>
        </div>
        <div className="flex1">
          <div className="next_btn btn" onClick={this.next.bind(this)}></div>
        </div>
        <div className="flex1">
          <div className="playlist_btn btn"></div>
        </div>
      </div>
    )
  }  
}



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
    this.refs.fullPlayer.refs.playerCtrl.next();
  }
  componentDidUpdate(prevProps){
    let {playerMode,playing,currentSong} = this.props.player;
    if(prevProps.player.playing !== this.props.player.playing){
      playing ? (this.refs.audio.paused && this.refs.audio.play()) : this.refs.audio.pause()
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
  render(){
    let {playerMode,playing,currentSong,playMode} = this.props.player;
    let {playList} = this.props;
    let playProps = {
      setAudioCurrentTime:this.setAudioCurrentTime,
      currentSong:currentSong,
      ...this.props
    }
    return (
      <div className="player_container">
        {
          playList.length > 0 && playerMode == 'fullscreen' &&  <FullScreenPlayer {...playProps} currentTime={this.state.currentTime} ref="fullPlayer"/>
        }
        {
          playList.length > 0 && playerMode == 'mini' &&  <MiniPlayer {...currentSong} {...this.props} ref="miniPlayer"/>
        }
        <audio ref="audio" src={currentSong.url} onCanPlay={this.songPlay} onPlay={this.songPlay} onError={this.songError} onTimeUpdate={this.songTimeUpdate} onEnded={this.songEnd} ></audio>
      </div>
    )
  }  
}


export default wrapper({
    id:'player',
    component:Main,
})