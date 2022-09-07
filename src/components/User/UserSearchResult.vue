<template>
  <div class="wrapper">
    <div class="infoBar">
        <div class="userInfo">
            <div class="userNameBar" @click="checkUser(userId)">
                {{userName}}
            </div>
            <div class="userInStitutionBar">
                {{userInstitution}}
            </div>
            <div class="userEmailBar">
                {{userEmail}}
            </div>
        </div>    
        <div class="imgHead" @click="checkUser(userId)">
            <el-avatar shape="circle" :size="70" :src="imgHead" ></el-avatar>
        </div> 
    </div>
    <div class="fucBar">
        <el-button v-show="follow==true" @click="unfollowUser(userId)" class="button" style="color: rgb(0,202,186)" type="text">Following</el-button>
        <el-button v-show="follow==false" @click="followUser(userId)" class="button" type="text">Follow</el-button>
        <el-button @click="msgTo = userName; sendMsgFormVisable=true;" class="button" type="text">Message</el-button>
    </div>
    <message-send
      :sendMsgFormVisable = 'sendMsgFormVisable'
      :msgTo= 'msgTo'
      @cansel="canselMsgSend()"
      @confirm="confirmMsgSend()"
    ></message-send>
  </div>
</template>

<script>
import MessageSend from '@/components/User/MessageSend.vue'
export default {
    name: "UserSearchResult",
    props: ["userId", "userName", "userInstitution", "userEmail", "follow"],
    components:{
      MessageSend
    },
    data(){
        return{
            imgHead: require("../../assets/images/Question/head.png"),
            sendMsgFormVisable: false,
            msgTo:'' ,
        }
    },
    methods:{
      //查看主页
      checkUser(userId){
        this.$router.push({
          path: '/userinfo',
          query:{
            userId: userId
          }
        })
      },
      //关注用户
      async followUser(userToFollowId){
        let followParam={
          userId: sessionStorage.getItem("userId"),
          userToFollowId: userToFollowId,
        }
        const {data:res} = await this.$http.post("/account/followUser",followParam);
        if(res.code == '200'){        
          this.$message({
            message: 'Successfully Followed',
            type: 'success'
          });
          this.$emit('ReSearch');
        }
        else
          this.$message.error(res.msg);
      },
      //取消关注
      async unfollowUser(userToUnfollowId){
        let unfollowParam={
          userId: sessionStorage.getItem("userId"),
          userToUnfollowId: userToUnfollowId,
        }
        const {data:res} = await this.$http.post("/account/unfollowUser",unfollowParam);
        if(res.code == '200'){        
          this.$message({
            message: 'Successfully unFollowed',
            type: 'success'
          });
          this.$emit('ReSearch');
        }
        else
          this.$message.error(res.msg);
      },
      canselMsgSend(){
        this.sendMsgFormVisable = false
      },
      confirmMsgSend(){
        this.sendMsgFormVisable = false   
      }
    }
}
</script>

<style scoped>
.wrapper{
    background-color: #fff;
    border-bottom: solid 1px lightgrey;
}
.infoBar{
    padding: 4%;
    display: flex;
}
.imgHead{
    margin-left: auto;
}
.imgHead:hover{
    cursor: pointer;
}
.userNameBar{
    font-family: 'Times New Roman', Times, serif;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    border-bottom: 1px solid gray;
}
.userNameBar:hover{
    cursor: pointer;
}
.userInfo{
    text-align: left;
}
.userInStitutionBar{
    color: gray;
    font-style: italic;
    margin-bottom: 2px;
}
.userEmailBar{
    color: gray;
    font-style: italic;
}
.fucBar{
    padding: 0 4%;
    display: flex;
}
.button{
    margin-right: 20px;
    font-family: sans-serif;
}
</style>