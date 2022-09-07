<template>
    <div>
        <el-empty v-show="matchFlag==false" description="nothing match"></el-empty>
        <div v-for="item in userList" :key="item.userId">
            <user-search-result @ReSearch="searchUser(searchName)"
                :userId="item.userId"
                :userName="item.userName"
                :userInstitution="item.userInstitution"
                :userEmail="item.userEmail"
                :follow="item.follow"
            ></user-search-result>
        </div>
    </div>
  
</template>

<script>
import UserSearchResult from "@/components/User/UserSearchResult";
export default {
    components:{
        UserSearchResult,
    }, 
    data(){
        return{
            matchFlag: true,
            userList:[
                {
                    userId: 1,
                    userName: "Yeqi Gao",
                    userInstitution: "BUAA",
                    userEmail: "123@buaa.edu.cn",
                    follow: true,
                },
                {
                    userId: 7,
                    userName: "ZY Liu",
                    userInstitution: "BUAA",
                    userEmail: "72@buaa.edu.cn",
                    follow: false,
                },
                {
                    userId: 10,
                    userName: "Alice",
                    userInstitution: "Thu",
                    userEmail: "Alice@thu.edu.cn",
                    follow: true,
                }
            ],
            userInfo:{
                userId: 12,
                userName: "liu",
                userInstitution: "buaa",
                introduction: "hello",
            },
            searchName: ''   
        }
    },
    created(){
        this.searchName = this.$route.query.keyword;
        this.searchUser(this.searchName)
    },
    methods:{
        async searchUser(userName){
            if(userName=='')
                this.$message.error("Please Input Keyword")
            else{
                let param={
                    userName: userName,
                    userId: sessionStorage.getItem('userId')
                }
                const {data:res} = await this.$http.post("/account/searchUserByName",param);
                if(res.code==200){
                    this.userList = res.data.userList
                    if(this.userList.length == 0)
                        this.matchFlag = false
                    else
                        this.matchFlag = true
                }
                else{
                    this.$message.error(res.msg);
                }
            }  
            
        }
    }
}
</script>

<style>

</style>