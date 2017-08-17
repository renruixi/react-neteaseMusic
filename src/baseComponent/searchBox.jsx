import React, {Component, PropTypes} from 'react';
import '../Style/searchbox.less';
import ReactDOM from 'react-dom'

class SearchBox extends Component{
    constructor(props) {
        super(props);
        this._onInput = this._onInput.bind(this)
        this._onFocus = this._onFocus.bind(this)
    }
    _onInput(e){
        let { onInput } = this.props;
        onInput && onInput(e)
    }
    _onFocus(){
        let { onFocus } = this.props;
        onFocus && onFocus()
    }
    componentDidUpdate() {
        let {query} = this.props;
        ReactDOM.findDOMNode(this.refs.searchInput).value = query;
    }
    
    render(){
        return (
            <div className="search_box">
                <input type="text" className="search_input" ref="searchInput"  onFocus={this._onFocus} onInput={this._onInput}  placeholder={this.props.placeholder}/>
            </div>
        )
    }
}

SearchBox.defaultProps = {
    placeholder:'搜索音乐、歌词、电台'
}

export default SearchBox