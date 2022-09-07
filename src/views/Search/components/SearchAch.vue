<template>
  <div>
    <div class="select">
      <el-select v-model="searchType" size="small" @change="changeType">
        <el-option value="0" label="全部"/>
        <el-option value="1" label="期刊论文"/>
        <el-option value="2" label="专利"/>
        <el-option value="3" label="技术报告"/>
      </el-select>
    </div>
    <div v-for="item in results" :key="item.id">
      <ach-search-result
        :id="item.id"
        :title="item.title"
        :type="item.type"
        :isAvailable="item.isAvailable"
        :date="item.date"
        :authors="item.authors"
        :abstract="item.abstract"
        :cite-cnt="item.citeCnt"
        :read-cnt="item.readCnt"
        :recommend-cnt="item.recommendCnt"
        :isFollowed="item.isFollowed"
      ></ach-search-result>
    </div>
  </div> 
</template>
    
<script>
import AchSearchResult from "../components/AchSearchResult.vue";
export default {
  name: "SearchAch",
  components: {AchSearchResult},
  data() {
    return {
      searchType: "0",
      results: [
        {
          id: 1,
          title: "Would there be any significant alteration in ASD like symptoms observed " +
            "in rats if ICV administration of 1M PPA is done bilaterally?",
          type: "Article",
          isAvailable: 1,
          date: "Jul 2022",
          authors: "Yu Duan; Runxi Huang; Yeqi Gao; Xinhe Qiu",
          description: "Unilateral ICV administration of 1M Propanoic acid is generally done " +
            "in rats to induce autism like symptoms.",
          citeCnt: 1,
          readCnt: 60,
          recommendCnt: 0,
          isFollowed: 1,
        },
        {
          id: 2,
          title: "How the covid-19 pandemic has impacted the lives and routine of TEA families around the world?",
          type: "Patent",
          isAvailable: 0,
          date: "Jul 2022",
          authors: "Yu Duan; Runxi Huang; Yeqi Gao; Xinhe Qiu; Zhiyi Liu; Yijun Huang; Zihan Wang; Bowen Yang; Huibin Xu",
          abstract: "The covid-19 pandemic has impacted the lives and routine of families globally. " +
            "Considering the specificities of families of people with Autism Spectrum Disorder (ASD), " +
            "how to analyze the effectiveness of family ties developed in the context of social isolation " +
            "by families...",
          citeCnt: 1,
          readCnt: 60,
          recommendCnt: 3,
          isFollowed: 0,
        }
      ]
    }
  },
  created(){
    let keyword = this.$route.query.keyword;
    if(keyword == '') this.$message.error("Please Input Keyword");
    else this.searchAch(keyword);
  },
  methods: {
    changeType(){
      let keyword = this.$route.query.keyword;
      if(keyword == '') this.$message.error("Please Input Keyword");
      else this.searchAch(keyword);
    },
    async searchAch(keyword){
      let param = {
        userId: 1,
        keyword: keyword,
        type: this.searchType,
      }
      const {data:res} = await this.$http.get("/achievement/searchAch", param);
      if (res.status === 200){
        this.results = res.data.results;
      }
      else {
        this.$message({
          message: '搜索失败',
          type: 'error',
        });
      }
    }
  }
}
</script>
    
<style scoped>
.select {
  text-align: left;
  padding-top: 2%;
  margin-left: 2%;
  margin-bottom: 2%;
}
</style>