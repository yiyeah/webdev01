<template>
  <div>
    <Navbar></Navbar>
    <div class="noticeBar">
        <b>Notifications</b>
    </div>
    <div class="selectMenu">
        <div style="margin-left: 15vw;">
            <span class="selectMenu_item" @click="$router.push('/notification')">Updates</span>
            <span class="selectMenu_item item_active">Messages</span>
        </div>
    </div>
    <div class="contentWrapper">
        <div class="leftContent">
          <div @click="checkDialog(item)" v-for="(item,index) in this.msgGroupList" :key="index" class="msgBox">
            <el-avatar shape="square" :size="50" :src="squareUrl"></el-avatar>
            <span class="msgInfo">
                <div style="font-size: 18px; ">{{item.msgPartner}}</div>
                <div>subject: {{item.msgSubject}}</div>
                <div><i class="el-icon-chat-line-round"></i> {{item.msgLast}}</div>
            </span>
            <div class="msgDate">{{item.msgDate}}</div>
          </div>
        </div>
        <div class="rightContent">
          <div class="utilsContent">
            <el-button @click="sendMsgFormVisable=true" type="primary" style="background-color: rgb(0,204,187); width: 30vw; margin-bottom: 20px;">Send Message</el-button>
            <div @click="selectInbox()" class="utilsItems"><i :class="activeSelect==0 ? 'el-icon-arrow-right':'el-icon-minus'"></i> Inbox</div>
            <div @click="selectSent()" class="utilsItems"><i :class="activeSelect==1 ? 'el-icon-arrow-right':'el-icon-minus'"></i> Already Sent</div>
          </div>
        </div>
    </div>
    <message-send
      :sendMsgFormVisable = sendMsgFormVisable
      :msgTo="''"
      @cansel="canselMsgSend()"
      @confirm="confirmMsgSend()"
    ></message-send>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import MessageSend from '@/components/User/MessageSend.vue'
export default {
    components:{
        Navbar,
        MessageSend
    },
    created: function(){
      this.getMsgGroup();
    },
    data(){
        return{
          squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
          activeSelect: 0,
          msgGroupList:[
                // {
                //   msgPartner: "lihua",
                //   msgSubject: "wiwi",
                //   msgLast: "go to school go to school go to schoolgo to schoolgo to schoolgo to schoolgo to schoolgo to schoolgo to school",
                //   msgDate: "2022/8/30"
                // },
                // {
                //   msgPartner: "liuMing",
                //   msgSubject: "laugh",
                //   msgLast: "hahahhhhhhh",
                //   msgDate: "2022/9/3"
                // }
            ],
          sendMsgFormVisable: false, 
        }
    },
    methods:{ 
      //收件箱
      selectInbox(){
        this.activeSelect = 0;
        this.getMsgGroup();
      },
      //已发送
      selectSent(){
        this.activeSelect = 1;
        this.getMsgSentGroup();
      },
      //用户参与的消息组
      async getMsgGroup(){
        let getMsgParam = {
          userId: sessionStorage.getItem("userId"),
        }
        const {data:res} = await this.$http.post("/account/getMsgGroupById",getMsgParam);
        if(res.code == '200')
          this.msgGroupList = res.data.msgGroupList;
        else
          this.$message.error(res.msg);
      },
      //用户已发送的消息组
      async getMsgSentGroup(){
        let getMsgParam = {
          userId: sessionStorage.getItem("userId"),
        }
        const {data:res} = await this.$http.post("/account/getMsgSentGroupById",getMsgParam);
        if(res.code == '200')
          this.msgGroupList = res.data.msgGroupList;
        else
          this.$message.error(res.msg);
      },
      //查看对话
      checkDialog(msgGroup){
          this.$router.push({
            path:'/dialog',
            query:{
              msgPartner: msgGroup.msgPartner,
              msgSubject: msgGroup.msgSubject
            }
          })
      },
      canselMsgSend(){
        this.sendMsgFormVisable = false
      },
      confirmMsgSend(){
        if(this.activeSelect == 0){
            this.getMsgGroup()
            }   
        else if(this.activeSelect == 1){
            this.getMsgSentGroup()
        }
        this.sendMsgFormVisable = false   
      }
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
.msgBox{
    margin-left: 10vw;
    padding: 15px 0;
    border-bottom: 2px solid #eeeeee ;
    text-align: left;
    display: flex;
}
.msgBox:hover {
    background-color: #eeeeee;
    cursor: pointer;
}
.msgInfo{
  margin-left: 20px;
}
.msgInfo div{
  width: 35vw;
  color: gray;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
}
.msgDate{
  margin-left: auto;
  margin-right: 2vw;
  color:grey;
  font-size: 14px;
  font-style: italic;
}
.rightContent{
  margin-left: 5vw;
}
.utilsContent{
  margin: 20px 0;
  text-align: left;
}
.utilsItems{
  padding: 10px 0;
  color: gray;
  border-bottom: 2px solid #eeeeee ;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif ;
}
.utilsItems:hover{
  cursor: pointer;
  background-color: #eeeeee;
}
.inputdeep>>>.el-input__inner:focus {
      border: rgb(0,204,187) 2px solid;
      border-radius: 0;
}
.inputdeep>>>.el-textarea__inner:focus {
      border: rgb(0,204,187) 2px solid;
      border-radius: 0;
}
</style>