<template>
  <div>
    <div v-for="item in results" :key="item.id">
      <question-search-result
        :title="item.title"
        :description="item.description"
        :answer-cnt="item.answerCnt"
        :read-cnt="item.readCnt"
        :recommend-cnt="item.recommendCnt"
        :date="item.date"
      ></question-search-result>
    </div>
  </div> 
</template>
  
<script>
import QuestionSearchResult from "@/components/Question/QuestionSearchResult";
export default {
  name: "SearchQ",
  components: {QuestionSearchResult},
  data() {
    return {
      results: [
        {
          title: "Would there be any significant alteration in ASD like symptoms observed " +
            "in rats if ICV administration of 1M PPA is done bilaterally?",
          date: "Jul 2022",
          description: "Unilateral ICV administration of 1M Propanoic acid is generally done " +
            "in rats to induce autism like symptoms.",
          answerCnt: 1,
          readCnt: 60,
          recommendCnt: 0,
        },
        {
          title: "How the covid-19 pandemic has impacted the lives and routine of TEA families around the world?",
          date: "Jul 2022",
          description: "The covid-19 pandemic has impacted the lives and routine of families globally. " +
            "Considering the specificities of families of people with Autism Spectrum Disorder (ASD), " +
            "how to analyze the effectiveness of family ties developed in the context of social isolation " +
            "by families...",
          answerCnt: 1,
          readCnt: 60,
          recommendCnt: 3,
        }
      ]
    }
  },
  methods: {
    
  }
}
</script>
  
<style scoped>

</style>