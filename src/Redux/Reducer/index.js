import Immutable from 'immutable'
import * as actionTypes from '../Action/actionTypes'


const defaultState = {
    recommend: {},
    singerList: {},
    rankList: {},
    hotSearch: {},
    radioList: {},
    mvList: {},
    singerDetail: {},
    albumDetail: {}
}

export const store = (state = defaultState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.REQUEST_START:
            return Object.assign({}, state, {
                [payload.id]: {
                    isFetching: true
                }
            })
        case actionTypes.REQUEST_SUCCESS:
            return Object.assign({}, state, {
                [payload.id]: {
                    isFetching: false,
                    loaded: true,
                    ...payload.data
                }
            })
        case actionTypes.SET_SCROLL_POS:
            Object.assign(state[payload.id], {
                ...payload.data
            })
            return state;
        case actionTypes.DELE_STORE:
            state[payload.id] = {};
            return state;
        default:
            return state;
    }
}

const playerState = {
    playing: false,
    playerMode: 'fullscreen',
    playMode: 'order',
    currentSong: "",
    currentIndex: 0,
};

export const player = (state = playerState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_PLAYING_STATE:
            return Object.assign({}, state, {
                playing: payload.playing
            })
        case actionTypes.SET_PLAYER_MODE:
            return Object.assign({}, state, {
                playerMode: payload.playerMode
            })
        case actionTypes.SET_PLAY_MODE:
            return Object.assign({}, state, {
                playMode: payload.playMode
            })
        case actionTypes.SET_CURRENTSONG:
            return Object.assign({}, state, {
                ...payload
            })
        default:
            return state;
    }
}

const playListState = [];

export const playList = (state = playListState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_PLAYLIST:
            return state.concat(payload.playList)
        case actionTypes.DEL_PLAYLIST:
            let { index } = payload;
            state.splice(index, 1);
            return state;
        default:
            return state;
    }
}

const singerState = {}

export const singer = (state = singerState, action = {}) => {
    let { type, payload } = action;
    switch (type) {
        case actionTypes.SET_SINGER:
            Object.assign(state, {
                ...payload.singer
            });
            return state;
        case actionTypes.DELETE_SINGER:
            Object.assign(state, {})
            return state;
        default:
            return state;
    }
}


const searchState = {
    searchShow: false,
    query: '',
    currentKey:'0',
};

export const searchDetail = (state = searchState, action = {}) => {
    let { type, payload } = action;
    switch (type) {
        case actionTypes.SET_SEARCH_STATE:
            return Object.assign({}, state, {
                ...payload
            })
        case actionTypes.CLEAR_SEARCH_STATE:
            return searchState
        default:
            return state;
    }
}