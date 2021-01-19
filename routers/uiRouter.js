const express = require('express');
const router = express.Router()
const users = require('../mongodb/model/model');//拿用户文档
router.use(express.urlencoded({ extended: true }))//配置post body解析器
router.post('/register', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')//允许跨域
  const { username, password, nickname } = req.body//解构赋值拿用户信息
  await users.create({ username, password, nickname })
  res.redirect('http://localhost:5000/log/registerSucess.html')
})
router.post('/login', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')//允许跨域
  const { username, password } = req.body//解构赋值拿用户信息
  const isItOk = await users.findOne({ username, password })//查找数据库信息,判断是否查无此人
  if (isItOk) {
    res.redirect('http://localhost:5000/index.html')//登录成功,重定向到主页
  } else {
    res.redirect('http://localhost:5000/log/loginFail.html')
  }
})

module.exports = router

