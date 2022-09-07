<template>
  <div class="answer-body">
    <Navbar></Navbar>
    <div class="question-box">
      <question-details
          :head="head"
          :question-id="questionInfo.questionId"
          :create-time="questionInfo.createTime"
          :owner-id="questionInfo.ownerId"
          :description="questionInfo.description"
          :title="questionInfo.title"
          :follow-cnt="questionInfo.followNum"
          :keywords="questionInfo.keywords"
          :read-cnt="questionInfo.readNum"
          :answer-cnt="questionInfo.ansNum"
          :recommend-cnt="questionInfo.recNum"
      ></question-details>
    </div>
    <div class="answer-list-box">
      <div class="all-replies">
        All replies({{ questionInfo.answerCnt }})
      </div>
      <el-divider></el-divider>
      <div v-for="item in answers" :key="item.id">
        <answer-item
          :owner-id="item.ownerId"
          :content="item.content"
          :question-id="item.questionId"
        ></answer-item>
        <el-divider></el-divider>
      </div>
      <div class="edit-answer-box">
        <div class="top">
          <el-avatar shape="circle" :size="size" :src="user.head"></el-avatar>
          <div class="name-box">
            <div class="author-name">{{ user.name }}</div>
            <div class="author-description">{{ user.description }}</div>
          </div>
        </div>
        <div class="reply-line">
          Reply
        </div>
        <div>
          <quill-editor
              id="quill-editor"
              v-model="text"
              :options="editorOption"
              class="editor"
          >
          </quill-editor>
        </div>
        <div class="add-btn-box">
          <el-button type="primary" class="add-btn" @click="answerQuestion">Add</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerItem from "@/components/Question/AnswerItem";
import QuestionDetails from "@/components/Question/QuestionDetails";
import Navbar from "@/components/Navbar";
export default {
  name: "Answer",
  components: {QuestionDetails, AnswerItem, Navbar},
  created() {
    this.questionInfo.id = this.$route.query.questionId
    this.user.id = this.sessionStorage.getItem("userId")
    this.getQuestionDetails()
  },
  data() {
    return {
      size: 50,
      text: '',
      userId: 0,
      head: require("../../assets/images/Question/head.png"),
      editorOption: {
        modules: {
          toolbar:[
            ['bold', 'italic'],    //加粗，斜体
            [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
          ],
        },
        placeholder: "Contribute to the discussion",
        theme: 'snow'
      },
      user: {
        id: 0,
        name: "Huang Runxi",
        head: require("../../assets/images/Question/head.png"),
        description: "Beihang University (BUAA)"
      },
      questionInfo: {
        id: 0,
        author: "Gabriele Scheler",
        description: "started a discussion in Synaptic Learning",
        title: "Participation in discussion/ publication on neural plasticity?",
        text: "I 'm looking for a second/third author for a new short paper on neural plasticity. " +
            "Please check out what we have so far! (researchgate) Could be fun for anybody who is " +
            "inclined to contribute to a theoretical/review paper. Previous experience doesn't have " +
            "to be very extensive, but high interest and motivation are great. Could be a fairly short " +
            "statement paper/overview. ALSO adding a cri...\n",
        readCnt: 7,
        date: "6d ago",
        keywords: [
          "Neural Plasticity",
          "Neuronal Plasticity",
          "Artificial Intelligence",
          "Synaptic Learning"
        ],
        answerCnt: 1
      },
      answers: [
        {
          "questionId": 20,
          "ownerId": 1,
          "content": "我回答了第20号问题"
        },
      ]
    }
  },
  methods: {
    answerQuestion() {
      if (this.text === '') {
        this.$message({
          message: 'You can not add empty answer!',
          type: 'warning'
        })
      } else {
        this.addAnswer()
        this.text = ''
      }
    },

    async getQuestionDetails() {
      let params = {
        userId: this.user.id,
        questionId: this.questionInfo.id
      }
      const {data:res} = await this.$http.get("/question/getQuestion", {params});
      this.questionInfo = res.data
    },
    async addAnswer() {
      let form = {
        questionId: this.questionInfo.id,
        ownerId: this.user.id,
        content: this.text
      }
      const {data:res} = await this.$http.post("/question/addAnswer", form);
      if (res.code === 200) {
        this.$message({
          message: "Add answer successfully!",
          type: "success"
        })
      }
    },
  }
}
</script>

<style scoped>
/deep/ .ql-container{
  min-height: 150px ;
}

.answer-body {
  font-family: "Roboto",Arial,sans-serif;
  background-color: #f4f4f4;
}

.question-box {
  margin: 1% 0 3% 0;
}

.answer-list-box {
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 50%;
  background-color: white;
}

.all-replies {
  padding: 4% 4% 0 4%;
  display: flex;
  flex-direction: row;
  font-size: 20px;
}

.top {
  display: flex;
  flex-direction: row;
}

.name-box {
  top: 0;
  bottom: 0;
  margin: auto;
  width: 85%;
}

.author-name {
  display: flex;
  flex-direction: row;
  justify-content: left;
  font-weight: bold;
}

.author-description {
  display: flex;
  flex-direction: row;
}

.edit-answer-box {
  background-color: white;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  padding: 0 4% 0 4%;
}

.reply-line {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin: 1% 0 1% 0;
}

.editor {
  height: 150%;
}

.add-btn-box {
  margin: 2% 0 2% 0;
  display: flex;
  flex-direction: row;
  justify-content: right;
}

.add-btn {
  height: 100%;
  width: 15%;
}
</style>