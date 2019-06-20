const express = require('express')
const app = express()
// 渲染vue
const Vue = require('vue')
const path = require('path') //保持路径的严谨
const fs = require('fs')
// 将vue实例转换为html字符串的对象，并传入文档的头部，组合成完整的文档模型
const vueServerRender = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(path.join(__dirname, './index.html'),'utf-8') //这个参数就是模板
})
//创建一个vue实例，放在这里每次访问都是同一个vue实例
// 每次请求应该都创建一个新的实例，虽然这样会浪费内存，但是可以使用缓存机制
// const vueApp = new Vue({
//     data: {
//         message: 'hello, vue-ssr',
//         url: req.url
//     },
//     template: `
//         <div>
//             <h1>ssr学习</h1>
//             <p>{{message}}</p>
//             <p>您访问的路径是{{url}}</p>
//         </div>
//     `
// })
// 后端路由
app.get('*', async (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html;charset=utf-8;');
    // 每次请求应该都创建一个新的实例，虽然这样会浪费内存，但是可以使用缓存机制
    /**
     * 如何将打印出来的路径，也就是客户端访问的路径交给前端的vue-router来管理呢？
     * 这就需要用到webpack的配置了
     */
    // 这段代码单独放到app.js中
    // const vueApp = new Vue({
    //     data: {
    //         message: 'hello, vue-ssr',
    //         url: req.url
    //     },
    //     template: `
    //         <div>
    //             <h1>ssr学习</h1>
    //             <p>{{message}}</p>
    //             <p>您访问的路径是:   {{url}}</p>
    //         </div>
    //     `
    // })

    const App = require('./src/entry-server')
    let app1 = await App({url: req.url})

    // 向前端发送，将vue实例转换为html字符串
    vueServerRender.renderToString(app1).then((html) => {
        console.log(html)
        // 发送完整的html结构
        res.end(html)
    }).catch(err => console.log(err))
})

app.listen(4000, () => {
    console.log('启动成功')
})