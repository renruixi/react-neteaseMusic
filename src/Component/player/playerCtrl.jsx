import React, {Component, PropTypes} from 'react';
import 'Style/player.less'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { playerConfig } from 'Config/Config'

class PlayerCtrl extends Component{
  constructor(props) {
    super(props);
  }
  prev(){
    let { currentIndex, playMode} = this.props.player;
    let { playList,playSong } = this.props;

    let index = this.switchCurrentIndex(playMode,'prev',playList.length);

    playSong(playList[index],index)
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
  togglePlay(){
      let { playing } = this.props.player;
      let { setPlayState } = this.props;
      setPlayState(!playing)
  }
  toggleMode(){
      let { playMode } = this.props.player;
      let { playModeList } = playerConfig;
      let { setPlayMode } = this.props;
      let modeIndex = (playModeList.indexOf(playMode)+1) % playModeList.length;
      setPlayMode(playModeList[modeIndex])
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



import { setPlayingState,setPlayMode,setCurrentSong } from 'Redux/Action';


const mapStateToProps = (state)=>{
    return {
        player:state.player,
        playList:state.playList
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        playSong:(song, index)=>{
            dispatch(setPlayingState({
                playing: true
            }))
            dispatch(setCurrentSong({
                currentSong: song,
                currentIndex: index
            }))
        },
        setPlayState:(state)=>{
            dispatch(setPlayingState({
                playing:state
            }))
        },
        setPlayMode:(mode)=>{
            dispatch(setPlayMode({
                playMode:mode
            }))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayerCtrl)