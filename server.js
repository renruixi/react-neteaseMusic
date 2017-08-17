var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');
var axios = require('axios')
    //代理服务器
var proxy = [{
    path: '/*/*', //必须得有一个文件地址，如果顶层文件夹名字不同，则用/*代替
    target: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    host: 'https://m.y.qq.com',
    secure: false
}];
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    progress: true,
    stats: {
        colors: true,
    },
    proxy:{
        // '/api/getRank':{
        //     target: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
        //     changeOrigin: true,
        //     secure: false,
        //     ignorePath: true,
        // }
    }
});




//将其他路由，全部返回index.html
server.app.get('*', function(req, res,next) {
    res.sendFile(__dirname + '/index.html')
});
// server.app.get('/api/getRank', function(req, res) {
//     console.log(2222)
//     var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
//     axios.get(url, {
//         headers: {
//             referer: 'https://m.y.qq.com',
//             origin: 'https://m.y.qq.com'
//         },
//         params: req.query
//     }).then((response) => {
//         res.json(response.data)
//     }).catch((e) => {
//         console.log(e)
//     })
// })
server.listen(8088, function() {
    console.log('正常打开8088端口')
});