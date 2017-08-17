import React, { Component, PropTypes } from 'react'
import BetterScroll from 'better-scroll'

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
      snap:this.props.snap
    })
  }
  componentDidMount() {
    let {scrollX,scrollY} = this.props;
    setTimeout(()=>{
      this.scroll && this.scrollTo(scrollX || 0,scrollY || 0,'easing')
    },20)
  }
  onScroll (callback) {
    setTimeout(()=>{
      this.scroll && this.scroll.on('scroll', (e) => {
        callback && callback(e)
      })
    },20)
  }
  onScrollEnd(callback){
    setTimeout(()=>{
        this.scroll && this.scroll.on('scrollEnd', (e) => {
        callback && callback(e)
      })
    },20)
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
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
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
  probeType: 3,
  click: true,
  data: null,
}

export default ScrollView
