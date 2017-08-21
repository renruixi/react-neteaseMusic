import React, {Component, PropTypes} from 'react';
import Header from 'baseComponent/header'
import Tab from 'baseComponent/tab'

class IndexContainer extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="main_container">
                <Header></Header>
                <Tab></Tab>
                {this.props.children}
            </div>
        )
    }    
}

export default IndexContainer;