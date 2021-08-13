<template>
  <div class="progress">
      <div ref="inner" class="inner"></div>
  </div>
</template>

<script>
export default {
    name:"pro",
    props:{
        val:{
            type:Number,
            default:0
        }
    },
    watch:{
        val:{
            handler (val) {
                this.$nextTick(() => {
                    this.$refs.inner.style.width = val + '%';
                });
            },
            immediate: true
        }
    },
}
</script>

<style>
.progress{
    width: 100%;
    height: 20px;
    padding: 5px 0 ;
    box-sizing: border-box;
}
.inner{
    background: #a6e22e;
    height: 10px;
    width: 0;
    border-radius: 5px;
}
</style>