import jsonp from 'common/js/jsonp'
import * as actionTypes from '../Action/actionTypes'
import * as api from 'api/api'

const options = {
    param: 'jsonpCallback'
}

const ERR_OK = '0'

// 获取首页推荐数据
export const getRecommend = () => api.getRecommend(getJsonpData)

// 获取歌手列表数据
export const getSingerList = () => api.getSingerList(getJsonpData)

// 获取排行榜上数据
export const getRank = () => api.getRank(getJsonpData)

// 获取电台数据
export const getRadioList = () => api.getRadioList(getJsonpData)

// 获取电台数据
export const getMVList = () => api.getMVList(getJsonpData)

// 获取热门搜索数据
export const getHotSearch = () => api.getHotSearch(getJsonpData)

//获取歌手详情数据
export const getSingerDetail = ({ singerId }) => api.getSingerDetail({ singerId, fetch: getJsonpData })

//获取专辑详情数据
export const getAlbumDetail = ({ albumId }) => api.getAlbumDetail({ albumId, fetch: getJsonpData })
//获取歌单详情数据
export const getSongSheet = ({ disstid }) => api.getSongSheet({ disstid, fetch: getJsonDataV2 })

//获取歌手专辑
export const getSingerAlbum = (singermid) => api.getSingerAlbum({ singermid, fetch: getJsonpData })


export const setSearchState = (data)=>{
    return {
        type:actionTypes.SET_SEARCH_STATE,
        payload:{
            ...data
        }
    }
}

export const clearSearchState = ()=>{
    return {
        type:actionTypes.CLEAR_SEARCH_STATE,
    }
}

//设置歌手详情
export const setSinger = (singer) => {
    return {
        type: actionTypes.SET_SINGER,
        payload: {
            singer: singer
        }
    }
}

//清空歌手详情
export const delSinger = () => {
    return { type: actionTypes.DELETE_SINGER }
}

// 开始获取数据
const requestStart = (data, id) => {
    return {
        type: actionTypes.REQUEST_START,
        payload: {
            data: null,
            id: id
        }
    }
}

// 获取数据成功
const requestEnd = (data, id) => {
    return {
        type: actionTypes.REQUEST_END,
        payload: {
            data: data,
            id: id
        }
    }
}

const requestSuccess = (data, id) => {
    return {
        type: actionTypes.REQUEST_SUCCESS,
        payload: {
            data: data,
            id: id
        }
    }
}


export const deleStore = (id) => {
    return {
        type: actionTypes.DELE_STORE,
        payload: {
            id: id
        }
    }
}

// 页面初次渲染时获取数据
export const getJsonpData = (url, data, options, id) => {
    return (dispatch) => {
        dispatch(requestStart(null, id))
        return jsonp(url, data, options).then((res) => {
            if (res.code == '0') {
                dispatch(requestSuccess(res.data, id))
            } else {
                console.log('status', res.code)
            }
        }).catch(error => console.log(error))
    }
}

export const getJsonDataV2 = (url, data, options, id) => {
    return (dispatch) => {
        dispatch(requestStart(null, id))
        return jsonp(url, data, options).then((res) => {
            if (res.code == '0') {
                dispatch(requestSuccess(res, id))
            } else {
                console.log('status', res.subcode)
            }
        }).catch(error => console.log(error))
    }
}

export const setScrollPos = (data, id) => {
    return {
        type: actionTypes.SET_SCROLL_POS,
        payload: {
            data: data,
            id: id
        }
    }
}

//设置播放器播放状态
export const setPlayingState = (data) => {
        return {
            type: actionTypes.SET_PLAYING_STATE,
            payload: {
                ...data
            }
        }
    }
    //设置播放器播放模式
export const setPlayerMode = (data) => {
        return {
            type: actionTypes.SET_PLAYER_MODE,
            payload: {
                ...data
            }
        }
    }
    //设置播放模式
export const setPlayMode = (data) => {
        return {
            type: actionTypes.SET_PLAY_MODE,
            payload: {
                ...data
            }
        }
    }
    //设置播放器当前播放歌曲
export const setCurrentSong = (data) => {
        return {
            type: actionTypes.SET_CURRENTSONG,
            payload: {
                currentSong: data.currentSong,
                currentIndex: data.currentIndex
            }
        }
    }
    //增加播放列表
export const setPlayList = (data) => {
        return {
            type: actionTypes.SET_PLAYLIST,
            payload: {
                playList: data
            }
        }
    }
    //删除某播放列表
export const delPlayList = (data) => {
    return {
        type: actionTypes.DEL_PLAYLIST,
        payload: {
            ...data
        }
    }
}