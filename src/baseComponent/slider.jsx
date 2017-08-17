import React, { Component, PropTypes } from 'react'
import BetterScroll from 'better-scroll'
import { addClass } from '../common/js/dom'
import { is, fromJS} from 'immutable';
import 'Style/slider.less'

class Slider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentIndex: 0,
      timer: null
    }
  }
  componentDidMount(nextProps) {
      this._setSliderWidth()
      this._initDots()
      this._initSlider();
      
      this.props.refresh && this.props.refresh()  //这里需要等待slider组件加载完毕后 调用 上层 better-scroll的refresh方法重新计算滚动高度
      if (this.props.autoPlay) {
        this._play()
      }
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  }
  
  _setSliderWidth (isResize) {
    this.children = this.refs.sliderGroup.children
    let width = 0;
    let sliderWidth = this.refs.sliderGroup.clientWidth
    for (let i = 0; i < this.children.length; i++) {
      let child = this.children[i]
      addClass(child, 'slider-item')
      child.style.width = sliderWidth + 'px'
      width += sliderWidth
    }
    if (this.props.loop && !isResize) {
      width += 2 * sliderWidth
    }
    this.refs.sliderGroup.style.width = width + 'px';
  }
  refresh(){
    this._setSliderWidth(true);
    this.slider.refresh()
  }
  _initSlider () {
    this.slider = new BetterScroll(this.refs.slider, {
      scrollX: true,
      scrollY: false,
      momentum: false,
      snap: true,
      snapLoop: this.props.loop,
      snapThreshold: 0.3,
      snapSpeed: 400 
    })

    this.slider.on('scrollEnd', () => {
      let pageIndex = this.slider.getCurrentPage().pageX
      if (this.props.loop) {
        pageIndex -= 1
      }
      this.setState(Object.assign({}, {
        currentIndex: pageIndex
      }))

      if (this.props.autoPlay) {
        clearTimeout(this.state.timer)
        this._play()
      }
    })
  }
  _initDots () {
    this.dots = new Array((this.props.children || []).length)
  }
  _play () {
    let pageIndex = this.state.currentIndex + 1
    if (this.props.loop) {
      pageIndex += 1
    }
    this.state.timer = setTimeout(() => {
      this.slider.goToPage(pageIndex, 0, 400)
    }, this.props.interval)
  }
  _dotActive(index){ //三目运算判断 style或者class最好从render中提出来   夹杂在jsx中难以阅读
    let active = this.state.currentIndex == index ? 'active': '';
    return active + ' dot';
  }
  render () {
    return (
      <div className='slider' ref="slider">
        <div className='slider-group clearfix' ref='sliderGroup'>
            {this.props.children}
        </div>
        <div className='dots'>
          {
            this.props.children && this.props.children.map((item, index) => {
              return (
                <span className={this._dotActive(index)} key={index}></span>
              )
            })
           }
        </div>
      </div>
    )
  }
}

Slider.defaultProps = {
  loop: true,
  autoPlay: true,
  interval: 4000
}

export default Slider
