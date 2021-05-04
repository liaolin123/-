# -
最后的等待，叫未来可期

1.redux工作原理
store:
reducer:


2.创建数据状态文件和改变状态方法文件
改变状态文件：<!-- count_reducer.js -->
初始化状态文件：<!--store.js-->

<!-- yarn add redux -->
3.创建store
<!-- 引入redux创建store方法 -->
import {createStore} from  'redux'
<!-- 引入改变状态文件 -->
import countReducer from  './count_reducer.js' <!--这里引入默认暴露的文件--->
<!-- 创建并暴露store -->
export default createStore(countReducer)


4.改变状态文件编写
<!--初始化默认状态-->
let initStore=0 
<!-- preStore:store当前的状态  active:要改变的状态 -->
export default function countReducer（preStore=initStore,active）{
    <!-- type: 方法 , data:改变成的数据 -->
    const {type,data}=active
    switch(type){
        <!-- 匹配进入 -->
        case: 'add'：
        <!-- 代码块，最终返回改变后的数据 -->
        return preStore+data
        default:
        return preStore
    }
}


5.使用Store的数据
<!-- 引入初始化的Store数据 -->
import store from '../../redux/store'
<!-- 获取数据的api -->
store.getState()

6.dispatch的使用
<!-- 引入初始化的Store数据 -->
import store from '../../redux/store'
<!-- 设置数据 -->
let value=2
store.dispatch({type:'add',data:value})


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




