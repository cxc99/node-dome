const mysql = require('mysql')
// 2. 建立与 MySQL 数据库的连接关系
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: 'qweqwe123', // 登录数据库的密码
  database: 'mysql', // 指定要操作哪个数据库
})

const express = require('express')
const axios = require('axios')
const app = express() //
const bodyParser = require('body-parser') // 接受post请求的body

const jwt = require('jsonwebtoken') // token 生成
const jwtKey = process.env.TOKEN_KEY || 'token'

app.use(bodyParser.json()) // 接受post请求 参数用  req.body

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

module.exports = {
  db,
  app,
  jwt,
  jwtKey,
  axios,
  express,
}
