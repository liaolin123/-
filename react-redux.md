yarn add react-redux

创建容器组件文件夹 containers
<!-- 引入ui组件  -->
import CountUI from '../components/count'
<!-- 引入connect链接UI组件和redux -->

<!-- 定义一个函数返回store状态函数 state形参是store里面的属性 -->
const mapStateToProps=(state)=>({count:state})


<!-- 定义一个函数返回dispatch操作方法 -->
const mapDisPatchToProps=(dispatch)=>({
        one:(number)=>{
            dispatch({type:'increment',data:number})
        }
    })

import {connect} from 'react-redux
<!-- 使用connect()()创建并暴露一个count的容器组件 -->
export default connect(mapStateToProps,mapDisPatchToProps)(CountUI)


provider的使用

在index.js文件里
import Store from './store'
<!-- 自动分发状态 -->
import {Provider} from ‘react-redux’

ReactDom.render(
    <Provider stort={store}>
            <App/>
    </Provider>,document.getElementById('root')
)