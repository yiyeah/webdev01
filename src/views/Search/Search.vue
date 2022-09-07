<template>
  <div>
    <Navbar></Navbar>
    <div class="main-body">
      <div class="top">
        <div style="margin: 2% 0 1% 0">
          <div class="search-title">
            Search
          </div>
        </div>
        <div class="search-bar">
          <el-input
              placeholder="Search ResearchGate"
              :clearable="true"
              v-model="keyword"
              @keyup.enter.native="search(searchType)">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div style="margin: 1%"></div>
        <div class="top-bottom">
          <el-menu class="el-menu-demo" mode="horizontal"
            :default-active= "this.searchType">
            <el-menu-item @click="search('/search/researcher')" index="/search/researcher" >Researchers</el-menu-item>
            <el-menu-item @click="search('/search/publication')" index="/search/publication">Publications</el-menu-item>
            <el-menu-item index="/search">Projects</el-menu-item>
            <el-menu-item @click="search('/search/question')" index="/search/question">Questions</el-menu-item>
            <el-menu-item index="/search">Jobs</el-menu-item>
            <el-menu-item index="/search">Institutions</el-menu-item>
        </el-menu>
        </div>
      </div>
      <div class="body">
        <div style="margin: 5%;"></div>
        <router-view :key="$route.fullPath"></router-view>
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
  name: "Search",
  data() {
    return {
      keyword: '',
      searchType: '/search/researcher'
    }
  },
  methods: {
    search(Type) {
      this.searchType = Type
      this.$router.push({
        path: this.searchType,
        query:{
              keyword: this.keyword,
            }
      })
    }
  }
}
</script>

<style scoped>
.main-body {
  font-family: "Roboto",Arial,sans-serif;
  background-color: #f4f4f4;
  height: 100%;
}

.top {
  background-color: white;
  display: flex;
  flex-direction: column;
}

.search-title {
  right: 0;
  left: 0;
  margin: auto;
  text-align: left;
  width: 50%;
  font-size: 20px;
  font-weight: bold;
  color: dimgrey;
}

.top-bottom {
  margin: 0 auto;
  padding-right: 10%;
}

.search-bar {
  width: 50%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}

.body {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 50%;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
}
</style>