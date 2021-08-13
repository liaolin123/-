const path=require('path')
const hello = async (ctx) => {
    ctx.body = '23213123'
    ctx.status = 200;
}

const index = async (ctx)=>{
    ctx.body='hello world'
    ctx.status=200
}

module.exports = {
    '/hello': hello,
    '/':index,
    '/upload':upload
}