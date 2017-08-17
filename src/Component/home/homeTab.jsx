import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

const radioIcon = require("../../Images/radio.png")
const mvIcon = require("../../Images/mv.png")


class HomeTab extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div className="recommend_tab flex veritcal-middle horizonal-middle">
          <Link to="/radio" className="recommend_tab_items flex1">
            <img src={radioIcon} alt=""/>
            <p>私人FM</p>
          </Link>
          <Link to="/hotMV" className="recommend_tab_items flex1">
            <img src={mvIcon} alt=""/>
            <p>热门MV</p>
          </Link>
      </div>
    )
  }
}



export default HomeTab
