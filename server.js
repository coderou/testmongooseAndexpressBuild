; (async function () {
  const express = require('express');
  const db = require('./mongodb/db/db');//链接数据库返回的promise
  const logicRouter = require('./routers/logicRouter');//搞一个逻辑路由试试
  const uiRouter = require('./routers/uiRouter');//拿uiRouter,只负责登录和注册
  const cookieParser = require('cookie-parser');//配置cookie中间件
  const session = require('express-session');//引入express操作session的包
  const MongoStore = require('connect-mongo')(session);//说明require connect-mongo的时候返回是一个函数,所以传递参数直接调用
  try {
    await db//先等待逻辑router返回
    const app = express()//开启express app
    app.use(express.static('public'))//配置静态服务器文件夹
    app.use(cookieParser())//调用cookieParser
    //----------------------------------
    app.use(
      session({
        name: 'userid', //设置cookie的键，默认值是：connect.sid
        secret: 'coderou', //参与加密的字符串（又称签名）
        saveUninitialized: false, //是否在存储内容之前创建会话
        resave: true, //是否在每次请求时，强制重新保存session，即使他们没有变化
        store: new MongoStore({
          url: 'mongodb://localhost:27017/sessions_container',
          touchAfter: 24 * 3600, //修改频率（例：//在24小时之内只更新一次）
        }),
        cookie: {
          httpOnly: true, // 开启后前端无法通过 JS 操作cookie
          maxAge: 1000 * 60 * 60, // 设置cookie的过期时间(1小时)
        },
      })
    )
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