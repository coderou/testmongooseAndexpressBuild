const mongoose = require('mongoose');

const Schema = mongoose.Schema//来一个Schema约束的构造函数
const schema = new Schema({//实例化搞一个schema走起
  username: {//用户名
    type: String,
    required: true,
    unique: true
  },
  password: {//密码
    type: String,
    required: true
  },
  nickname: {//昵称
    type: String,
    default: '你还没有昵称ε=(´ο｀*)))'
  },
  createDate: {//创建日期
    type: Date,
    default: Date.now()
  },
  enable: {//用户是否启用
    type: String,
    default: 'Y'
  }
}, { collection: 'users' })

module.exports = schema//导出这个约束
