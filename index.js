const express = require('express')
const app = express()
// 渲染vue
const Vue = require('vue')
const path = require('path')
const fs = require('fs')
const vueServerRender = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync(path.join(__dirname, './index.html'),'utf-8')
})

//创建一个vue实例
const vueApp = new Vue({
    data: {
        message: 'hello, vue-ssr'
    },
    template: `
        <div>
            <h1>ssr学习</h1>
            <p>{{message}}</p>
        </div>
    `
})

app.get('*', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/html;charset=utf-8;');

    vueServerRender.renderToString(vueApp).then((html) => {
        console.log(html)
        // 发送完整的html结构
        res.end(html)
    }).catch(err => console.log(err))
})

app.listen(4000, () => {
    console.log('启动成功')
})