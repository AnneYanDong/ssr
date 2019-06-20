//收回页面的跳转控制权，不使用多页应用
// 也就是如何将客户端的代码与服务端返回的页面进行混合？
// 需要使用webpack配置
// 统一通过app.js入口，然后分别进入enter-client.js、entry-server.js,再通过webpack进行打包，
// 生成两个对应的server-bundle,client-bunble
// 而server-bundle生成服务端页面，client-bundle再去混合node端生成的html，最后挂载到某一个节点上
const createApp = require('./app')
let {app, router} = createApp()
router.onReady(() => {
    app.$mount('#app')
})