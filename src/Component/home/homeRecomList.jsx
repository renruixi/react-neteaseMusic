import React, {Component, PropTypes} from 'react'
import { browserHistory } from 'react-router';

class HomeRecomList extends Component {
  constructor(props, context) {
    super(props, context);
    this.play = this.play.bind(this);
  }
  play(item,index){
    let path = `/songsheet/${item.id}`;
    browserHistory.push(path)
  }
  render() {
    let {title, list} = this.props;
    return (
      <div className='recommend_list'>
        <h2 className='list_title'>{title}</h2>
        <ul className='list_container'>
          {
            list && list.map((item, index) => {
              return (
                <li key={index} onClick={()=>this.play(item,index)}>
                    <div className='list_media'>
                      <img src={item.image}/>
                      <span className='icon_play'></span>
                    </div>
                    <div className='list_info'>
                      <h3 className='list_tit'>{item.desc}</h3>
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

export default HomeRecomList
