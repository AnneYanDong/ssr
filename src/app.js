const Vue = require('vue')
const createRouter = require('./router')
//每次请求都要形成一个新的vue实例
module.exports = (context) => {
    // 将router注入到vue中
console.log('router = ', createRouter())
const router = createRouter()
    const app = new Vue({
        router,
        data: {
            message: 'hello, vue-ssr',
            url: context.url
        },
        template: `
            <div>
                <h1>ssr学习</h1>
                <ul>
                    <li><router-link to='/'>去首页</router-link></li>
                    <li><router-link to='/about'>关于我</router-link></li>
                </ul>
                <p>{{message}}</p>
                <p>您访问的路径是:   {{url}}</p>
                <router-view></router-view>
            </div>
        `
    })
    return {
        router,app
    }
}