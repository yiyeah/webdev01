<template>
  <div style="position: fixed; top: 0;z-index: 500;">
    <header class="headerTrans">
      <!--        <div class="headerBox">-->
      <router-link to="/">
        <div style=" color: green; position: fixed; height: 8vh;width: 8vh; left: 8vh; top: 0.8vh; z-index: 60">
          ResearchDoor
        </div>
      </router-link>
      <!--        <img :src="titleImg" alt=" " height="75px" style="position: fixed; height: 75px; left: 150px">-->

    </header>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "NavigatorMenu",
  components: {
  },
  data() {
    return {
      activeIndex: ref(this.$route.path),
      squareUrl: '',
      loginFormVisible: false,
      loginForm: {
        email: '',
        password: ''
      },
      registerFormVisible: false,
      registerForm: {
        institute: '',
        name: '',
        email: '',
        password: ''
      },
      formLabelWidth: '12vw',
      isremembered: false,
      identifyCodes: "1234567890abcd",
      identifyCode: "",
      searchContent: {},
      navColor: '#ffffff'
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    changeHeader() {
      var header = document.querySelector('header')
      // var headerBox = document.querySelector('.headerBox')
      if (window.pageYOffset >= 15) {
        header.className = 'changeWhite'
        this.icon = require('../assets/images/icon.svg')
        this.navColor = '#000000'
        // headerBox.className = 'headerBox1'
      } else {
        header.className = 'headerTrans'
        this.icon = require('../assets/images/iconwhite.svg')
        this.navColor = '#ffffff'

        // headerBox.className = 'headerBox'
      }
    },
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath)
    // },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
      }
      console.log(this.identifyCode);
    },
    sendCode() {
      ElMessage({
        showClose: true,
        message: '验证码发送成功',
        type: 'success',
      })
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    register() {
      //todo:注册
      ElMessage({
        showClose: true,
        message: '注册成功',
        type: 'success',
      })
    },
    callLogin() {
      if (!this.$store.isLogin) {
        this.loginFormVisible = true;
        this.refreshCode()
      }
    },
    login() {
      // todo:和后端交互
      ElMessage({
        showClose: true,
        message: '登录成功',
        type: 'success',
      })
      this.squareUrl = 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      this.$store.isLogin = true
    },
    logout() {
      this.$store.isLogin = false;
      this.squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
      ElMessage({
        showClose: true,
        message: '退出成功',
        type: 'success',
      })
      location.reload()
    }
  }
}
</script>

<style scoped>
.headerTrans * {
  background: transparent;
  transition: 1.5s;
  height: 10vh;
  border: none;
  color: white;
  z-index: 50;

  /*background: transparent;*/
}

.headerTrans {

}

.changeWhite {
  color: #131212;
  background: white;
  transition: 1.5s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: 10vh;
  position: fixed;
  z-index: 50;
}

.el-menu {
  position: fixed;
  width: 60vw;
  left: 10vw;
  z-index: 60;
  height: 10vh;
}

.el-menu1 > * {
  height: 10vh;
  line-height: 10vh;
  width: 10vw;
  font-size: 1.4vw;
}

</style>
<style lang="scss">
.radius-dialog {
  padding: 5px 15px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.9);
  //filter: blur(4px);
}

.md-input {
  background: none;
}

.el-menu1 * {
  text-align: center;
}
</style>
