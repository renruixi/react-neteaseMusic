import React, {Component, PropTypes} from 'react';
import wrapper from 'Component/wrapper'
import Progress from 'baseComponent/progressBar'
import { playerConfig } from 'Config/Config'
import PlayerCtrl from './playerCtrl'
import 'Style/player.less'

class FullScreenPlayer extends Component{
  constructor (props) {
    super(props)
    this.onProgressChange = this.onProgressChange.bind(this);
    this.goBack = this.goBack.bind(this)
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
  goBack(){
    let {setPlayerMode} = this.props;
    setPlayerMode({
      playerMode:'mini'
    })
  }
  percent(){
    let { currentTime,currentSong } = this.props;
    let { interval } = currentSong
    return (currentTime / interval).toFixed(2);
  }
  onProgressChange(percent){
    let { setAudioCurrentTime,currentSong } = this.props;
    let { interval } = currentSong;
    setAudioCurrentTime(parseInt(percent * interval))
  }
  render(){
    let {image,url,title,subtitle,singer,album,interval} = this.props.currentSong;
    
    let {currentTime,playing} = this.props;

    let progressProps = {
      onProgressChange:this.onProgressChange,
    }
    return (
      <div className="fullscreen_player">
        <div className="fullscreen_bg" style={{backgroundImage:`url(${image})`}}>
        </div>
        <div className="fullscreen_play_header">
          <div className="player_back" onClick={this.goBack}></div>
          <h2 className="player_songname">{title}</h2>
          <h4 className="player_singer">{singer}</h4>
        </div>
        <div className="fullscreen_player_info">
          <div className="song_container">
            <div className={`song_disc ${playing ? '' : 'pause'}`} onTouchStart={this.discTouch}>
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
            <PlayerCtrl ref="playerCtrl"></PlayerCtrl>
          </div>
        </div>
      </div>
    )
  }
}

import { connect } from 'react-redux'
import { setPlayerMode } from 'Redux/Action'


function mapDispatchToProps(dispatch){
  return {
    setPlayerMode:()=>{
      dispatch(setPlayerMode({
        playerMode:'mini'
      }))
    }
  }
}



export default connect(()=>{
  return{}
},mapDispatchToProps)(FullScreenPlayer)
