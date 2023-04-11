const { jwt, jwtKey, app, axios, db } = require('./app.js')
const { Upload } = require('./upload.js')

// const multer = require('multer') // 文件上传插件
// const upload = multer({ dest: 'uploads/' })

// app.post('/upload ', upload.single('file'), (req, res, next) => {
//   res.json({ message: '123' })
// })

app.get('/search/users', async function (req, res) {
  const { q } = req.query

  try {
    const data = await axios({
      url: 'https://api.github.com/search/users',
      params: { q },
    })
    res.json(response.data)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

app.get('/userInfo', async (req, res) => {
  // get 请求获取参数
  try {
    const response = await axios.get(
      'https://shaoxin.star7.cn:9090/nrmm-applet-web/user/get/by/token',
      {}
    )

    res.json(response.data)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

app.get('/sheet', async (req, res) => {
  // get 请求获取参数
  const sqlStr = 'select * from Sheet1'
  db.query(sqlStr, (err, results /* 获取到的相应数据 **/) => {
    if (err) return err.message
    res.send(results) // 将查询结果响应给客户端
  })
})

app.post('/login', (req, res) => {
  const { username, password } = req.body

  const sqlStr = `SELECT * FROM login WHERE user_name='${username}' AND password='${password}'`

  db.query(sqlStr, (err, results /* 获取到的相应数据 **/) => {
    try {
      if (results.length == 0) return res.json({ message: '账号或密码错误' })
      const { user_name, password, user_id } = results[0]
      if (user_name == username && password == password) {
        jwt.sign(
          { username, password }, // 除了pwd
          jwtKey,
          (err, token) => {
            res.json({
              code: 200,
              username,
              message: '登陆成功...',
              userId: user_id,
              token,
            })
          }
        )
      } else {
        res.json({ message: '账号或密码错误' })
      }
    } catch (error) {
      return res.json()
    }
  })
})

app.listen(5000, 'localhost', (err) => {
  if (!err) {
    console.log('服务器启动成功')
    console.log('请求github真实数据请访问：http://localhost:5000/search/users')
    console.log('请求本地模拟数据请访问：http://localhost:5000/search/users2')
  } else console.log(err)
})
