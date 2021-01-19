const mongoose = require('mongoose');
const schema = require('../schema/schema');//导入约束

const users = mongoose.model('users', schema)//以改约束创建一个users文档,保存用户密码信息


module.exports = users
