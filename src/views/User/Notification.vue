<template>
  <div>
    <Navbar></Navbar>
    <div class="noticeBar">
        <b>Notifications</b>
    </div>
    <div class="selectMenu">
        <div style="margin-left: 15vw;">
            <span class="selectMenu_item item_active">Updates</span>
            <span class="selectMenu_item" @click="$router.push('/message')">Messages</span>
        </div>
    </div>
    <div class="contentWrapper">
        <div class="content">
            <div v-for="(item,index) in this.noticeList" :key="index" class="notiBox">
                    <div class="noticeContent">{{item.notContent}}</div>
                    <div class="noticeDate">{{item.notDate}}</div>
            </div>
        </div>
        <div></div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
    components:{
        Navbar
    },
    created: function() {
        this.getNotice();      
        window.setInterval(() => {
            setTimeout(this.getNotice, 100);
        }, 5000)
        },
    data(){
        return{
            noticeList:[
            {
                notContent: "this is notice from system",
                notDate: "2022/8/30"
            },
            {
                notContent: "gyq liked your article [Why you have to attend school]",
                notDate: "2022/9/1"
            },
            {
                notContent: "adwawdawdawdawdawsddasxdcadawfawfeafcegasggasegawdddddddddddddddddddddddaaaaaaaaaaaaaaaawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwaaaaaaaaaaaaaaaaaaaaae",
                notDate: "2022/9/3"
            },
            {
                notContent: "多种搜索功能（例如按科研人员名字、按成果题目、按机构名称、按研究领域）搜索自己感兴趣的科研人员，并可以follow。对于follow的人员，其状态更新时，系统给出提醒，可以多种方式提醒。",
                notDate: "2022/9/3"
            },
            {
                notContent: "对于follow的人员，其状态更新时，系统给出提醒，可以多种方式提醒。",
                notDate: "2022/9/3"
            }
            ], 
        }
    },
    methods:{
        async getNotice(){
            const userId = sessionStorage.getItem("userId");
            let params = {
                userId
            }
            const {data:res} = await this.$http.get("/account/getNoticeById",{params});
            if(res.code == '200'){
                this.noticeList = res.data;
            }
            else
                console.log(res.msg);
        }
    }
}
</script>

<style scoped>
.noticeBar{
    position: relative;
    width: 70vw;
    left: 15vw;
    color: grey;
    border-bottom: 2px solid #eeeeee;
    padding: 30px 10px;
    font-size: 24px;
    text-align: left;
}
.selectMenu{
    padding: 25px 10px;
    border-bottom: 2px solid #eeeeee;
    color:grey;
    text-align: left;
}
.selectMenu_item{
    padding: 25px 0px;
    margin: 0 30px;
    cursor: pointer;
}
.selectMenu_item:hover {
    color:black;
    border-bottom: 2px solid grey;
}
.item_active{
    border-bottom: 2px solid  rgb(0,204,187);
}
.contentWrapper{
    display: flex;
}
.content{
    width: 60vw;
    border-right: 2px solid #eeeeee ;
    min-height: 50vh;
}
.notiBox{
    margin-left: 10vw;
    padding: 15px 0;
    border-bottom: 2px solid #eeeeee ;
    text-align: left;
}
.notiBox:nth-child(even) {
    background-color: #eeeeee;
}
.noticeContent{
    word-break: break-all;
    padding-right: 40px;
}
.noticeDate{
    margin-top: 15px;
    font-size: 14px;
    color: grey;
}
</style>