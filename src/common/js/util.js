export function findSongIndex(list, index) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}

export function debounce(func, delay) {
    let timer

    return function() {
        let context = this;
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(context, arguments)
        }, delay)
    }
}