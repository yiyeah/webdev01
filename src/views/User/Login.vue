<template>
  <div class="login" id="login">
      <a href="javascript:;" class="log-close"><i class="icons close"></i></a>
      <div class="log-bg">
          <div class="log-cloud cloud1"></div>
          <div class="log-cloud cloud2"></div>
          <div class="log-cloud cloud3"></div>
          <div class="log-cloud cloud4"></div>

          <div class="log-logo">Welcome!</div>
          <div class="log-text">@ResearchDoor</div>
      </div>
      <!-- 登录 -->
      <div v-show="islogin" class="log-email">
          <input type="text" placeholder="Institution Email" :class="'log-input' + (userName==''?' log-input-empty':'')" v-model="userEmail">
          <input type="password" placeholder="Password" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
          <a href="javascript:;" class="log-btn" @click="login">Login</a>
          <a href="javascript:;" style= "color: grey;"  @click='islogin=false; isregister = true;'>Register Now</a>
      </div>
      <!-- 注册 -->
      <div v-show="isregister" class="log-email">
          <input type="text" placeholder="Institution Email" :class="'log-input' + (userEmail==''?' log-input-empty':'')" v-model="userEmail">
          <input type="text" placeholder="Your name" :class="'log-input' + (userName==''?' log-input-empty':'')" v-model="userName">
          <input type="password" placeholder="Password" :class="'log-input' + (password==''?' log-input-empty':'')"  v-model="password">
          <a href="javascript:;" class="log-btn" @click="register">Register</a>
          <a href="javascript:;" style= "color: grey;"  @click='islogin=true; isregister = false;'>Login Now</a>
      </div>
      <Loading v-if="isLoging" marginTop="-30%"></Loading>
  </div>
</template>

<script>
import Loading from './Loading.vue'
export default {
  name: 'Login',
  data(){
  	return {
      islogin: true,
      isregister: false,
      isLoging: false,
  		userName: '',
  		password: '',
      userEmail:''
  	}
  },
  components:{
    Loading
  },
  methods:{
  	login(){
  		if(this.userEmail!='' && this.password!=''){
  			this.toLogin();
  		}
      else{
        this.$message.error('输入账号信息不完整');
      }
  	},

    register(){
      if(this.userName!='' && this.password!=''&&this.userEmail!=''){
        this.toregister();
      }
      else{
        this.$message.error('输入账号信息不完整');
      }
    },

  	async toLogin(){
  		let loginParam = {
  			userEmail: this.userEmail,
        password: this.password
  		}
      this.isLoging = true;
      const {data:res} = await this.$http.post("/account/logUser",loginParam);
      if(res.code == 200){
        sessionStorage.setItem("userId", res.data.userId);
        sessionStorage.setItem("userName", res.data.userName);
        sessionStorage.setItem("userEmail", res.data.userEmail);
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        this.$router.push({
          path:'/userinfo/profile',
          query:{
            userId: res.data.userId
          }
        });
      }
      else{
        this.$message.error('登录失败');
      }
      this.isLoging = false;
  	},

    async toregister(){
      let registerParam = {
  			userName: this.userName,
        password: this.password,
        userEmail: this.userEmail
  		}
      this.isLoging = true;
      const {data:res} = await this.$http.post("/account/addUser",registerParam);
      if(res.code == 200){
        this.$message({
          message: '注册成功',
          type: 'success'
        });
      }
      else{
        this.$message.error('注册失败');
      }
      this.isLoging = false;
    }
  }
}
</script>

<style scoped>
.login{
  position: relative;
  width: 500px; 
  height: 650px;
  left: 50%;  top: 50%;
  margin-left: -250px; margin-top: -325px;
  z-index: 10; 
  background: #fff;
  border-radius: 5px;
  box-shadow:  0px 3px 16px -5px #070707
}
.log-close{display: block; position: absolute; top:12px; right: 12px; opacity: 1;}
.log-close:hover .icons{transform: rotate(180deg);}
.log-close .icons{opacity: 1; transition: all .3s}
.log-cloud{background-image: url(../../assets/images/User/login-cloud.png); width: 63px ;height: 40px; position: absolute; z-index: 1}
.login .cloud1{top:21px; left: -30px; transform: scale(.6); animation: cloud1 20s linear infinite;}
.login .cloud2{top:87px; right: 20px; animation: cloud2 19s linear infinite;}
.login .cloud3{top:160px; left: 5px;transform: scale(.8);animation: cloud3 21s linear infinite;}
.login .cloud4{top:150px; left: -40px;transform: scale(.4);animation: cloud4 19s linear infinite;}
.log-bg{background: url(../../assets/images/User/login-bg.jpg); width: 100%; height: 312px; overflow: hidden;}
.log-logo{height: 80px; margin: 120px auto 25px; text-align: center; color: #1fcab3; font-weight: bold; font-size: 40px;}
.log-text{color: #57d4c3; font-size: 13px; text-align: center; margin: 0 auto;}
.log-logo,.log-text{z-index: 2}
.icons{background:url(../../assets/images/User/icons.png) no-repeat; display: inline-block;}
.close{height:16px;width:16px;background-position:-13px 0;}
.login-email{height:17px;width:29px;background-position:-117px 0;}

.log-btns{padding: 15px 0; margin: 0 auto;}
.log-btn{
  width:402px; 
  display: block; 
  text-align: left; 
  line-height: 50px;
  margin:0 auto 15px; 
  height:50px; color:#fff; 
  font-size:13px;
  -webkit-border-radius: 5px; 
  background-color: #3B5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}
.log-btn.tw{background-color: #13B4E9}
.log-btn.email{background-color: #50E3CE}
.log-btn:hover,.log-btn:focus{color: #fff; opacity: .8;}

.log-email{text-align: center; margin-top: 20px;}
.log-email .log-btn{background-color: #50E3CE;text-align: center;}
.log-input-empty{border: 1px solid #f37474 !important;}
.isloading{background: #d6d6d6}
.log-btn .icons{margin-left: 30px; vertical-align: middle;}
.log-btn .text{left: 95px; line-height: 50px; text-align: left; position: absolute;}
.log-input{width: 370px;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; -webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px;}
.log-input.warn{border: 1px solid #f88787}

@-webkit-keyframes cloud1 {  
    0%{left: 200px}  
    100%{left:-130px;} 
}
@keyframes cloud1{
    0%{left: 200px}  
    100%{left:-130px;} 
}

@-webkit-keyframes cloud2 {  
    0%{left:500px;}  
    100%{left:-90px;} 
}
@keyframes cloud2{
    0%{left:500px;}  
    100%{left:-90px;} 
}

@-webkit-keyframes cloud3 {  
    0%{left:620px;}  
    100%{left:-70px;} 
}
@keyframes cloud3{
    0%{left:620px;}  
    100%{left:-70px;} 
}@-webkit-keyframes cloud4 {  
    0%{left:100px;}  
    100%{left:-70px;} 
}
@keyframes cloud4{
    0%{left:100px;}  
    100%{left:-70px;} 
}
</style>