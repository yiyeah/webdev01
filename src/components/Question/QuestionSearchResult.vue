<template>
  <div class="main">
    <div style="padding: 4%">
      <div class="title" @click="reply">
        {{ title }}
      </div>
      <div class="second-line">
        <div class="green-box">
          Question
        </div>
        <div class="date-box">
          {{ createTime }}
        </div>
      </div>
      <div class="description-box">
        {{ description }}
      </div>
      <div class="data-box">
        <div v-if="recommendCnt!==0">
          {{ recommendCnt }} Recommendations ·&nbsp
        </div>
        <div>
          {{ answerCnt }} Answer ·&nbsp
        </div>
        <div>
          {{ readCnt }} Reads
        </div>
      </div>
      <div class="bottom">
        <div>
          <el-button type="primary" plain>Answer</el-button>
        </div>
        <div style="width: 50%"></div>
        <div class="btn-box">
          <div v-if="isRecommend" class="text-btn">
            Recommended
          </div>
          <div v-else class="text-btn">
            Recommend
          </div>
          <div v-if="isFollowing" class="text-btn">
            Following
          </div>
          <div v-else class="text-btn">
            Follow
          </div>
          <div class="text-btn">
            Share
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionSearchResult",
  props: ['keywords', 'title', 'author', 'head', 'answerCnt', 'description', 'createTime', "readCnt", "type",
    "questionId", "ownerId", "recommendCnt", "followCnt", "userDescription", "isFollowing", "isRecommend" ],
  methods: {
    follow() {
      this.isFollowing = true
      this.followQuestion()
    },
    unfollow() {
      this.isFollowing = false
      this.unfollowQuestion()
    },
    recommend() {
      this.isRecommend = true
      this.recommendQuestion()
      location.reload()
    },
    cancelRecommend() {
      this.isRecommend = false
      this.cancelRecommendQuestion()
      location.reload()
    },
    reply() {
      this.$router.push({
        path: '/answer',
        query: {
          questionId: this.questionId
        }
      })
    },

    async followQuestion() {
      let form = {
        userId: this.userId,
        questionId: this.questionId
      }
      const {data:res} = await this.$http.post("/question/followQuestion", form);
      if (res.code === 200) {
        this.$message({
          message: "Follow successfully!",
          type: "success"
        })
      }
    },
    async unfollowQuestion() {
      let form = {
        userId: this.userId,
        questionId: this.questionId
      }
      const {data:res} = await this.$http.post("/question/unfollowQuestion", form);
      if (res.code === 200) {
        this.$message({
          message: "Unfollow successfully!",
          type: "success"
        })
      }
    },
    async recommendQuestion() {
      let form = {
        userId: this.userId,
        questionId: this.questionId
      }
      const {data:res} = await this.$http.post("/question/recQuestion", form);
      if (res.code === 200) {
        this.$message({
          message: "Recommend successfully!",
          type: "success"
        })
      }
    },
    async cancelRecommendQuestion() {
      let form = {
        userId: this.userId,
        questionId: this.questionId
      }
      const {data:res} = await this.$http.post("/question/unrecQuestion", form);
      if (res.code === 200) {
        this.$message({
          message: "Cancel recommendation successfully!",
          type: "success"
        })
      }
    },
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
  font-weight: bold;
  font-size: 18px;
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

.date-box {
  padding: 1%;
  color: grey;
}

.description-box {
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

.btn-box {
  display: flex;
  flex-direction: row;
  justify-content: right;
  width: 50%;
}

.text-btn {
  text-align: right;

  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.text-btn:hover {
  cursor: pointer;
  text-decoration: underline;
}

</style>