<template>
    <div>
      <Navbar></Navbar>
      <div class="noticeBar">
          <b>Notifications</b>
      </div>
      <div class="selectMenu">
          <div style="margin-left: 15vw;">
              <span class="selectMenu_item" @click="$router.push('/notification')">Updates</span>
              <span class="selectMenu_item item_active" @click="$router.push('/message')">Messages</span>
          </div>
      </div>
      <div class="contentWrapper">
          <div class="leftContent">
            <div class="subject"><i></i>subject: <span style="color: black;">{{this.msgBox.msgSubject}}</span></div>      
            <div v-for="(item,index) in this.msgBox.msgList" :key="index" class="msgBox">
                <div>
                   <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar> 
                </div>
                <div style="width:100%;">
                    <div class="headinfo">
                        <div class="msgFrom">{{item.msgFrom}}</div>
                        <div class="msgDate">{{item.msgDate}}</div>
                    </div>
                    <div class="msgBody">
                        {{item.msgContent}}
                    </div> 
                </div>                   
            </div>
            <div class="sendBar">
                <div class="sendwrap">
                    <span>
                        <el-avatar shape="square" :size="70" :src="squareUrl"></el-avatar> 
                    </span>
                    <span class="sendInput">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 8, maxRows: 14}"
                            placeholder="请输入内容"
                            v-model="msgContent">
                        </el-input>
                    </span>                  
                </div>
                <el-button style="width: 30vw;" type="primary" @click="sendMsg()">send</el-button>
            </div>
          </div>
          <div class="rightContent">

          </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue'
  export default {
      components:{
          Navbar
      },
      created: function(){
        this.getDialog();
      },
      data(){
          return{
            squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
            activeSelect: 0,
            msgContent:"",
            msgBox:{
                msgSubject: "",
                msgList:[
                  // {
                  //   msgFrom: "LiuZy",
                  //   msgContent: "go to school go to school go to schoolgo to schoolgo to schoolgo to schoolgo to schoolgo to schoolgo to school",
                  //   msgDate: "2022/8/30"
                  // },
                  // {
                  //   msgFrom: "Wzh",
                  //   msgContent: "hhhhhh",
                  //   msgDate: "2022/8/30"
                  // },
                  // {
                  //   msgFrom: "Wzh",
                  //   msgContent: "hhhhhh",
                  //   msgDate: "2022/8/30"
                  // },            
              ]
            }
            
          }
      },
      methods:{
        async getDialog(){
          let getDialogParam = {
            userId: sessionStorage.getItem("userId"),
            msgTo: this.$route.query.msgPartner,
            msgSubject: this.$route.query.msgSubject
          }
          const {data:res} = await this.$http.post("/account/getDialog",getDialogParam);
          if(res.code == 200)
            this.msgBox = res.data.msgBox;
          else{
            this.$message.error(res.msg);
          }
        },
        //发送消息
        async sendMsg(){
        let sendMsgParam = {
          userId: sessionStorage.getItem("userId"),
          sendMsgForm: {
            msgTo: this.$route.query.msgPartner,
            msgSubject: this.$route.query.msgSubject,
            msgContent: this.msgContent
          }
        }
        const {data:res} = await this.$http.post("/account/sendMsgById",sendMsgParam);
        if(res.code == '200'){
          this.getDialog();        
          this.$message({
            message: 'Successfully Sent',
            type: 'success'
          });
          this.msgContent = ''
        }      
        else
          this.$message.error(res.msg);
      },
      }
  }
  </script>
  
  <style scoped>
  .noticeBar{
      position: relative;
      width: 70vw;
      left: 15vw;
      color: grey;
      border-bottom: 2px solid #eeeeee;
      padding: 30px 10px;
      font-size: 24px;
      text-align: left;
  }
  .selectMenu{
      padding: 25px 10px;
      border-bottom: 2px solid #eeeeee;
      color:grey;
      text-align: left;
  }
  .selectMenu_item{
      padding: 25px 0px;
      margin: 0 30px;
      cursor: pointer;
  }
  .selectMenu_item:hover {
      color:black;
      border-bottom: 2px solid grey;
  }
  .item_active{
      border-bottom: 2px solid  rgb(0,204,187);
  }
  .contentWrapper{
      display: flex;
  }
  .leftContent{
      width: 60vw;
      border-right: 2px solid #eeeeee ;
      min-height: 50vh;
  }
  .subject{
    font-size: 20px;
    color:gray;
    text-align: left;
    margin-left: 10vw;
    padding: 20px 0;
  }
  .msgBox{
    margin-left: 10vw;
    padding-bottom: 30px;
    text-align: left;
    display: flex;
  }
  .msgFrom{
    margin-left: 20px;
    font-size: 14px;
    font-weight: 700;
  }
  .msgDate{
    margin-left: auto;
    margin-right: 2vw;
    color:grey;
    font-style: italic;
  }
  .headinfo{
    height: 20px;
    display: flex;
    background-color: #eeeeee;
  }
  .msgBody{
    margin: 10px 20px 10px 20px;
    word-break: break-all;
  }
  .sendBar{
    position: relative;
    margin-left: 7vw;
    background-color: #eeeeee;
    min-height: 40vh;
  }
  .sendwrap{
    padding: 20px 40px;
    display: flex;
  }
  .sendInput{
    margin-left: 15px;
    width: 40vw;
  }
  </style>