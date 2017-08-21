import React, { Component, PropTypes } from 'react'
import BetterScroll from 'better-scroll'
import { is, fromJS } from 'immutable';

class ScrollView extends Component {
  constructor (props,context) {
    super(props,context)
  }
  componentWillMount() {
      setTimeout(()=>{
        this._initScroll()
      },16)
  }
  componentDidUpdate(prevProps, prevState) {
      this.refresh();
  }
  _initScroll () {
    if (!this.refs.scrollwrap) {
      return
    }
    this.scroll = new BetterScroll(this.refs.scrollwrap, {
      probeType: this.props.probeType,
      click: this.props.click,
      snap:this.props.snap,
      scrollbar:this.props.scrollbar,
    })
  }
  componentWillReceiveProps(nextProps) {
    let {scrollX,scrollY} = nextProps;
    this.scrollTo(scrollX || 0,scrollY || 0,0,'easing');
  }
  componentDidMount() {
    let {scrollX,scrollY} = this.props;
    this.scrollTo(scrollX || 0,scrollY || 0,0,'easing');
    setTimeout(()=>{
      this._onScroll();
      this._onScrollEnd();
    },20)
  }
  _onScroll (callback) {
    let { onScroll } = this.props;
    this.scroll && this.scroll.on('scroll', (e) => {
      onScroll && onScroll(e)
    })
  }
  _onScrollEnd(callback){
    let { onScrollEnd } = this.props;
    this.scroll && this.scroll.on('scrollEnd', (e) => {
      onScrollEnd && onScrollEnd(e)
    })
  }
  enable () {
    this.scroll && this.scroll.enable()
  }
  disable () {
    this.scroll && this.scroll.disable()
  }
  destroy(){
    this.scroll && this.scroll.destroy();
  }
  refresh () {
    this.scroll && this.scroll.refresh()
  }
  scrollTo () {
    setTimeout(()=>{
      let { scrollToCallback } = this.props;
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
      scrollToCallback && scrollToCallback()
    },20)
  }
  scrollToElement () {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }
  render () {
    return (
      <div ref='scrollwrap' className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

ScrollView.defaultProps = {
  probeType:3,
  click: true,
  scrollbar:true
}

export default ScrollView
