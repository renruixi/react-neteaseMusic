import React, {Component, PropTypes} from 'react';
import wrapper from 'Component/wrapper'
import { Link } from 'react-router'
import Loading from 'baseComponent/Loading/Loading'
import 'Style/search/searchHot.less'


class SearchHot extends Component{
    constructor (props) {
        super(props)
        this.setQuery = this.setQuery.bind(this)
    }
    setQuery(q){
        let { setSearchState } = this.props;
        setSearchState({
            query:q
        })
    }
    render(){
        let { isFetching,hotkey } = this.props.hotSearch
        hotkey = hotkey && hotkey.slice(0,10);
        return (
            <div className="hot_search_container">
                {
                    (typeof isFetching != 'boolean' || isFetching) && <Loading />
                }
                {
                    hotkey && (
                        <div className="hot_search">
                            <h4 className="hot_title">热门搜索</h4>
                            <ul className="hot_list clearfix">
                                {
                                    hotkey.map((item,index)=>{
                                        return <li className="hot_item" key={index} onClick={()=>this.setQuery(item.k)}>{item.k}</li>
                                    })
                                }
                            </ul>
                        </div>
                    )
                }
            </div>
        )
    }    
}

export default wrapper({
    id:'hotSearch',
    component:SearchHot,
    method:'getHotSearch'
})