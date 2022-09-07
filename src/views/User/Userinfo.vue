<template>
  <div class="page" >
    <Navbar></Navbar>
    <div class="medium">
      <div class="intro">
        <span>
            <i class="el-icon-s-custom" style="font-size: 120px; color: grey;"></i>
        </span>
        <span class="userinfo">
           <div class="username">{{userInfo.userName}}</div>
           <div class="userinfo_item">Institution: {{userInfo.userInstitution}}</div>
           <div class="userinfo_item">Email: {{userInfo.userEmail}}</div>
        </span> 
        <span class="stastics">
          <div class="stastics_item">Citations: <span class="line">---------------------------------</span> {{userInfo.userCiteCnt}}</div>
          <div class="stastics_item">Followers: <span class="line">---------------------------------</span>{{userInfo.userFollowerCnt}}</div>
          <div class="stastics_item">Research Interest Score: <span class="line">------------------</span>{{userInfo.userScore}}</div>
        </span>
      </div>
      <div class="menuBar">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item @click="router('/userinfo/profile')" index="/userinfo/profile">Profile</el-menu-item>
          <el-menu-item @click="router('/userinfo/research')" index="/userinfo/research">Research</el-menu-item>
          <el-menu-item @click="router('/userinfo/following')" index="/userinfo/following">Following</el-menu-item>
        </el-menu>
        <el-button v-show="userId == userInfo.userId" style="margin-left: auto; background-color: rgb(0,204,187);" type="primary" @click="$router.push('/addAch')">
          <i class="el-icon-circle-plus-outline"></i>
          Add Reasearch
        </el-button>
      </div>
    </div>
      <div class="content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    components: {
      Navbar
    },
    created(){
      this.userId = sessionStorage.getItem("userId");
      this.checkUser() 
    },
    data () {
      return {
        //查看用户的用户信息
        userInfo:{
          // userId: 7,
          // userName: 'ww',
          // userInstitution: 'Bhu',
          // introduction: 'hhhh',
          // userEmail: 'awd@buaa.edu.cn',
          // userCiteCnt: '20',
          // userFollowerCnt:'32',
          // userScore:'24',
        },
        userId: '', //当前登录用户的userid,保存在Session中
        activeIndex: "/userinfo/profile",
      }
    },
    methods:{
      async checkUser(){
        let checkUserParam={
          userId: this.$route.query.userId
        }
        const {data:res} = await this.$http.post("/account/checkUserById",checkUserParam);
        console.log(res)
        if(res.code==200){
          this.userInfo = res.data.userInfo;
        }
        else{
          this.$message.error(res.msg);
        }
      },
      router(route){
        this.activeIndex = route;
        this.$router.push({
          path: route,
          query:{
            userId: this.userInfo.userId
          }
        })
      }
    },
    watch:{
      $route: {
        handler(newVal, oldVal) {
          //判断newVal有没有值监听路由变化
          if (newVal != oldVal) {
            location.reload()
          }
        },
        deep: true
      }
  },

}
</script>

<style scoped>
.page{
  min-height: 100vh;
}
.medium{
  
}
.intro{
  height: 35vh;
  margin: 0 13vw;
  display: flex;
  align-items: center;
}
.menuBar{
  margin: 0 13vw;
  border-top: 2px solid #eeeeee;
  display: flex;
  align-items: center;
}
.content{
  background-color: #eeeeee;
  min-height: 50vh;
}
.userinfo{
  margin: 20px;
  text-align: left;
  width: 30vw;
}
.username{
  font-family: 'Times New Roman', Times, serif;
  font-size: 28px;
  margin-bottom: 18px;
}
.userinfo_item{
  color: grey;
  margin-bottom: 5px;
  font-style: italic;
}

.stastics{
  margin-left: 5vw;
  text-align: left;
}
.stastics_item{
  font-family: 'Roboto",Arial,sans-serif';
  font-size: 14px;
  margin-bottom: 20px;
  color: #333;
}
.line{
  color:#eeeeee;
}
.content{
  padding-top: 30px;
}
</style>