import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'

class MiniPlayer extends Component{
  constructor (props) {
    super(props)
    this.changePlayerMode = this.changePlayerMode.bind(this)
  }
  changePlayerMode(){
    let { setPlayerMode } = this.props;
    setPlayerMode()
  }
  render(){
    let { playing } = this.props;
    return (
      <div className="mini_player" onClick={this.changePlayerMode}>
        <div className="mini_play_icon vertical-middle flex">
          <span style={{height:'10px'}} className={`${!playing ? 'pause':''}`}></span>
          <span style={{height:'28px'}} className={`${!playing ? 'pause':''}`}></span>
          <span style={{height:'12px'}} className={`${!playing ? 'pause':''}`}></span>
          <span style={{height:'24px'}} className={`${!playing ? 'pause':''}`}></span>
        </div>
      </div>
    )
  }
}


import { setPlayerMode } from 'Redux/Action'

function mapStateToProps(state){
  return {
    playing:state.player.playing
  }
}
function mapDispatchToProps(dispatch){
  return {
    setPlayerMode:()=>{
      dispatch(setPlayerMode({
        playerMode:'fullscreen'
      }))
    }
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(MiniPlayer)