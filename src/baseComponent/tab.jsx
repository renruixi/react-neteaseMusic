import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'

import '../Style/tab.less'

class Tab extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        let tabList = this.props.tabList.map((item,index)=>{
            return (
                <Link to={item.url} className="tab_item flex1" key={index} activeClassName="selected">
                    <span className="tab_link">{item.name}</span>
                </Link>
            )
        })
        return (
            <div className="tab flex">
                {tabList}
            </div>
        )
    }    
}

Tab.defaultProps = {
    tabList:[
        {
            'name':'个性推荐',
            'url':'/home'
        },
        {
            'name':'歌手',
            'url':'/singerList'
        },
        {
            'name':'排行榜',
            'url':'/rank'
        }
    ]
}


export default Tab;
