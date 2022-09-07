<template>
  <div class="ProfileWrapper">
    <div class="leftside">
          <div class="introduction">
            <div class="introcard">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>About me</span>
                    <el-button v-show="$parent.userId == $parent.userInfo.userId" style="float: right; padding: 3px 0; color: rgb(0,204,187);" type="text" @click="editFormVisible=true">edit</el-button>
                  </div>
                  <div class="introtext">
                    {{$parent.userInfo.introduction}}
                  </div>
                </el-card>
            </div>
          </div>
          <div class="introduction">
            <div class="introcard">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>Achievement</span>
                  </div>
                  <div class="introtext">
                    Achievements
                  </div>
                </el-card>
            </div>
          </div>
        </div>
        <div class="followings">
          <div class="followingcard">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>followings</span>
                </div>
                <div class="followingwrap">
                  <div v-for="(item,index) in followingList" :key="index" class="followingbox">
                    <span><i class="el-icon-s-custom" style="font-size: 60px; color: grey;"></i></span>
                    <span style="margin-left: 30px;">
                      <div class="followingUsername">{{item.userName}}</div>
                      <div class="followingInstitution">{{item.userInstitution}}</div>
                      <div class="followingInstitution">{{item.userEmail}}</div>
                    </span>
                    <span style="margin-left: auto;"> 
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                <i class="el-icon-more"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="msgTo = item.userName; sendMsgFormVisable=true;">send message</el-dropdown-item>
                                <el-dropdown-item @click.native="unfollowUser(item.userId)">unfollow</el-dropdown-item>
                                <el-dropdown-item @click.native="$router.push('/userinfo/profile?userId='+item.userId)">check userInfo</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                  </div>
                </div>
              </el-card>
          </div>
        </div>
        <el-dialog title="edit introduction" :visible.sync="editFormVisible">
            <el-input v-model="inputIntroduction" autocomplete="off"></el-input>
        <div slot="footer" class="dialog-footer">
            <el-button plain style="color: rgb(0,204,187);" @click="canselEditIntro">cansel</el-button>
            <el-button style="background-color: rgb(0,204,187);" type="primary" @click="confirmEditIntro">confirm</el-button>
        </div>
        </el-dialog>
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
    components:{
        MessageSend
    },
    created(){
        // setTimeout(getintro(),500);
        this.getFollow();
    },
    data(){
        return{
            editFormVisible: false,
            inputIntroduction: '',
            followingList: [
            {
                userId: 1,
                userName: "Yeqi Gao",
                userInstitution: "BUAA",
                userEmail: "123@buaa.edu.cn",
                follow: true,

            },
            {
                userId: 7,
                userName: "liuzy",
                userInstitution: "BUAA",
                userEmail: "72@buaa.edu.cn",
                follow: true,
            },
            {
                userId: 9,
                userName: "wzh",
                userInstitution: "BUAA",
                userEmail: "wzh@buaa.edu.cn",
                follow: true,
            }
            ],
            sendMsgFormVisable: false,
            msgTo: '',
        }
    },
    methods:{
        getintro(){
            this.inputIntroduction = this.$parent.userInfo.introduction;
        },
        canselEditIntro(){
            this.getintro();
            this.editFormVisible = false;
        },
        async confirmEditIntro(){
            let editForm = {
                userId: this.$parent.userId,
                introduction: this.inputIntroduction
            }
            const {data:res} = await this.$http.post("/account/editIntroduction",editForm);
            if(res.code==200){
                await this.$parent.checkUser();
                this.getintro();
                this.editFormVisible = false;
            }
            else
                this.$message.error(res.msg); 
        },
        //得到正在关注
        async getFollow(){
            let getFollowParam={
                userId: this.$parent.userId,
            }
            const {data:res} = await this.$http.post("/account/getFollowingUser",getFollowParam);
            console.log(res);
            if(res.code==200){
                this.followingList=res.data.followingList
            }
            else
                this.$message.error(res.msg); 
        },
        //取消关注
        async unfollowUser(userToUnfollowId){
            let unfollowParam={
                userId: this.$parent.userId,
                userToUnfollowId: userToUnfollowId,
            }
            console.log("profile"+unfollowParam)
            const {data:res} = await this.$http.post("/account/unfollowUser",unfollowParam);
            if(res.code == '200'){        
            this.$message({
                message: 'Successfully unFollowed',
                type: 'success'
            });
            this.getFollow();
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
.ProfileWrapper{
    display: flex;
}
.introduction{
  width: 70vw;
  display: flex;
  justify-content: center;
}
.introtext{
  width: 90%;
  padding: 20px;
  word-break: break-all;
  color:gray;
  font-style: italic;
}
.followings{
  width: 30vw;
}
.introcard {
  width: 60vw;
  text-align: left;
  margin-bottom: 20px;
}
.followingcard{
  width: 25vw;
  min-height: 40vh;
  text-align: left;
}
.followingbox{
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid grey;
}
.followingUsername{
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
  margin-bottom: 5px;
}
.followingInstitution{
  color:grey;
  font-size: 14px;
}
</style>