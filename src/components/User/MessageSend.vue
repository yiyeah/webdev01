<template>
  <el-dialog title="Send Message" 
    :visible.sync="sendMsgFormVisable" 
    :close-on-click-modal=false
    :before-close="canselMsg"
    >
      <el-form :model="sendMsgForm">
        <el-form-item class="inputdeep" label="To:">
          <el-input v-model="sendMsgForm.msgTo" ></el-input>
        </el-form-item>
        <el-form-item class="inputdeep" label="Subject:">
          <el-input v-model="sendMsgForm.msgSubject"></el-input>
        </el-form-item>
        <el-form-item class="inputdeep" label="Content:">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 12}" placeholder="请输入内容" v-model="sendMsgForm.msgContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button plain style="color: rgb(0,204,187);" @click="canselMsg()">cansel</el-button>
        <el-button style="background-color: rgb(0,204,187);" type="primary" @click="sendMsg()">send</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
    name:"messageSend",
    props:["sendMsgFormVisable","msgTo"],
    data(){
        return{
            sendMsgForm:{
                msgTo: this.msgTo,
                msgSubject:"",
                msgContent:"",
            },
        }
    },
    methods:{
        objClear(obj){
            for(let key in obj){
                obj[key]= ''
            }
            this.sendMsgForm.msgTo = this.msgTo
        },
        //发送消息
        async sendMsg(){
            let sendMsgParam = {
                userId: sessionStorage.getItem("userId"),
                sendMsgForm: this.sendMsgForm
            }
            const {data:res} = await this.$http.post("/account/sendMsgById",sendMsgParam);
            if(res.code == '200'){         
            this.$message({
                message: 'Successfully Sent',
                type: 'success'
            });
            //清除表单
            this.objClear(this.sendMsgForm);
            this.$emit("confirm");
            }      
            else
                this.$message.error(res.msg);
        },
        //取消发送
        canselMsg(){
            this.objClear(this.sendMsgForm);
            this.$emit("cansel");
        }
    },
    watch:{
        msgTo:{
            handler(newVal){
                this.sendMsgForm.msgTo = newVal
            }
        }
    }
}
</script>

<style>

</style>