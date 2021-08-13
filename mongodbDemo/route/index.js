const Router = require("koa-router");
const send = require('koa-send');
const path=require('path')
const config = require("../config/index.js");
const fs=require('fs')
const router = new Router();
 
router.get("/hello", async (ctx) => {
  ctx.body = "23213123";
  ctx.status = 200;
});
router.get("/", async (ctx) => {
  ctx.body = "hello,world";
  ctx.status = 200;
});

router.post("/upload", async (ctx) => {
  const file = ctx.request.files.file;//获取前台传过来的文件
  const reader = fs.createReadStream(file.path);//创建读写流
  let filePath=path.join(__dirname,'../assets/upload')//文件保存地址
  let fileResource = filePath + `/${file.name}`;
  if (!fs.existsSync(filePath)) {
    //判断staic/upload文件夹是否存在，如果不存在就新建一个
    fs.mkdir(filePath,{recursive:true}, (err) => {
      if (err) throw new Error(err);
      let upstream = fs.createWriteStream(fileResource);
      reader.pipe(upstream);//以管道流的方式写入文件
      ctx.response.body = {
          code:1,
          data:{
            path: filePath + `/${file.name}`,
         }
      };
    });
  } else {
    let upstream = fs.createWriteStream(fileResource);
    reader.pipe(upstream);
    ctx.response.body = {
      code:1,
      data:{
        path: filePath + `/${file.name}`,
     }
    };
  }
});
router.get('/fileload/:name', async (ctx) => {
  const name = ctx.params.name;
  const path = `assets/upload/${name}`;
  ctx.attachment(path);
  await send(ctx, path);
});

module.exports = router;
