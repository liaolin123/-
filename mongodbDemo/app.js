const Koa = require('koa')
const ModelDb = require('./db/index.js')
const config =require('./config/index.js')
const serve = require('koa-static')
const router = require('./route/index.js')
const cors=require('koa2-cors')
const upload = require('./assets/index.js')

const app = new Koa()
upload( app )
app.use(serve('./public'))

app.use(cors())

app.use(router.routes()).use(router.allowedMethods())
app.listen(config.port,()=>{
    console.log('服务器启动了 http://127.0.0.1:3000');
})
