import React, {Component, PropTypes} from 'react';
import wrapper from './wrapper'
import Header from 'baseComponent/header'
import {createMV} from 'common/js/song'
import Loading from 'baseComponent/Loading/Loading'
import ScrollView from 'baseComponent/scrollview'
import MvList from 'baseComponent/mvList'
import '../Style/hotMV.less';


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
    render(){
        let { isFetching,mvlist } = this.props.mvList;
        let mvProps = {
            list:mvlist && this._normalizeMV(mvlist)
        }
        return (
            <div>
                <Header></Header>
                <div className="mv_container">
                    {
                        (typeof isFetching != 'boolean' || isFetching) && <Loading />
                    }
                    <ScrollView className="mv_list_outer" ref="scrollview">
                        <div>
                            {
                                mvlist && <MvList {...mvProps}></MvList> 
                            }
                        </div>
                    </ScrollView>
                </div>
            </div>
        )
    }
}


export default wrapper({
    id: 'mvList', 
    component: Main, 
    method: 'getMVList'
})