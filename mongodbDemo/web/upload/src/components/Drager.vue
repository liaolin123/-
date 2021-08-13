<template>
  <div class="draper" 
  @dragenter="_dragerCenter" 
  @dragover="_dragerOver" 
  @dragleave="_dragerLeave"
  @drop="_drap"
  >Drager</div>
</template>

<script>
export default {
    name:'draper',
    data(){
        return {
            dragging: false
        }
    },
    methods:{
        _dragerCenter(e){//拖拽到目标位置上
            this.dragging = true;
            e.stopPropagation();
            e.preventDefault();
        },
        _dragerOver(e){//拖拽元素到目标元素中
            this.dragging = false;
            e.stopPropagation();
            e.preventDefault();
        },
        _dragerLeave(e){//离开目标元素
            e.stopPropagation();
            e.preventDefault();
        },
        _drap(e){//拖放
            this.dragging = false;
            e.stopPropagation();
            e.preventDefault();
            const files = Array.from(e.dataTransfer.files);
            this.$emit('handleFiles', files);
        }
    }

}
</script>

<style>
    .draper{
        width: 100%;
        height: 200px;
        background: #ced4da;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>