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
  name: "QuestionYouAsk",
  components: { QuestionItem },
  created() {
    this.userId = sessionStorage.getItem("userId");
    this.getAskedQuestions()
  },
  data() {
    return {
      userId: 0,
      questions: [
        {
          questionId: 0,
          author: "Gabriele Scheler",
          description: "started a discussion in Synaptic Learning",
          title: "Participation in discussion/ publication on neural plasticity?",
          text: "I 'm looking for a second/third author for a new short paper on neural plasticity. " +
              "Please check out what we have so far! (researchgate) Could be fun for anybody who is " +
              "inclined to contribute to a theoretical/review paper. Previous experience doesn't have " +
              "to be very extensive, but high interest and motivation are great. Could be a fairly short " +
              "statement paper/overview. ALSO adding a cri...\n",
          readNum: 7,
          followNum: 0,

          date: "6d ago",
          tags: [
            "Neural Plasticity",
            "Neuronal Plasticity",
            "Artificial Intelligence",
            "Synaptic Learning"
          ],
        }
      ]
    }
  },
  methods: {
    async getAskedQuestions() {
      const {data:res} = await this.$http.post("/question/getAskedQuestion", this.userId);
      this.questions = res.data
    },
  }
}
</script>

<style scoped>

</style>