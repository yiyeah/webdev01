<template>
  <div>
    <Navbar></Navbar>
    <div class="main-panel">
      <el-container>
        <el-header>
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            router
            style="margin-top:10px">
              <el-menu-item index="/addAch">期刊论文</el-menu-item>
              <el-menu-item index="/addAch/patent">专利</el-menu-item>
              <el-menu-item index="/addAch/report">技术报告</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components:{
    Navbar,
  },
  name: "AddAch",
  data(){

  },
  methods:{
    
  }
}
</script>

<style scoped>
.main-panel {
  width: 1000px;
  height: 1300px;
  margin-top: 50px;
  margin-left: 260px;
  margin-bottom: 50px;
  border-radius: 50px;
  box-shadow: 20px 20px 50px 10px rgba(0, 0, 0, 0.5);
}
.el-menu-item {
  font-size: 25px;
}
</style>