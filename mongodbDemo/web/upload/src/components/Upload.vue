<template>
  <div class="my_upload">
      <input class="my_upload_input"
        :multiple="multiple"
        type="file"
        ref="input"
        @change="_onInputChange">
      <div class="my_upload_tigger"  @click="_onClickTrigger">
          <slot></slot>
          <Drager v-if="drag" @handleFiles="_uploadFiles"></Drager>
      </div>
       <UploadList solt="list" :listes="files"></UploadList>
  </div>
</template>

<script>
import XLSX from 'xlsx';
import request from './tool/Xhr.js'
import { noop } from './tool/entries.js';
import Drager from './Drager'
import UploadList from '@/components/UploadList'
import {s} from './tool/i.js'
export default {
    name:'upload',
    components:{
        Drager,UploadList
    },
    props:{
        name:{
            type:String,
            default:'file'
        },
        action:{
            type:String,
            required:true
        },
        onChange: { type: Function, default: noop },
        onSuccess: { type: Function, default: noop },
        onError: { type: Function, default: noop },
        onProgress: { type: Function, default: noop },
        onExceed: { type: Function, default: noop },
        beforeUpload: { type: Function },
        data: { type: Object, default: () => ({}) },
        customHttpRequest: { type: Function, default: request },
        multiple: { type: Boolean, default: false },
        drag:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            files: [],
            fileList:[],
            tempIndex:0,//上传文件唯一标识
            reqs:{}
        }

    },
    watch: {
        fileList:{
            handler(newVal){
                this.files=newVal.map((file,index)=>{
                    file.uid=file.uid ||new Date()+ this.tempIndex++
                    file.status=file.status ||'success'
                    return file
                })
            },
            immediate:true
        }
    },
    methods:{
        _handleUpload(file) {//读取上传的xlcx文件
            let that = this;
            var reader = new FileReader();
            reader.readAsBinaryString(file);
            reader.onload = function (evt) {
            var data = evt.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            }) // 以二进制流方式读取得到整份excel表格对象
            }
            reader.onload = function (evt) {
            //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
            try {
                var data = evt.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                }), // 以二进制流方式读取得到整份excel表格对象
                buildings = []; // 存储获取到的数据
                var fromTo = '';
                // 遍历每张表读取
                for (var sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        fromTo = workbook.Sheets[sheet]['!ref'];
                        buildings = buildings.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    }
                }
                console.log('----',buildings) // 文件内容
            } catch (e) {
                console.log('文件类型不正确', e);
                return;
            }
            }
            return false;
        },
        handleUpload(blob) {//读取上传文件
            // 新建一个FileReader
            const reader = new FileReader()
            // 读取文件
            reader.readAsArrayBuffer(blob, "UTF-8")
            // 读取完文件之后会回来这里
            reader.onload = function (e) {
                // 读取文件内容
                const fileString = this.result
                // // 接下来可对文件内容进行处理
                // const myData = JSON.parse(fileString);
                console.log(fileString) // 打印读取到的内容
            }
        },
        _onClickTrigger(){
            this.$refs.input.click();
        },
        _onInputChange(e){
            let rawFiles=Array.from(e.target.files)
            this._uploadFiles(rawFiles)
        },
        _uploadFiles (rawFiles) {
            const filesLen = rawFiles.length + this.files.length;
            if (this.limit && this.limit < filesLen) {
                return this.onExceed(rawFiles, this.files);
            }
            this._startUpload(rawFiles);
        },
        _startUpload (rawFiles) {
            rawFiles.forEach(rawFile => {
                const file = this._normalizeFiles(rawFile);
                if (!this.beforeUpload || this.beforeUpload()) {
                    this._upload(file);
                }
            });
        },
        _upload (file) {
            const { uid } = file;
            const options = {
                url: this.action,
                name: this.name,
                file: this.base64toFile(s),
                data: this.data,
                onSuccess: this.handleSuccess.bind(this, file),
                onError: this.handleError.bind(this, file),
                onProgress: this.handleProgress.bind(this, file)
            };
            file.status = 'pending';
            this.onChange(file, this.files);
            console.log(this.base64toFile(s),options);
            const req = this.customHttpRequest(options);
            this.reqs[uid] = req;
            if (req instanceof Promise) {
                req.then(options.onSuccess, options.onError);
            }
        },
        base64toFile (dataurl, filename = 'file') {
            let arr = dataurl.split(',')
            let mime = arr[0].match(/:(.*?);/)[1]
            let suffix = mime.split('/')[1]
            let bstr = atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], `${filename}.${suffix}`, {
                type: mime
            })
        },
        _normalizeFiles (rawFile) {
            const file = {
                name: rawFile.name, // 文件名
                size: rawFile.size, // 文件尺寸
                type: rawFile.type, // 文件类型
                percent: 0, // 上传进度
                uid: Date.now() + this.tempIndex++, // 唯一标识
                status: 'init', // value list: init pending success failure
                raw: rawFile // 原生文件对象
            };
            // concat does not change the existing arrays, but instead returns a new array
            this.files.push(file);
            return file;
        },
        handleError (file, error) {
            const { uid } = file;
            delete this.reqs[uid];
            file.status = 'failure';
            this.onError(error, file, this.files);
        },
        handleSuccess (file, response) {
            const { uid } = file;
            delete this.reqs[uid];
            file.status = 'success';
            this.$set(file, 'response', response);
            // Not only front end can implement picture preview but also back end can do it. Here make use of back end api
            this.$set(file, 'url', response.data.path);
            this.onChange(file, this.files);
            this.onSuccess(response, file, this.files);
        },
        handleProgress (file, event) {
            file.percent = event.percent;
            this.onChange(file, this.files);
            this.onProgress(event, file, this.files);
        }
    }

}
</script>

<style>
    .my_upload_input{
        display: none;
    }
    
</style>