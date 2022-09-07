<template>
  <div class="question-body">
    <Navbar></Navbar>
    <div class="top">
      <div class="top-middle">
        <div class="first-line">
          <div class="QA">
            Q&A
          </div>
          <div class="QA-sentence">
            Ask a technical question to get answers from experts, or start a scientific discussion with your peers.
          </div>
        </div>
        <div class="second-line">
          <el-avatar shape="circle" :size="size" :src="head"></el-avatar>
          <div class="btn-box">
            <el-button type="primary" @click="QuestionVisible=true">Ask a technical question</el-button>
          </div>
          <div class="btn-box" @click="DiscussionVisible=true">
            <el-button type="primary">Start a discussion</el-button>
          </div>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/question/recommend">Questions we think you can answer</el-menu-item>
          <el-menu-item index="/question/follow">Question you follow</el-menu-item>
          <el-menu-item index="/question/ask">Question you asked</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="question-list">
      <router-view></router-view>
    </div>
    <el-dialog
        :visible.sync="QuestionVisible"
        width="50%">
      <div slot="title" class="question-title-box">
        <div class="blue-title">
          Ask a question
        </div>
        <div>
          &nbsp on ResearchGate
        </div>
      </div>
      <div class="top-sentences">
        <div>
          Enter a clear and concise question that others will easily understand.
        </div>
        <div>
          Please provide any details researchers may need to answer your question.
        </div>
      </div>
      <el-divider></el-divider>
      <div class="question-text">
        <div>Question</div>
      </div>
      <div style="margin-bottom: 1%">
        <el-input
            placeholder="Enter your question"
            v-model="newQuestion.text"
            maxlength="150"
        ></el-input>
      </div>
      <div class="question-text">
        <div>Description</div>
      </div>
      <div>
        <quill-editor
            id="quill-editor"
            v-model="newQuestion.description"
            :options="editorOption"
            class="editor"
        >
        </quill-editor>
      </div>
      <div class="question-text">
        <div>Add some keywords for your question</div>
      </div>
      <el-form :inline="true" :model="keywords" class="demo-form-inline">
        <el-form-item class="keyword-box">
          <el-input v-model="keywords.first" placeholder="keyword 1"></el-input>
        </el-form-item>
        <el-form-item class="keyword-box">
          <el-input v-model="keywords.second" placeholder="keyword 2"></el-input>
        </el-form-item>
        <el-form-item class="keyword-box">
          <el-input v-model="keywords.third" placeholder="keyword 3"></el-input>
        </el-form-item>
        <el-form-item class="keyword-box">
          <el-input v-model="keywords.forth" placeholder="keyword 4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close(2)">Cancel</el-button>
        <el-button type="primary" @click="createQuestion(2)">Add</el-button>
      </span>
    </el-dialog>
    <el-dialog
        :visible.sync="DiscussionVisible"
        width="50%">
      <div slot="title" class="question-title-box">
        <div class="blue-title">
          Start a discussion
        </div>
        <div>
          &nbsp on ResearchGate
        </div>
      </div>
      <div class="top-sentences">
        <div>
          Enter a clear and concise title for your discussion that others will easily understand.
        </div>
        <div>
          Please provide details or a starting point so others can contribute to the discussion.
        </div>
      </div>
      <el-divider></el-divider>
      <div class="question-text">
        <div>Title</div>
      </div>
      <div style="margin-bottom: 1%">
        <el-input
            placeholder="Enter a title for your discussion"
            v-model="newQuestion.text"
            maxlength="150"
        ></el-input>
      </div>
      <div class="question-text">
        <div>Description</div>
      </div>
      <div>
        <quill-editor
            id="quill-editor"
            v-model="newQuestion.description"
            :options="editorOption"
            class="editor-discussion"
        >
        </quill-editor>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close(1)">Cancel</el-button>
        <el-button type="primary" @click="close(1)">Add</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QuestionItem from "@/components/Question/QuestionItem";
import Navbar from "@/components/Navbar";
export default {
  name: "Question",
  components: { QuestionItem, Navbar },
  data() {
    return {
      userId: 1,
      size: 50,
      activeIndex: "1",
      QuestionVisible: false,
      DiscussionVisible: false,
      newQuestion: {
        text: "",
        description: "",
        type: 1
      },
      head: require("../../assets/images/Question/head.png"),
      editorOption: {
        modules: {
          toolbar:[
            ['bold', 'italic'],    //加粗，斜体
            [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
          ],
        },
        placeholder: "Enter an explanation or any details needed to understand your question",
        theme: 'snow'
      },
      questions: [
        // {
        //   questionId: 0,
        //   author: "Gabriele Scheler",
        //   description: "started a discussion in Synaptic Learning",
        //   title: "Participation in discussion/ publication on neural plasticity?",
        //   text: "I 'm looking for a second/third author for a new short paper on neural plasticity. " +
        //       "Please check out what we have so far! (researchgate) Could be fun for anybody who is " +
        //       "inclined to contribute to a theoretical/review paper. Previous experience doesn't have " +
        //       "to be very extensive, but high interest and motivation are great. Could be a fairly short " +
        //       "statement paper/overview. ALSO adding a cri...\n",
        //   readNum: 7,
        //   followNum: 0,
        //
        //   date: "6d ago",
        //   tags: [
        //     "Neural Plasticity",
        //     "Neuronal Plasticity",
        //     "Artificial Intelligence",
        //     "Synaptic Learning"
        //   ],
        // }
      ],
      keywords: {
        first: '',
        second: '',
        third: '',
        forth: ''
      }
    }
  },
  methods: {
    close(type) {
      if (type === 1) this.DiscussionVisible = false
      else this.QuestionVisible = false
      this.newQuestion = {
        text: "",
        description: "",
        type: 1
      }
      this.keywords = {
        first: "",
        second: "",
        third: "",
        forth: ""
      }
    },
    createQuestion(type) {
      let keywords = this.keywords.first + "//" + this.keywords.second + "//" +
          this.keywords.third + "//" + this.keywords.forth
      this.addQuestion(keywords)
      this.close(type)
    },

    async addQuestion(keywords) {
      let form = {
        title: this.newQuestion.text,
        description: this.newQuestion.description,
        ownerId: this.userId,
        keywords: keywords
      }
      const {data:res} = await this.$http.post("/question/addQuestion", form);
      if (res.code === 200) {
        this.$message({
          message: "Add successfully!",
          type: "success"
        })
      }
    },
  }
}
</script>

<style scoped>
.question-body {
  font-family: "Roboto",Arial,sans-serif;
  background-color: #f4f4f4;
  height: 100%;
}

.top {
  background-color: white;
  display: flex;
  flex-direction: column;
}

.top-middle {
  margin: 0 auto;
  padding-right: 10%;
}

.first-line {
  display: flex;
  flex-direction: row;
  text-align: center;
  margin: 3% 0 3% 0;
}

.QA {
  font-size: 25px;
  font-weight: bold;
  margin-right: 8px;
}

.QA-sentence {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.second-line {
  display: flex;
  flex-direction: row;
  margin: 2% 0 2% 0;
}

.btn-box {
  width: 30%;
  height: 10%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 1% 1% 0 0;
}

.question-list {
  margin-top: 1%;
}

.question-title-box {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
  font-size: 23px;
}

.blue-title {
  color: dodgerblue;
  text-decoration: underline;
}

.top-sentences {
  text-align: left;
}

/deep/.el-dialog__body {
  padding: 1% 3%;
  height: 500px;
}

.question-text {
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 1% 0;
}

.editor {
  height: 180px;
  margin-bottom: 55px;
}

.editor-discussion {
  height: 250px;
  margin-bottom: 55px;
}

.keyword-box {
  width: 20%;
}

.demo-form-inline {
  text-align: left;
}
</style>