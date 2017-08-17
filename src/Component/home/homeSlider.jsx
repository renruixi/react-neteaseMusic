import React, {Component, PropTypes} from 'react'
import Slider from 'baseComponent/slider'
import { Link } from 'react-router'

/*
    首页轮播图
*/
class HomeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checkLoad: false
    }
  }
  render() {
    let {list} = this.props;
    return (
      <div className='slider_wrapper'>
        <div className="slider-content">
          <Slider ref='sliderView' snap={true}>
            {
              list && list.map((item, index) => {
                return (
                  <div key={index} className='slider-item'>
                    <Link to={item.linkUrl}>
                      <img src={item.picUrl}/>
                    </Link>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    )
  }
}

export default HomeSlider
