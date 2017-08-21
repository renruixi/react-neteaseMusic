import Immutable from 'immutable'
import * as actionTypes from '../Action/actionTypes'


const defaultState = {
    recommend: {},
    singerList: {},
    rankList: {},
    hotSearch: {},
    radioList: {},
    albumDetail: {},
    songSheetList: {},
    mvList: {}
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
                scrollX: payload.scrollX,
                scrollY: payload.scrollY
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
                currentSong: payload.currentSong,
                currentIndex: payload.currentIndex
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
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_SINGER:
            return Object.assign({}, state, {
                ...payload
            });
            break;
        case actionTypes.DELETE_SINGER:
            state = {};
            return state;
        default:
            return state;
    }
}


const searchState = {
    query: '',
    currentKey: '0',
};

export const searchDetail = (state = searchState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_SEARCH_QUERY:
            return Object.assign({}, state, {
                query: payload.query
            })
        case actionTypes.SET_SEARCH_CURRENTKEY:
            return Object.assign({}, state, {
                currentKey: payload.currentKey
            })
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



const singerDetailState = {
    currentKey: 'Songs'
}

export const singerDetail = (state = singerDetailState, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case actionTypes.SET_SINGER_DETAIL_CURRENTKEY:
            return Object.assign({}, state, {
                currentKey: payload.currentKey
            })
        case actionTypes.SET_SINGER_DETAIL:
            return Object.assign({}, state, {
                ...payload
            })
        case actionTypes.CLEAR_SINGER_DETAIL:
            return state = singerDetailState;
        default:
            return state;
    }
}


const mvDefaultState = {
    mvParams:{
        type:'1',
        year:0,
        tag:0,
        area:0
    },
    mvSortShow:false
}

export const mvState = (state = mvDefaultState, action = {}) => {
    let { type, payload } = action;
    switch (type) {
        case actionTypes.SET_MV_PAMRAS:
            return Object.assign({}, state, {
                mvParams: {
                    ...state.mvParams,
                    ...payload.mvParams
                }
            })
        case actionTypes.SET_MV_SORT:
            return Object.assign({},state,{
                mvSortShow:payload.show
            })
        default:
            return state;
    }
}