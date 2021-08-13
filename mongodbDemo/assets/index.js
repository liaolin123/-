const koaBody=require('koa-body')
// 此处还需要判断文件夹是否存在，不存在的话就创建

module.exports=(app)=>{
    app.use(koaBody({
        multipart: true,
        encoding: 'utf-8',
        multipart:true,
        formidable:{
            // uploadDir: uploadDir,
            keepExtensions: true,
            maxFieldsSize: 5*1024*1024*1024,
            onFileBegin:(name, file)=>{
                // console.log(name,file);
            }
        }
    }))
}