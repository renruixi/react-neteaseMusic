import React, {Component, PropTypes} from 'react';
import SearchBox from './searchBox'
import Search from 'Component/search/index'
import { browserHistory } from "react-router"
import { connect } from 'react-redux'

import '../Style/header.less';


class Header extends Component{
    constructor(props) {
        super(props)
    }
    goToSearchPage(){
        browserHistory.push(`/search`);
    }
    render(){
        //<Search ref="searchview" />
        let { searchShow } = this.props.searchDetail;
        return (
            <div className="header flex vertical-middle">
                {
                    !searchShow && <div className="logo_icon"></div> 
                }
                <div className="search_wrapper flex1">
                    <input type="text" onClick={this.goToSearchPage.bind(this)} placeholder='搜索音乐、歌词、电台'/>
                </div>
                <div className="play_icon"></div>
            </div> 
        )
    }
}



function mapStateToProps(state) {
    return {
        searchDetail:state.searchDetail
    }
}


export default connect(mapStateToProps,{})(Header)




// class Header extends Component{
//     constructor (props) {
//         super(props)
//         this._onFocus = this._onFocus.bind(this)
//         this._onInput = this._onInput.bind(this)
//         this.searchPageRemove = this.searchPageRemove.bind(this)
//     }
//     componentDidMount() {
//         this._onFocus();
//     }
//     componentWillUnmount() {
//         this.searchPageRemove();
//     }
//     _onFocus(){
//         let rt = this;
//         let {searchInput} = rt.refs.seachbox.refs;
//         let {setSearchState} = this.props;
//         searchInput.addEventListener("focus",()=>{
//             setSearchState({
//                 show:true
//             })
//         })
//     }
//     _onBlur(){
//         let {searchInput} = this.refs.seachbox.refs;
//         let {setSearchState} = this.props;
//         searchInput.addEventListener("blur",()=>{
//             this.searchPageRemove();
//         })
//     }
//     searchPageRemove(){
//         let {setSearchState} = this.props;
//         setSearchState({
//             show:false
//         })
//     }
//     _onInput(callback){
//         let rt = this;
//         let searchBox = rt.refs.seachbox;
//         if(searchBox){
//             let {searchInput} = searchBox.refs;
//             searchInput.addEventListener("input",(e)=>{
//                 callback && callback(e)
//             })
//         }
//     }
//     render(){
//         let searchProps= {
//             onInput:this._onInput
//         }
//         let searchShow = this.props.searchResult.show;
//         let { query } = this.props.searchResult;
//         return (
//             <div className="music_header flex vertical-middle">
//                 {
//                     !searchShow && <div className="logo_icon"></div>
//                 }
//                 {
//                     searchShow && <div className="search_outer"><Search ref="searchview" {...searchProps}/></div>
//                 }
//                 <div className="searchbox_container flex1">
//                     <SearchBox ref="seachbox" query={query}></SearchBox>
//                 </div>
//                 {
//                     searchShow ? <div className="search_cancle" onClick={this.searchPageRemove}>取消</div> : <div className="play_icon"></div>
//                 }
                
//             </div>
//         )
//     }
// }

// export default wrapper({
//     id:'searchResult',
//     component:Header
// })