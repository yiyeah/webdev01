<template>
  <div class="main-body">
    <div class="top">
      <div class="ach-info">
        <el-container>
          <div class="left-info">
            <div class="first-line">
              <div class="green-box">
                {{ info.type }}
              </div>
              <div class="white-box" v-if="info.isAvailable==='1'">
                File available
              </div>
            </div>
            <div class="title">
              {{ info.title }}
            </div>
            <div class="date" v-if="info.type==='Article'&&info.journal!==''">
              {{ info.date }} · {{ info.journal }} {{ info.issue }}({{ info.volume }}):{{ info.page }}
            </div>
            <div class="date" v-else>
              {{ info.date }}
            </div>
            <div class="doi" v-if="info.type==='Article'&&info.doi!==''">
              DOI: {{ info.doi }}
            </div>
            <div class="institution" v-if="info.type==='Technical Report'&&info.institution!==''">
              Institution: {{info.institution}}
            </div>
            <div class="authors">
              {{ info.authors }}
            </div>
          </div>
          <div class="right-info">
            <div class="citations">
              Citations: {{info.citeCnt}}
            </div>
            <div class="recommendations">
              Recommendations: {{info.recommendCnt}}
            </div>
            <div class="reads">
              Reads: {{info.readCnt}}
            </div>
            <div class="buttons">
              <el-button type="text" v-if="info.isAvailable===1" @click="download">
                <div class="text-btn">Download</div>
              </el-button>
              <el-button type="text" v-else @click="request">
                <div class="text-btn">Request File</div>
              </el-button>
              <el-button type="text" @click="follow">
                <div class="text-btn" v-if="info.isFollowed===0">
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
        </el-container>
        <div style="margin-top: 4%;">
          <el-divider></el-divider>
        </div>
      </div>
    </div>
    <div class="body">
      <div style="margin: 5%;"></div>
      <el-container>
        <div class="abstract">
          <el-card>
            <template #header>
              <div style="font-size:18px;">Abstract & Description</div>
            </template>
            <div style="text-align:left">{{ info.abstract }}</div>
          </el-card>
        </div>
        <div class="ad">
          <el-carousel trigger="click">
            <el-carousel-item>
              <img :src="ad1" />
            </el-carousel-item>
            <el-carousel-item>
              <img :src="ad2" />
            </el-carousel-item>
            <el-carousel-item>
              <img :src="ad3" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-container>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "Search",
  props: ["id"],
  data() {
    return {
      info: {
        type: "Article",
        isAvailable: 0,
        title: "Would there be any significant alteration in ASD like symptoms observed " +
          "in rats if ICV administration of 1M PPA is done bilaterally?",
        date: "Jul 2022",
        journal: "Eye (London, England)",
        issue: "35",
        volume: "6",
        page: "1-7",
        doi: "10.13140/RG.2.2.12082.48326",
        institution: 'BUAA',
        authors: "Yu Duan; Runxi Huang; Yeqi Gao; Xinhe Qiu",
        abstract: "Unilateral ICV administration of 1M Propanoic acid is generally done " +
          "in rats to induce autism like symptoms.",
        citeCnt: 1,
        readCnt: 60,
        recommendCnt: 0,
        isFollowed: 0,
      },
      ad1: require("../../assets/images/Achievement/ad1.png"),
      ad2: require("../../assets/images/Achievement/ad2.png"),
      ad3: require("../../assets/images/Achievement/ad3.png"),
    }
  },
  created(){
    this.getDetail();
  },
  methods: {
    async getDetail(){
      let param = {
        id: this.id,
        userId: 1,
      };
      const {data:res} = await this.$http.get("/achievement/getDetail", param);
      if (res.status === 200){
        this.info = res.data.info;
      }
      else {
        this.$message({
          message: '获取成果详情失败',
          type: 'error',
        });
      }
    },
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
      if(this.info.isFollowed == 0) this.followAch();
      else this.cancelFollow();
    },

    async followAch(){
      let param = {
        id: this.id,
        userId: 1,
      };
      const {data:res} = await this.$http.post("/achievement/followAch", param);
      if(res.status === 200){
        this.info.isFollowed = 1;
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
        this.info.isFollowed = 0;
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
.ach-info {
  width: 65%;
  margin: auto;
}
.left-info {
  width: 60%;
}
.first-line {
  display: flex;
  flex-direction: row;
  margin: 4% 0 2% 0;
}
.green-box {
  background-color: #C5E8E5;
  color: #007478;
  text-align: left;
  height: 25px;
  width: 50px;
  padding-top: 6px;
  padding-left: 6px;
}
.white-box {
  margin-left: 6px;
  border: solid 1px #007478;
  color: #007478;
  text-align: left;
  height: 23px;
  width: 100px;
  padding-top: 6px;
  padding-left: 8px;
}
.title {
  font-size: 20px;
  text-align: left;
  font-weight: 600;
}
.date {
  font-size: 16px;
  color: gray;
  text-align: left;
  margin: 2% 0 1% 0;
}
.doi {
  font-size: 16px;
  color: gray;
  text-align: left;
}
.institution {
  font-size: 16px;
  color: gray;
  text-align: left;
}
.authors {
  font-size: 17px;
  text-align: left;
  margin-top: 2%;
}
.right-info {
  text-align: left;
  padding: 7% 0 0 8%;
  width: 30%
}
.buttons {
  margin-top: 18%;
}
.text-btn {
  font-size: 17px;
  color: #007478;
}
.text-btn:hover {
  cursor: pointer;
  text-decoration: underline;
}
.citations {
  font-size: 16px;
  margin-bottom: 2%;
}
.recommendations {
  font-size: 16px;
  margin-bottom: 2%;
}
.reads {
  font-size: 16px;
}
.top-bottom {
  width: 65%;
  margin: auto;
}
.body {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  width: 65%;
}
.abstract {
  width: 60%;
}
.ad {
  width: 35%;
  margin-left: 5%;
}
</style>