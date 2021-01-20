const express = require('express');
const router = express.Router()
const users = require('../mongodb/model/model');//拿用户文档
const md5 = require('md5');//md5加密
router.use(express.urlencoded({ extended: true }))//配置post body解析器

router.post('/register', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')//允许跨域
  const { username, password, nickname } = req.body//解构赋值拿用户信息
  await users.create({
    username,
    password: md5(password),
    nickname
  })

  res.redirect('http://localhost:5000/log/registerSucess.html')
})
router.post('/login', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')//允许跨域
  const { username, password } = req.body//解构赋值拿用户信息
  const userInfo = await users.findOne({ username, password: md5(password) })//查找数据库信息,判断是否查无此人,密码为md5加密之后的
  console.log(userInfo)
  if (userInfo) {
    const { nickname } = userInfo//结构赋值拿到nickname,准备传入到index
    req.session.uid = userInfo._id//在重定向到主页前自动加密
    res.redirect('http://localhost:5000/index.html?nickname=' + nickname)//登录成功,重定向到主页,url传递nickname
  } else {
    res.redirect('http://localhost:5000/log/loginFail.html')
  }
})

router.get('/index', async (req, res) => {
  // const { username } = req.query//下面有cookie就不用写了

  // 接收cookie的信息,如果有指定的信息,认为之前登陆过了,直接渲染即可
  const { uid } = req.session
  if (uid) {
    // 表示之前登陆过
    // 去数据库中根据id查找当前用户数据,动态渲染用户名
    const nickname = await model.findOne({ _id: uid }, { nickname: 1 })
    res.redirect('http://localhost:5000/index.html?nickname=' + nickname)
  } else {
    //表示之前没有登录
    res.redirect('http://localhost:5000/login')
  }

})

module.exports = router

