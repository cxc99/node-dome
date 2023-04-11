const { jwt, jwtKey, app, axios, db, express } = require('./app.js')
const multer = require('multer') // 文件上传插件

const fs = require('fs')

const path = require('path')
app.use('/resource', express.static(path.join(__dirname, '/resource')))

const storageFile = multer.diskStorage({
  //设置上传后文件路径
  destination: (req, file, cb) => {
    // 要将文件保存到哪个文件夹下面
    const folderName = (req.query.folderName || 'temp').trim()
    // 保存的目录路径
    const savePath = `./resource/${folderName}`
    // 判断目录路径是否存在，不存在就创建一个目录
    const isExists = fs.existsSync(savePath)
    if (!isExists) {
      fs.mkdir(savePath, function (err) {
        if (err) {
          cb(null, `./resource/temp`)
        } else {
          cb(null, savePath)
        }
      })
    } else {
      cb(null, savePath)
    }
  },
  //给上传文件重命名
  filename: (req, file, cb) => {
    const fileFormat = file.originalname.split('.')
    const newFileName = Date.now() + '.' + fileFormat[fileFormat.length - 1]
    cb(null, newFileName)
  },
})

const Upload = app.post(
  '/upload',
  multer({ storage: storageFile }).array('file'),
  (req, res, next) => {
    const fileInfo = req.files[0]
    if (!fileInfo) {
      return res.json({
        fail: true,
        msg: '文件上传失败',
      })
    }

    return res.json({
      code: 200,
      msg: '文件上传成功',
      data: {
        originalName: Buffer.from(fileInfo.originalname, 'latin1').toString(
          'utf8'
        ),
        fileSize: fileInfo.size,
        filePath: '/' + fileInfo.path.replace(/\\/g, '/'),
      },
    })
  }
)

module.exports = {
  Upload,
}
