
1.redux工作原理
store:数据状态
reducer:操作方法
active:对象

2.创建数据状态文件、改变状态方法文件、常量文件、返回状态文件
改变状态文件：<!-- count_reducer.js -->
初始化状态文件：<!--store.js-->
常量文件：<!--count_const.js-->
返回状态文件：<!--count_active.js-->

<!-- yarn add redux -->
3.创建store
<!-- 引入redux创建store方法 -->
import {createStore} from  'redux'
<!-- 引入改变状态文件 -->
import countReducer from  './count_reducer.js' <!--这里引入默认暴露的文件--->
<!-- 创建并暴露store -->
export default createStore(countReducer)

3.1.常量文件的编写
<!-- 导出常量 -->
export const INCREMENT='increMent'

export const DECREMENT='decreMent'

export const INCREMENTIFADD='increMentIfAdd' 

export const INCREMENTASYNCADD='incrementAsyncAdd'


3.2.返回状态文件的编写
<!-- 引入常量文件 -->
import {INCREMENT,
    DECREMENT,
    INCREMENTIFADD,
    INCREMENTASYNCADD}from './count_const.js'
<!-- 导出状态 -->
export const increment=(data)=>({type:INCREMENT,data})

export const decreMent=(data)=>({type:DECREMENT,data})

export const increMentIfAdd=(data)=>({type:INCREMENTIFADD,data})

export const incrementAsyncAdd=(data)=>({type:INCREMENTASYNCADD,data})




4.改变状态文件编写
<!-- 引入常量 -->
import {INCREMENT,DECREMENT,INCREMENTIFADD,INCREMENTASYNCADD}from './count_const.js'

<!--初始化默认状态-->
let initStore=0 
<!-- preStore:store当前的状态  active:要改变的状态 -->
export default function countReducer（preStore=initStore,active）{
    <!-- type: 方法 , data:改变成的数据 -->
    const {type,data}=active
    switch(type){
        case INCREMENT:
        <!-- 返回最终的状态结果 -->
            return preState+data
        case DECREMENT:
            return preState-data
        case INCREMENTIFADD:
            return preState-data
        case INCREMENTASYNCADD:
            return preState+data
        default:
            return preState
    }
}


5.使用Store的数据
<!-- 引入常量 -->
import {increment,decreMent,incrementAsyncAdd,increMentIfAdd} from '../../redux/count_active.js'

<!-- 引入初始化的Store数据 -->
import store from '../../redux/store'
<!-- 获取数据的api -->
store.getState()

6.dispatch的使用
<!-- 引入初始化的Store数据 -->
import store from '../../redux/store'
<!-- 设置数据 -->
let value=2
store.dispatch(increment(value))


异步store
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

7.dispatch后数据不改变问题
<!-- 原因：dispatch后数据改变Lee但页面没有渲染出来是因为react不知道
数据发生了改变  所以这里要通知react发生了改变
 -->
 store.subscribe()
 <!-- subscribe在订阅后通知react数据发生了改变，这里有两种方法 -->
 <!-- 1：在生命周期中调用,有一个缺陷就是在所有用到store的地方都要调用 -->
 componentDidMount(){
     store.subscribe(()=>{
         this.setState({})
     })
 }
 <!-- 2:在初始化react的时候调用 index.js文件中 -->
 store.subscribe(()=>{
     ReactDom.render(<App/>,document.getElementById('root'))
 })

加入react-redux

yarn add react-redux
容器组件：ui组件的父组件,收集store的状态和操作dispatch方法
UI组件：只显示状态内容，不操作redux

<!-- 引入react-redux 的合并方法 -->
import {connect} from 'react-redux'

<!-- 引入react核心库 -->
import React,{Component} from 'react'

<!-- 引入active方法 -->
export const incrementAsyncAdd=(data)=>({type:INCREMENTASYNCADD,data})

<!-- 定义UI组件 -->
Class CountUI extends Component{
    console.log('接收store属性和方法',this.props)
    redder(){
        return(
            <div>count</div>
        )
    }
}

<!-- 映射状态 -->
const mapStateToProps=(state)=>({count:state})

<!-- 映射dispatch方法 -->
const mapDispatchToProps=(dispatch)=>({
    one:(data)=>{
        dispatch(incrementAsyncAdd(data))
    }
})

<!-- 使用connect()()创建并暴露一个count的容器组件 -->
<!-- 默认渲染容器组件 -->
export default connect(mapStateToProps,mapDisPatchToProps)(CountUI)

provider的使用

在index.js文件里
import Store from './store'
<!-- 自动分发状态 这里舍弃store.subscribe()方法 -->
import {Provider} from ‘react-redux’

ReactDom.render(
    <Provider stort={store}>
            <App/>
    </Provider>,document.getElementById('root')
)




