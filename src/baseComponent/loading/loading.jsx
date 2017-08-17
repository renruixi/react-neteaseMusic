import React, {Component, PropTypes} from 'react';

import 'Style/loading.less';

class Loading extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="loading-container flex vertical-middle horizonal-middle">
        <div className="loading">
          <img width="24" height="24" src={require('./loading.gif')} />
          {
            this.title && <p class="desc">{title}</p>
          }
        </div>
      </div>
    )
  }
}

export default Loading;