import jsonp from 'common/js/jsonp'
import axios from 'axios'

export const commonParams = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    _: new Date().getTime()
}

export const options = {
    param: 'jsonpCallback'
}

export const ERR_OK = 0



export function getRecommend(fetch) {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return fetch(url, data, options, 'recommend')
}

export function getSingerList(fetch) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    return fetch(url, data, options, 'singerList')
}

export function getRank(fetch) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    const data = Object.assign({}, commonParams, {
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    })
    return fetch(url, data, options, 'rankList')
}

export function getMVList(params={},fetch) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/getmv_by_tag'
    const data = Object.assign({}, commonParams, {
        loginUin: 0,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        utf8: 1,
        type: params.type || 1,
        year: params.year || 0,
        area: params.area || 0,
        tag: params.tag || 0,
        pageno: 0,
        pagecount: 20,
        otype: 'json',
        taglist: 1
    })
    return fetch(url, data, options,'mvList')
}

export function getHotSearch(fetch) {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

    const data = Object.assign({}, commonParams, {
        uin: 0,
        needNewCode: 1,
        platform: 'h5'
    })
    return fetch(url, data, options, 'hotSearch')
}

export function getSearch({
    query,
    page = 1,
    zhida = true,
    perpage = 20,
    t = 0
}) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp'
        // 搜索专辑 t=8   单曲t=0  mv  t=12
    const data = Object.assign({}, commonParams, {
        remoteplace: 'txt.yqq.center',
        searchid: 36113420836317130,
        t: t,
        aggr: 1,
        cr: 1,
        catZhida: zhida ? 1 : 0,
        lossless: 0,
        flag_qc: 0,
        w: query,
        p: page,
        n: perpage,
        g_tk: 291161219,
        flag: 1,
        aggr: 0,
        uin: 0,
        loginUin: 0,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        new_json: 1,
        qqmusic_ver: 1298
    })

    return jsonp(url, data, options)
}

// 获取专辑详情
export function getAlbumDetail({
    albumId,
    fetch
}) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg'

    const data = Object.assign({}, commonParams, {
        albummid: albumId,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    })

    return fetch(url, data, options, 'albumDetail')
}

// 获取歌手详情
export function getSingerSongs(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
        singermid: singerId
    })

    return jsonp(url, data, options)
}

// 获取歌曲歌词
export function getLyric(songmid) {
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    const data = Object.assign({}, commonParams, {
        pcachetime: new Date().getTime(),
        songmid: songmid,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    })

    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: data
    }).then((response) => {
        new Promise().resolve(response.data)
    }).catch((e) => {
        console.log(e)
    })

    //   const options = {
    //     name: 'MusicJsonCallback_lrc'
    //   }

    //   return jsonp(url, data, options)
}

// 获取歌手专辑列表
export function getSingerAlbum(singermid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_album.fcg'

    const data = Object.assign({}, commonParams, {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: singermid,
        order: 'time',
        begin: 0,
        num: 30,
        exstatus: 1
    })

    return jsonp(url, data, options)
}

// 获取歌手MV列表
export function getSingerMV(singermid) {
    const url = 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg'

    const data = Object.assign({}, commonParams, {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        singermid: singermid,
        order: 'listen',
        begin: 0,
        num: 52,
        cid: 205360581,
    })

    return jsonp(url, data, options)
}

// 获取歌单详情
export function getSongSheet({
    disstid,
    fetch
}) {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'

    const data = Object.assign({}, commonParams, {
        g_tk: 101015950,
        uin: 759996524,
        format: 'jsonp',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        new_format: 0,
        pic: 500,
        disstid: disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        nosign: 1,
        _: 1502722692890
    })
    const options = {
        name: 'taogeDataCallback'
    }

    return fetch(url, data, options, 'albumDetail')
}

// 获取电台列表
export function getRadioList(fetch) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg'

    const data = Object.assign({}, commonParams, {
        channel: 'radio',
        format: 'jsonp',
        page: 'index',
        tpl: 'wk',
        new: 1,
        p: Math.random().toFixed(16),
        g_tk: 101015950,
        loginUin: 759996524,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    })

    return fetch(url, data, options, 'radioList')
}


export const getSongSheetList = ({
    categoryId = 10000000,
    fetch
}) => {
    const url = '/api/getSongSheetList';
    const data = Object.assign({}, commonParams, {
        rnd: Math.random().toFixed(16),
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        categoryId: categoryId,
        sortId: 5,
        sin: 0,
        ein: 29,
    })
    return fetch(url, data, 'songSheetList')
}