import { getLyric } from 'api/api'
// import { Base64 } from 'js-base64'

class Singer {
    constructor(options) {
        this.id = options.id || options.singer_mid;
        this.name = options.name || options.singer_name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.id}.jpg?max_age=2592000`
    }
}

export function createSinger(singer) {
    return new Singer({
        ...singer
    })
}


class Album {
    constructor(options) {
        this.id = options.albumID;
        this.mid = options.albumMID;
        this.title = options.albumName;
        this.image = options.albumPic;
        this.publicTime = options.publicTime;
        this.singer = options.singerName;
        this.singerId = options.singerID;
        this.singerMid = options.singerMID
    }
}

class AlbumDetail {
    constructor(options) {
        this.id = options.id || options.singer_id;
        this.mid = options.mid || options.singer_mid;
        this.title = options.name || options.singer_name || options.dissname;
        this.singer = options.singername || options.singer_name || options.nickname;
        this.publicTime = options.aDate;
        this.totalSong = options.total || options.total_song_num;
        this.desc = options.desc;
        this.color = Number(options.color).toString(16);
        this.visitnum = options.visitnum;
        this.image = options.logo || options.image || `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.mid}.jpg?max_age=2592000`;
    }
}

class MV {
    constructor(options) {
        this.id = options.docid || options.mv_id;
        this.mid = options.mv_id || options.vid;
        this.title = options.mv_name || options.mvtitle;
        this.image = options.mv_pic_url || options.picurl;
        this.duration = options.duration;
        this.singer = options.singer_name || options.singername;
        this.singerId = options.singerid;
        this.singerMid = options.singerMID || options.singermid;
        this.playCount = options.play_count || options.listennum
    }
}





class Song {
    constructor(options) {
        this.id = options.id || options.songid
        this.mid = (options.album && options.album.mid) || options.mid || options.albummid;
        this.singer = this.filterSinger(options.singer)
        this.title = options.title || options.songname || options.name;
        this.subtitle = options.subtitle || options.albumname;
        this.album = options.album || options.albumname;
        this.image = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.mid}.jpg?max_age=2592000`,
            this.url = `http://ws.stream.qqmusic.qq.com/${this.id}.m4a?fromtag=46`
        this.mv = options.mv;
        this.interval = options.interval;
    }

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }
        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === "0") {
                    //this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
    filterSinger(singer) {
        let ret = []
        if (!singer) {
            return ''
        }
        singer.forEach((s) => {
            ret.push(s.name)
        })
        return ret.join('/')
    }
}
export function createSong(musicData) {
    return new Song({
        ...musicData
    })
}

export function createAlbumDetail(albumData) {
    return new AlbumDetail({
        ...albumData
    })
}


export function createAlbum(albumData) {
    return new Album({
        ...albumData
    })
}



export function createMV(mvData) {
    return new MV({
        ...mvData
    })
}





export default {
    createSong,
    createAlbum,
    createMV
}