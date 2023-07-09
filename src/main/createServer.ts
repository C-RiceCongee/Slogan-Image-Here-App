import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import multer from 'koa-multer'
import path from 'path'
import cors from '@koa/cors'
export default function () {
  const app = new Koa()
  const router = new Router()
  // 使用koa2-cors中间件
  app.use(cors())
  // 配置koa-bodyparser中间件
  app.use(bodyParser())
  // 配置koa-multer中间件
  const upload = multer({
    dest: path.join(__dirname, '/uploads') // 文件保存的目录
  })
  // 处理文件上传的路由
  router.post('/upload', upload.array('files'), (ctx) => {
    const files = ctx.request.files // 获取上传的文件对象数组
    console.log(files)
    // 可以在这里对上传的文件进行处理或保存到数据库等操作
    ctx.body = { message: '文件上传成功' }
  })
  app.use(router.routes()).use(router.allowedMethods())
  // 启动服务器
  app.listen(3000, () => {
    console.log('服务器已启动，监听端口3000')
  })
}
