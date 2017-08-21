import React, {Component, PropTypes} from 'react';
import 'Style/search/searchTab.less'

import { connect } from 'react-redux'
import { setSearchState } from 'Redux/Action'


const mapDispatchToProps = (dispatch)=>{
    return {
        setSearchState:(data)=>{
            dispatch(setSearchState(data))
        }   
    }
}

class SearchTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentTab:'0'
        }
    }
    tabClick(t){  //点击tab 触发父级  changeTab
        let { setSearchState } = this.props;
        setSearchState({
            currentKey:t
        })
        this.setState({
            currentTab:t
        })
    }
    render(){
        let { tabList } = this.props;
        return (
            <ul className="search_tab flex">
                {
                    tabList.map((item,index)=>{
                        return (
                            <li key={index}  className={`tab_item flex1 ${this.state.currentTab == item.t ? 'active':''}`} onClick={()=>{this.tabClick(item.t)}}>{item.name}</li>
                        )
                    })
                }
            </ul>
        )
    }
}
SearchTab.defaultProps = {
    tabList:[
        {
            name:'单曲',
            t:0,
        },{
            name:'专辑',
            t:8,
        },{
            name:'MV',
            t:12,
        }
    ]
}
export default connect(()=>{
    return{}
},mapDispatchToProps)(SearchTab)


