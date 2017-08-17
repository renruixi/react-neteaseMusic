import React, {Component, PropTypes} from 'react';
import {
    Router,
    Route,
    IndexRoute,
    browserHistory,
    hashHistory,
    IndexRedirect
} from 'react-router';

import Player from 'Component/player/index'

const history = process.env.NODE_ENV !== 'production'
    ? browserHistory
    : hashHistory;

const Recommend = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/home/main").default)
    }, 'Header')
}

const Singer = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/singer/singer").default)
    }, 'Singer')
}

const SingerDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/singer/singerDetail").default)
    }, 'SingerDetail')
}

const Rank = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/rank").default)
    }, 'Rank')
}

const Search = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/search/index").default)
    }, 'Search')
}

const radioList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/radio").default)
    }, 'radioList')
}

const HotMV = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/HotMV").default)
    }, 'HotMV')
}

const AlbumDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/albumDetail").default)
    }, 'AlbumDetail')
}

const SongSheet = (location, cb) => {
    require.ensure([], require => {
        cb(null, require("../Component/songSheet").default)
    }, 'SongSheet')
}

class Roots extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                <Player></Player>
            </div>
        );
    }
}

const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={Roots}>
            <Route path="singer" getComponent={Singer}></Route>
            <Route path="/singerdetail/:singerId" getComponent={SingerDetail}></Route>
            <Route path="/albumdetail/:albumId" getComponent={AlbumDetail}></Route>
            <Route path="/songsheet/:disstid" getComponent={SongSheet}></Route>
            <Route path="recommend" getComponent={Recommend}/>
            <Route path="radio" getComponent={radioList}/>
            <Route path="hotMV" getComponent={HotMV}/>
            <Route path="rank" getComponent={Rank}/>
            <IndexRedirect from='/' to='/recommend'/>
        </Route>
    </Router>
);

export default RouteConfig;