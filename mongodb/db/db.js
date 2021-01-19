const mongoose = require('mongoose');
// const mongodb = require('mongodb');

module.exports = mongoose.connect('mongodb://localhost:27017/coderou',{ useNewUrlParser: true ,useUnifiedTopology: true})//链接数据库的同时导出这个异步promise

