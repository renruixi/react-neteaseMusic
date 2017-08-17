import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'

const PlayerCtrlHOC = (component)=>{
    class PlayerCtrlIndex extends Component{
        constructor(props) {
            super(props);
        }
        next(){
            let { setCurrentSong } = this.props;
            let { playList } = this.props.state; 
        }
        prev(){
            let { setCurrentSong } = this.props;
            let { playList } = this.props.state; 
        }
        togglePlay(){
            let { playing } = this.props.state.player;
            let { setPlayingState } = this.props;
        }
        toggleMode(){
            let { playMode } = this.props.state.player;
            let { setPlayingMode } = this.props;
        }
        render(){
            return (
                <component></component>
            )
        }
    }

    return connect((state)=>{
        return {
            state:{
                playList:state['setPlayList'],
                player:state['setPlayer'],
            },
        }
    },action)(PlayerCtrlIndex)
}


export default{
   PlayerCtrlHOC
}


