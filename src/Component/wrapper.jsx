import React,{Component,PropsType} from 'react'

import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import * as action from 'Redux/Action';
import * as reducer from 'Redux/Reducer'


const wrapper = (options)=>{
    let setting = {
        id: '', //应用唯一id表示
        method: '', //请求方法
        data: null, //发送给服务器的数据
        component: <div></div>, //数据回调给的组件
    };
    Object.assign(setting,options);
    class IndexWrapper extends Component{
        constructor(props,context) {
            super(props,context);
            this._setScrollPos = this._setScrollPos.bind(this)
        }
        render(){
            let newProps = {
                _setScrollPos:this._setScrollPos
            }
            return (
                <this.props.component {...this.props} {...newProps} ref="children" />
            )
        }
        shouldComponentUpdate(nextProps, nextState) {
            if(setting.method){
                if(nextProps[setting.id].isFetching){
                    return false;
                }
                return !is(fromJS(this.props), fromJS(nextProps))
            }else{
                return !is(fromJS(this.props), fromJS(nextProps))
            }
        }
        _setScrollPos(e){
            let {x,y} = e;
            let { setScrollPos } = this.props; 
            setScrollPos({
                scrollY:y,
                scrollX:x
            },setting.id)
        }
        fetch(){
            if(!this.props[setting.id]){
                return;
            }
            let {loaded} =  this.props[setting.id]
            if(!loaded){  //如果当前组件没有加载过数据 才加载数据  否则用历史state数据
                let fn = this.props[setting.method];
                if(setting.urlParams){
                    for(var key in setting.urlParams){
                        setting.urlParams[key] = this.props.params[key]
                    }
                }
                if(typeof fn == "function"){
                    let params = {
                        ...setting.methodParams,
                        ...setting.urlParams
                    }
                    fn(params);
                }
            }
        }
        componentWillMount() {
            this.fetch();
        }
           
    }

    IndexWrapper.defaultProps = setting;


    return connect((state)=>{
        return {
            [setting.id]:state.store[setting.id]
        }
    },action)(IndexWrapper)
}

export default wrapper;

