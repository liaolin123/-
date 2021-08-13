<template>
  <div class="index">
      <Upload :action="action"
       :multiple="multiple"
       :drag="true"
       :onChange="_uploadChange"
       :onProgress="_handleProgress"
       :onSuccess="_uploadonSuccess"
       >
          <Mybutton types="primary"></Mybutton>
      </Upload>
      <div @click="downloadExcel">下载</div>
  </div>
</template>

<script>
import Upload from '@/components/Upload.vue'//上传组件
import Mybutton from '@/components/My_button.vue'//上传按钮
import Progress from '@/components/Progress'//上传进度条

export default {
    components:{
        Upload,
        Mybutton,
        Progress
    },
    data(){
        return{
            action:'http://localhost:3000/upload',
            fileList: [],//文件上传列表
            multiple:false,
            progre:0
        }
    },
    methods:{
      submitUpload() {
          console.log( this.$refs.upload);
        // this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        // console.log(file);
      },
      _uploadChange(e,v){
          this.fileList=e
      },
      _handleProgress(file,v){//上传进度
        this.progre=file.percent
      },
      _uploadonSuccess(file,res){//上传成功
        
      },
      downloadExcel(){
        let a = document.createElement('a')
        a.href ="http://localhost:3000/fileload/1.jpg"
        a.click();
      }
    }

}
</script>

<style>

</style>