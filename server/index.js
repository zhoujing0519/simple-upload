const config = require('./config')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

app.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`)
})

app.use((req, res, next) => {
  const {
    allowedOrigin,
    credentials,
    headers,
    allowedMethods,
  } = config.cors

  res.header('Access-Control-Allow-Origin', allowedOrigin)
  res.header('Access-Control-Allow-Credentials', credentials)
  res.header('Access-Control-Allow-Headers', headers)
  res.header('Access-Control-Allow-Methods', allowedMethods)

  req.method === 'OPTIONS' ? res.send('Current server support cross domain request.') : next()
})

app.use(bodyParser.urlencoded({
  extended: false,
  limit: '1024mb',
}))

const uploadDir = path.resolve(__dirname, '', 'upload')

app.post('/single', (req, res) => {
  new multiparty.Form().parse(req, (err, fields, file) => {
    if(err) return res.send({ code: 500, msg: err })

    const [chunk] = file.chunk // 服务器临时目录
    const [filename] = fields.filename
    const chunkDir = `${uploadDir}/${filename}`

    const readStream = fs.createReadStream(chunk.path) // 读取临时目录文件的读取流
    const writeStream = fs.createWriteStream(chunkDir) // 创建对应存储路径的写入流

    readStream.pipe(writeStream) // 将读到的流写到写入流里
    readStream.on('end', () => fs.unlinkSync(chunk.path)) // 将临时存储的文件给删除掉

    res.send({
      code: 200,
      msg: '',
      data: `http://127.0.0.1:${config.port}/upload/${filename}`
    })
  })
})