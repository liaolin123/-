1.异步redux
1.1yarn add redux-thunk
1.2配置到store中
<!-- import {createStore ,appleMiddleware} from 'redux' -->
<!-- import thunk from 'redux-thunk' -->
<!-- import countReducer from './countReducer.js -->
<!-- 允许使用异步   接到异步操作就不走reducer等待异步读秒结束 然后store通知reducer执行相应的操作会给异步函数传入dispatch函数 -->
<!-- export default createStore(countReducer,appleMiddleware(thunk)) -->
export const appasync=(data)=>{
    return (dispath)=>{
        dispath('要操作的函数(data)')
    }
}