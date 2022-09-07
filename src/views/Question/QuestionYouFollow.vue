<template>
  <div>
    <div v-for="item in questions" :key="item.id">
      <question-item
          :head="head"
          :question-id="item.questionId"
          :create-time="item.createTime"
          :owner-id="item.ownerId"
          :description="item.description"
          :title="item.title"
          :follow-cnt="item.followNum"
          :keywords="item.keywords"
          :read-cnt="item.readNum"
          :answer-cnt="item.ansNum"
          :recommend-cnt="item.recNum"
          :is-following="item.isFollowing"
          :is-recommend="item.isRecommend"
      ></question-item>
    </div>
  </div>
</template>

<script>
import QuestionItem from "@/components/Question/QuestionItem";

export default {
  name: "QuestionYouFollow",
  components: { QuestionItem },
  created() {
    this.userId = sessionStorage.getItem("userId");
    this.getFollowedQuestions()
  },
  data() {
    return {
      userId: 0,
      questions: []
    }
  },
  methods: {
    async getFollowedQuestions() {
      const {data:res} = await this.$http.post("/question/getFollowedQuestion", this.userId);
      this.questions = res.data
    },
  }
}
</script>

<style scoped>

</style>