import React, {Component, PropTypes} from 'react';
import {createMV} from 'common/js/song'
import {is, fromJS} from 'immutable';
import Loading from 'baseComponent/Loading/Loading'
import ScrollView from 'baseComponent/scrollview'
import MvList from 'baseComponent/mvList'
import 'Style/hotMV.less';
import { getData } from 'common/js/dom'
import ReactDOM from 'react-dom';


import { connect } from 'react-redux'
import { setMvParams,getMVList,setMvSort} from 'Redux/Action'

const MvHeader = (()=>{
    class MvHeader extends Component{
        constructor(props) {
            super(props);
            this.state = {
                type:'1'
            }
            //this.showSortBox = this.showSortBox.bind(this);
            this.sortType = this.sortType.bind(this)
            this.showMvSort = this.showMvSort.bind(this)
        }
        showMvSort(){
            let { setMvSort } = this.props;
            setMvSort({
                show:true
            })
        }
        sortType(e){ 
            let { setMvParams } = this.props;
            let type = getData(e.target,'sort')
            this.setState({
                type:type
            })
            setMvParams({
                type:type
            })
        }
        render(){
            return (
                <header className='mv_header clearfix'>
                    <h2 className="mv_part_switch fl">
                        <span className={`switch_item left ${this.state.type == '1' ? 'select':''}`} data-sort="1" onClick={this.sortType}>最新</span>
                        <span className={`switch_item right ${this.state.type == '2' ? 'select':''}`} data-sort="2" onClick={this.sortType}>最热</span>
                    </h2>
                    <h4 className="sort_tag fr" onClick={this.showMvSort}>筛选</h4>
                </header>
            )
        }    
    }
    const mapStateToProps = (state) => {
        return {
            mvParams:state.mvState.mvParams
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            setMvParams: (params) => {
                dispatch(setMvParams(params))
            },
            setMvSort:(data)=>{
                dispatch(setMvSort(data))
            }
        }
    }
    return connect(mapStateToProps,mapDispatchToProps)(MvHeader)
})()


class SortListItem extends Component{
    constructor(props) {
        super(props)
        this.state = {
            currentId:this.props.id || 0
        }

        this.tapTag = this.tapTag.bind(this)
    }
    tapTag(e){
        let id = getData(e.target,'id')
        this.setState({
            currentId:id
        })
    }
    render(){
        let { list,title } = this.props;
        return (
            <div className='sort_item'>
                <h2 className='sort_title'>{title}</h2>
                <div className="sort_list clearfix">   
                {
                    list.map((item,index)=>{
                        if(index > 7){
                            return;
                        }
                        return (
                            <p onClick={this.tapTag} key={index} className={`sort_list_item fl ${this.state.currentId == item.id ? 'active':''}`} data-sort={title} data-id={item.id} >{item.title}</p>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}

const MvSort = (()=>{
    class MvSort extends Component{
        constructor(props) {
            super(props)
            this.sortConfirm = this.sortConfirm.bind(this);
            this.closeSort = this.closeSort.bind(this);
        }
        sortConfirm(){
            let { tagList ,setMvParams} = this.props;
            let params = {}
            for(let key in tagList){
                params[key]  = this.refs[`sortListItem${key}`].state.currentId
            }
            this.closeSort(()=>{
                setMvParams(params)
            })
        }
        sortList(tagList){
            let { mvParams } =  this.props;
            let res = [];
            for(let key in tagList){
                res.push(<SortListItem list={tagList[key]} title={key} key={key} ref={`sortListItem${key}`} id={mvParams[key]}/>)
            }
            return res;
        }
        closeSort(callback){
            let { setMvSort } = this.props;
            
            ReactDOM.findDOMNode(this.refs.sortContainer).style.transform='translate3d(0,-100%,0)';
            this.refs.sortContainer.addEventListener('transitionend',()=>{
                callback && callback()
                setMvSort({
                    show:false
                })
            })
        }
        componentDidMount(){
            let { setMvSort } = this.props;
        }
        render(){
            let { tagList } = this.props;
            return (
                <div className='mv_sort' ref="test">
                    <div className='mv_sort_mask' onClick={this.closeSort}></div>
                    <div className="mv_sort_container" ref='sortContainer'>
                        {
                            tagList && this.sortList(tagList)
                        }
                        <div className="mv_sort_confirm" onClick={this.sortConfirm}>确认</div>
                    </div>
                </div>
            )
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            setMvParams: (params) => {
                dispatch(setMvParams(params))
            },
            setMvSort:(data)=>{
                dispatch(setMvSort(data))
            }
        }
    }


    const mapStateToProps = (state) => {
        return {
            tagList: state.store.mvList.taglist,
            mvParams:state.mvState.mvParams
        }
    }

    return connect(mapStateToProps,mapDispatchToProps)(MvSort)
})()



class Main extends Component{
    constructor(props) {
        super(props);
    }
    _normalizeMV(data){
        let res = [];
        data.forEach((mvdata) => {
          if (mvdata.mv_id) {
            res.push(createMV(mvdata))
          }
        })
        return res;
    }
    componentWillMount(){
        let { getMVList} = this.props;
        getMVList()
    }
    componentWillReceiveProps(nextProps){
        if( !is( fromJS(this.props.mvParams),fromJS(nextProps.mvParams) ) ){  
            let { getMVList } = this.props;
            let { mvParams } = nextProps;
            getMVList(mvParams)
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props.mvList), fromJS(nextProps.mvList)) || !is(fromJS(this.props.mvSortShow), fromJS(nextProps.mvSortShow))
    }
    render(){
        let { mvList,mvSortShow } = this.props;
        let mvProps = {
            list:mvList && this._normalizeMV(mvList)
        }
    
        return (
            <div className="mv">
                <MvHeader></MvHeader>
                {
                    mvSortShow && <MvSort></MvSort>
                }      
                <div className="mv_container">
                    {
                        !mvList && <Loading />
                    }
                    
                    <ScrollView className="mv_list_outer" ref="scrollview">
                        <div>
                            {
                                mvList && <MvList {...mvProps}></MvList> 
                            }
                        </div>
                    </ScrollView>
                 </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mvList:state.store.mvList.mvlist,
        mvParams:state.mvState.mvParams,
        mvSortShow:state.mvState.mvSortShow
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setMvParams: (data) => {
            dispatch(setMvParams(data))
        },
        getMVList:(data)=>{
            dispatch(getMVList(data))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main)
