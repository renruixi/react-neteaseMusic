import React, {Component, PropTypes} from 'react';
import { browserHistory } from "react-router"
import ReactDOM from 'react-dom';
import { debounce } from 'common/js/util'
import 'Style/search.less'

import SearchHot from './searchHot'
import SearchResult from './searchResult'
import SearchTab from './searchTab'

class Main extends Component{
    constructor(props) {
        super(props);
        this.onInput = this.onInput.bind(this)
        this.debounceCallback = debounce(this.queryChange,200)
        this.goBack  = this.goBack.bind(this);
    }
    queryChange(e){
        let { setSearchState } = this.props;
        let query = e.target.value;
        setSearchState({
            query:e.target.value
        })
    }
    onInput(event){
        event.persist()
        this.debounceCallback(event)
    }
    goBack(){
        let { clearSearchState } = this.props;
        ReactDOM.findDOMNode(this.refs.searchBox).style.width = ``;
        this.refs.searchBox.addEventListener('transitionend',()=>{
            clearSearchState();
            browserHistory.goBack();
        })
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.searchBox).style.width = `85%`;
        this.refs.searchBox.addEventListener('transitionend',()=>{
            this.refs.searchInout.focus();
        })
    }
    componentDidUpdate(){
        let { query } = this.props;
        this.refs.searchInout.value = query;
    }
    render(){
        let { query } =  this.props;
        return (
            <div className="search_container" ref="search_container">
                <div className="searchbox_wrapper flex  vertical-middle flex-end">
                    <div className="search_box" ref="searchBox">   
                        <input type="text" placeholder='搜索音乐、歌词、电台' onChange={this.onInput} ref='searchInout'/>
                    </div>
                    <div className="search_cancle" onClick={this.goBack} >取消</div>
                </div>
                <div className="search_result_container">
                    {
                        query && (
                            <div>
                                <SearchTab />
                                <SearchResult />
                            </div>
                        )
                    }
                    {
                        !query && <SearchHot />
                    } 
                </div>
                {this.props.children}
            </div>
        )
    }    
}

import { connect } from 'react-redux'

import { setSearchState,clearSearchState } from 'Redux/Action'

const mapStateToProps = (state)=>{
    return {
        query:state.searchDetail.query
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        setSearchState:(data)=>{
            dispatch(setSearchState(data))
        },
        clearSearchState:()=>{
            dispatch(clearSearchState())
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Main)


