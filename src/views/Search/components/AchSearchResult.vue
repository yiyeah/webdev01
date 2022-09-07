<template>
  <div class="main">
    <div style="padding: 4%">
      <div class="title" @click="$router.push('/achDetail/' + id)">
        {{ title }}
      </div>
      <div class="second-line">
        <div class="green-box">
          {{ type }}
        </div>
        <div class="white-box" v-if="isAvailable===1">
          File available
        </div>
        <div class="date-box">
          {{ date }}
        </div>
      </div>
      <div class="third-line">
        {{ authors }}
      </div>
      <div class="abstract-box">
        {{ abstract }}
      </div>
      <div class="data-box">
        <div v-if="recommendCnt!==0">
          {{ recommendCnt }} Recommendations ·&nbsp
        </div>
        <div v-if="citeCnt!==0">
          {{ citeCnt }} Citations ·&nbsp
        </div>
        <div>
          {{ readCnt }} Reads
        </div>
      </div>
      <div class="bottom">
        <div>
          <el-button type="primary" plain v-if="isAvailable===1" @click="download">Download</el-button>
          <el-button type="primary" plain v-else @click="request">Request file</el-button>
        </div>
        <div style="width: 62%"></div>
        <div>
          <el-button type="text" @click="follow">
            <div class="text-btn" v-if="isFollowed===0">
              Follow
            </div>
            <div class="text-btn" v-else>
              Following
            </div>
          </el-button>
          <el-button type="text">
            <div class="text-btn">
              Share
            </div>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionSearchResult",
  props: ["id", "title", "type", "isAvailable", "date", "authors", "abstract", "readCnt", "citeCnt", "recommendCnt", "isFollowed"],
  data() {
    return {
      
    }
  },
  methods: {
    //下载成果
    download(){
      this.downloadAch();
    },

    async downloadAch(){
      let id = this.id;
      const {data:res} = await this.$http.post("/achievement/downloadAch", id);
      if (res.status === 200){

      }
      else {
        this.$message({
          message: '下载失败',
          type: 'error',
        });
      }
    },

    //请求全文
    request(){
      this.requestAch();
    },

    async requestAch(){
      let param = {
        id: this.id,
        userId: 1,
      };
      const {data:res} = await this.$http.post("/achievement/requestAch", param);
      if(res.status === 200){
        this.$message({
          message: '已向上传者请求成果全文',
          type: 'success',
        });
      }
      else {
        this.$message({
          message: '请求失败',
          type: 'error',
        });
      }
    },

    //Follow/取消Follow成果
    follow(){
      if(this.isFollowed == 0) this.followAch();
      else this.cancelFollow();
    },

    async followAch(){
      let param = {
        id: this.id,
        userId: 1,
      };
      const {data:res} = await this.$http.post("/achievement/followAch", param);
      if(res.status === 200){
        this.isFollowed = 1;
        this.$message({
          message: '关注成功',
          type: 'success',
        });
      }
      else {
        this.$message({
          message: '关注失败',
          type: 'error',
        });
      }
    },

    async cancelFollow(){
      let param = {
        id: this.id,
        userId: 1,
      };
      const {data:res} = await this.$http.post("/achievement/cancelFollow", param);
      if(res.status === 200){
        this.isFollowed = 0;
        this.$message({
          message: '取消关注成功',
          type: 'success',
        });
      }
      else {
        this.$message({
          message: '取消关注失败',
          type: 'error',
        });
      }
    }
  }
}
</script>
  
<style scoped>
.main {
  width: 100%;
  background-color: white;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-bottom: solid 1px lightgrey;
}
.title {
  text-align: left;
  font-weight:bold;
  font-size: 18px;
}
.title:hover {
  cursor: pointer;
  text-decoration: underline;
}
.second-line {
  display: flex;
  flex-direction: row;
  margin: 1% 0 1% 0;
}
.green-box {
  background-color: #C5E8E5;
  color: #007478;
  text-align: left;
  padding: 1%;
}
.white-box {
  margin-left: 6px;
  border: solid 1px #007478;
  color: #007478;
  text-align: left;
  padding: 1%;
}
.date-box {
  padding: 1%;
  color: grey;
}
.third-line {
  text-align: left;
  margin-bottom: 1%;
}
.abstract-box {
  text-align: left;
  margin-bottom: 1%;
}
.data-box {
  text-align: left;
  display: flex;
  flex-direction: row;
  color: lightslategrey;
}
.bottom {
  display: flex;
  flex-direction: row;
  margin: 1% 0 1% 0;
}
.text-btn {
  font-size: 17px;
  color: black;
}
.text-btn:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>