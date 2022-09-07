<template>
  <div class="wrapper">
        <div class="logo"  @click="$router.push('/')">
            ResearchDoor
        </div>
        <div class="router">
            <span class="router_items" @click="$router.push('/answer')">activities</span>
            <span class="router_items" @click="$router.push('/question')">questions</span>
        </div>
        <div class="search">
            <el-input style="width: 40vw"  placeholder="search for publication, author or questions" v-model="searchinput" class="input-with-select">
                <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="icons">
            <span @click="$router.push('/notification')"><i class="el-icon-bell"></i></span>
            <span @click="$router.push('/message')"><i class="el-icon-chat-round"></i></span>
            <span @click="routerPush('/userinfo')"><i class="el-icon-user"></i></span>
            <span @click="$router.push('/addAch')">add<i class="el-icon-plus"></i></span>
        </div>
  </div>
</template>

<script>
export default {
    name:'Navbar',
    data () {
        return {
            searchinput: ''
        }
    },
    methods:{
        routerPush(router){
            let userId=sessionStorage.getItem("userId");
            this.$router.push({
                path: router,
                query:{
                    userId: userId,
                }
            })
        },
        search(){
            if(this.searchinput == '')
                this.$message.error("Please input Keyword")
            else{
                this.$router.push({
                    path:'/search/researcher',
                    query:{
                        keyword: this.searchinput
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.wrapper{
    position: relative;
    background-color: rgb(0,204,187);
    height: 60px;
    display: flex;
    align-items: center;
}
.logo{
    margin: 10px;
    color: white;
    cursor: pointer;
    font-weight: 700;
    font-size: large;
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
}
.router{
    height: 100%;
    margin-inline: 5vw;
    display: flex;
    align-items: center;
}
.router_items{
    padding: 20px;
    color: white;
}
.router_items:hover{
    cursor: pointer;
    border-bottom: 2px solid white;
}
.icons{
    margin-left:auto;
    color:whitesmoke;
    display: flex;
}
.icons span{
    font-size: 20px;
    margin-inline: 15px;
}
.icons span:hover{
    cursor: pointer;
    color: grey;
}
</style>
