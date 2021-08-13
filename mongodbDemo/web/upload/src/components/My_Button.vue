<template>
  <button class="my_button" type="button" @click="_button">{{name}}</button>
</template>

<script>
 
export default {
    name:'my_button',
    props:{
        name: { 
          type: String,
          default: '点击上传文件' 
          }
      },
    methods:{
      _button(){

      }
    },
    mounted(){
      
    }

}
</script>

<style>

</style>