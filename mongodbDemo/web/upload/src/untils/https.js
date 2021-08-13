import axios from 'axios'; // 引入axios
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Toast } from 'vant'; 
import { Notify } from 'vant';

// 环境的切换
// if (process.env.NODE_ENV == 'development') {    
//     axios.defaults.baseURL = '';} 
// else if (process.env.NODE_ENV == 'debug') {    
    axios.defaults.baseURL = 'https://framers.ichengka.com';
// } 
// else if (process.env.NODE_ENV == 'production') {    
//     axios.defaults.baseURL = '';
// }
axios.defaults.timeout = 10000;//超时时间
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//请求头
// 请求拦截器
axios.interceptors.request.use(    
    config => {        
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        // const token = localStorage.getItem('token_driver')        
        token && (config.headers.common["token"] =' token');          
        return config;  
    },    
    error => {        
        return Promise.error(error);    
    }
)

// 响应拦截器
axios.interceptors.response.use( res=>{
    if(res.code==200){
        return Promise.resolve(res);
    }else{
        return Promise.resolve(res);
        
    }
},err=>{
    console.log(err);
})
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}
export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}