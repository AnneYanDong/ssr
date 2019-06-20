// 服务端这边是需要把访问的路径给到vue-router的，不然匹配不到的
const createApp = require('./app.js')
console.log('456 = ', createApp)
// 给外面express服务使用
module.exports = (context) => {
    return new Promise((resolve,reject) => {
        let {router, app} = createApp(context)
        //控制权交给前端router
        router.push(context.url)
        // 异步请求
        router.onReady(() => {
            // 访问路径，有没有匹配到组建
            let matchedComponents = router.getMatchedComponents()
            console.log(matchedComponents)
            if(!matchedComponents.length) {
                return reject({code: 404})
            }
            resolve(app)
        },reject)
    })
}