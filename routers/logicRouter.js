const express = require('express');
const router = express.Router()//让我们搞一个路由,专门用于跳转主页
let arr = [
  { name: '张飞', gender: '男', info: '粗中有细', },
  { name: '关羽', gender: '男', info: '讲义气', },
  { name: '刘备', gender: '男', info: '编草鞋创业起家', },
  { name: '貂蝉', gender: '女', info: '喜欢吕布', },
  { name: '项羽', gender: '女', info: '辅助/坦克', },
]
router.get('/test', (req, res) => {
  const { callback } = req.query
  const arrStr = JSON.stringify(arr)
  res.send(`${callback}(${arrStr})`)
})
module.exports = router
