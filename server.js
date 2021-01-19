; (async function () {
  const express = require('express');
  const db = require('./mongodb/db/db');//链接数据库返回的promise
  const users = require('./mongodb/model/model');//拿到创建的model(users),准备搞事情
  const logicRouter = require('./routers/logicRouter');//搞一个逻辑路由试试
  const uiRouter = require('./routers/uiRouter');//拿uiRouter,只负责登录和注册
  try {
    await db//先等待逻辑router返回
    const app = express()//开启express app
    app.use(express.static('public'))//配置静态服务器文件夹
    //----------------------------------
    app.use(logicRouter)//使用logicRouter
    app.use(uiRouter)//使用uiRouter
    //-----------------------------------
    app.listen(5000, (err) => {//开启服务器
      if (err) console.log('(╥╯^╰╥)启动失败)', err)
      else console.log('(～￣▽￣)～启动成功啦')
    })

  } catch (error) {
    console.log('(╥╯^╰╥))启动失败啦', error)
  }
})()