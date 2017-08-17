import React, {Component, PropTypes} from 'react';
import { is, fromJS } from 'immutable';
import 'Style/progressBar.less'
import ReactDOM from 'react-dom';


class ProgressBar extends Component{
    constructor(props) {
        super(props);
        this.touch = {};
        this.percent = 0;
        this.onBtnStart = this.onBtnStart.bind(this)
        this.onBtnMove = this.onBtnMove.bind(this)
        this.onBtnEnd = this.onBtnEnd.bind(this)
    }
    onBtnStart(e){
        e.preventDefault();
        let touch = e.targetTouches[0]
        this.touch.started = true
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
        this.touch.left = this.progressDOM.clientWidth
    }
    componentDidMount(){
        this.progressBarDOM = ReactDOM.findDOMNode(this.refs.progressBar)
        this.progressDOM = ReactDOM.findDOMNode(this.refs.progress)
    }
    onBtnMove(e){
        if (!this.touch.started) {
          return
        }
        const progressBtnWidth = 10;
        const deltaX = e.targetTouches[0].pageX - this.touch.startX;
        const offsetWidth = Math.min(this.progressBarDOM.clientWidth, Math.max(0, this.touch.left + deltaX))
        this.percent = (offsetWidth / this.progressBarDOM.clientWidth).toFixed(2)
        this.progressBtnMove(offsetWidth)
    }
    progressBtnMove(offsetWidth){
        this.progressDOM.style.width = `${offsetWidth}px`
    }
    onBtnEnd(callback){
        this.touch.initiated = false;
        let {onProgressChange} = this.props;
        onProgressChange && onProgressChange(this.percent)
    }
    render(){
        let {percent} = this.props;
        return (
            <div className="progress_bar" ref="progressBar">
                <div className="progress_bar_container">
                    <div className="progress_load" ></div>
                    <div className="progress_play"  ref="progress" style={{width:parseInt(percent*100)+'%'}}>
                        <div className="progress_btn" ref="progressBtn" onTouchStart={this.onBtnStart} onTouchMove={this.onBtnMove} onTouchEnd={this.onBtnEnd}></div>
                    </div>
                </div>
            </div>
        )
    }    
}

export default ProgressBar;