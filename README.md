# ssr
基于express框架的服务端渲染
#开启使用
1、npm install
2、node index.js
3、浏览器访问localhost:4000/
#总结一下
1、先开启一个express服务
    创建一个express实例，然后设置路由，最后监听某个端口
2、要使用vue的服务端渲染，需要引入vue, vue-server-renderer模块
    vue-server-renderer模块是为了将vue模板转化为html字符串，然后通过createRenderer({})
    方法创建一个对象vueServerRender，再使用该对象vueServerRender的renderToString（vue实例）
    方法（enderToString（vue实例）返回一个promise对象），将vue实例转化为html字符串
3、最后将该vue实例形成的模板发送到客户端
