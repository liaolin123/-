<template>
  <div class="list"  v-if="listes.length" >
      <div class="list_item" v-for="item in listes" :key="item.uid">
          <div>{{item.name}}</div>
          <div class="list_item_one">
              <Progress :val="item.percent"></Progress>
          </div>
          
      </div>
  </div>
</template>

<script>
import Progress from '@/components/Progress'//上传进度条
export default {
    name:'list',
    props:{
        listes:{
            type:Array,
            default:[]
        }
    },
    components:{
        Progress
    },
    data(){
        return {

        }
    },
}
</script>

<style>
.list_item{
    width: 100%;
    height: 40px;
    background: cornsilk;
    margin-bottom: 10px;
    margin-top: 10px;
    position: relative;
}


</style>