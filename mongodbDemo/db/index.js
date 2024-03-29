const mongoose=require('./db.js')

const Schema=mongoose.Schema

const ceshiSchema=new Schema({
    title:String,
    body:String,
    date:Date
})

const MyModel=mongoose.model('ceshi',ceshiSchema)

class Mongodb{
    constructor(){
    }
    // 查询
    query(){
        return new Promise((resolve,reject)=>{
            MyModel.find({},(err,res)=>{
                if(err) reject(err)
                resolve(res)
            })
        })
    }
    // 保存
    save(obj){
        const m=new MyModel(obj)
        return new Promise((reslove,reject)=>{
            m.save((err,res)=>{
                if(err) reject(err)
                reslove(res)
            })
        })
    }
}

module.exports = new Mongodb() 