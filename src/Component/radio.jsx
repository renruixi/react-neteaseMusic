import React, {Component, PropTypes} from 'react'
import ScrollView from 'baseComponent/scrollview'
import {Link} from 'react-router'
import {is, fromJS} from 'immutable';
import wrapper from './wrapper'
import 'Style/radio.less'
import Header from 'baseComponent/header'
import Tab from 'baseComponent/tab'
import Loading from 'baseComponent/Loading/Loading'
import { browserHistory } from 'react-router';

class RadioList extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let {radioList,width} = this.props;
    return (
      <div className="radio_list_outer">
        <ul className="radio_list_inner flex" style={{width:width}}>
          {
            radioList.map((item,index)=>{
              return (
                <li key={index}>
                  <img className="radio_img" src={item.radioImg} alt=""/>
                  <div className="radio_desc">
                    <p className="radio_name">{item.radioName}</p>
                    <p className="radio_listennum">热度:{item.listenNum}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

class RadioSort extends Component{
  constructor(props){
    super(props)
  }
  _setListWidth(list){
    let length = list.length;
    const radioItemWidth = 92;
    const radioItemMargin = 20;
    return `${length * (radioItemWidth+radioItemMargin)-radioItemMargin}px`
  }
  render(){
    let { list } = this.props;
    return (
      <div className="radio_sort">
        {
          list.map((item,index)=>{
            return (
              <div className="radio_sort_item" key={index}>
                <h3 className="radio_title clearfix">
                  <p className="title">{item.name}</p>
                  <p className="check_all">查看全部<i className="arrow"></i></p>
                </h3>
                <RadioList radioList={item.radioList} width={this._setListWidth(item.radioList)}></RadioList>
              </div>
            )
          })
        }
      </div>
    )
  }
}



class Main extends Component{
  constructor (props) {
    super(props)
  }
  render(){
    let {isFetching,data} = this.props.radioList;
    let radioProps = {
      list : data && data.groupList,
    }
    return (
      <div className="radio">
          {
            (typeof isFetching != 'boolean' || isFetching) && <Loading />
          }
          {
            data && <RadioSort {...radioProps}/>
          }
      </div>
    )
  }  
}


export default wrapper({
  id: 'radioList',
  component: Main,
  method: 'getRadioList'
})
