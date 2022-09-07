<template>
    
    <div class="whole">

        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">成果广场</el-menu-item>
            <el-menu-item index="2">项目广场</el-menu-item>            
        </el-menu>
        <div class="line"></div>

        <div class="search_list">
            <!-- 成果广场 -->
            <div v-for="item in current_smg" class="list_card" v-if="type == 1">
                <div class="title">                   
                    <span style="vertical-align:middle;"><el-avatar :size="40" :src="item.smgimg" shape="circle" alt="暂无头像" ></el-avatar></span>
                    &nbsp;
                    <span style="vertical-align:middle;">{{item.smgowners}}</span>                    
                </div>

                <div class="abstract">成果描述：{{ item.smgdescription }}</div>
                <div><span class="date">{{ item.smgdate }}</span></div>
                <br>
                <div style="margin: 10px 0">
                    <div class="button" @click="seeDetail(item.smgid)">
                      <i class="el-icon-reading"></i>查看详情
                    </div>
                    &nbsp;
                    <div class="button" @click="likesmg(item.smgid)">
                      <i class="el-icon-s-opportunity"></i>点赞
                    </div>
                    <div class="card_foot">
                      <span>点赞数：{{item.smglikenum}}</span>
                    </div>
                </div>
            </div>

            <!-- 项目广场 -->
            <div v-for="item in current_proj" class="list_card" v-if="type == 2">
                <div class="title">
                    {{item.projname}}                  
                </div>
                <div class="abstract">项目描述：{{ item.projdescription }}</div>
                <div><span class="date">{{ item.projdate }}</span></div>
                <br>
                <div style="margin: 10px 0;">
                    <div class="button">
                      <i class="el-icon-folder-add"></i>
                    </div>
                </div>
                <div style="margin: 10px 0">
                    <div style="height:10px;font-size: 13px;color:deepskyblue;">快加入吧!</div>
                    <div class="card_foot">
                        <span>参与者：{{item.projectjoiner}}</span>
                    </div>
                </div>
                
            </div>

        </div>
        <div style="height: 10px; border-top: 1px solid #ccc"></div>
        <div v-if="type == 1" style="text-align: center; padding: 20px 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="smgtotal"
              page-sizes="10"
              pager-count="5"
              :current-page="smgpage"
              @current-change="changesmg"
            >
            </el-pagination>
        </div>  
        <div v-if="type == 2" style="text-align: center; padding: 20px 0">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="projtotal"
              page-sizes="10"
              pager-count="5"
              :current-page="projpage"
              @current-change="changeproj"
            >
            </el-pagination>
        </div>            
    </div>
</template>
  
<script>
    //import Loading from "../User/Loading.vue"
    export default {
        created(){
        //传userid，

        //传入所有动态
        this.smg_keyword="";
        this.$http
        .post("/api/selectMsg", {
          keyword:this.smg_keyword
        })
        .then((res) => {
            this.$message.success(res.data.message);
            //根据portalid，要来对应的portalname、imgurl、introduction和papertotal

            this.smgtotal = res.data.amount;
            for (var i = 0; i < res.data.result.length; i++) {
            var a = {
                smgid:"",
                smgowners:"",
                smgtype:"",
                smgrelationid:"",
                smglike:"",
                smglikenum:"",
                smgdescription:"",
                smgdate:"",
            };
            a.smgid = res.data.result[i].smgid;
            a.smgowners = res.data.result[i].smgowners;
            a.smgtype = res.data.result[i].smgtype;
            a.smgrelationid = res.data.result[i].smgrelationid;
            a.smglike = res.data.result[i].smglike;
            a.smglikenum = res.data.result[i].smglikenum;
            a.smgdescription = res.data.result[i].smgdescription;
            a.smgdate = res.data.result[i].smgdate;
            this.statemsg.push(a);
            }       
            console.log(res);
        })
        .catch((err) => {
          this.$message.error("网络错误,请稍后再试!");
        });

        //传入所有项目

        this.$http
        .post("/api/selectProj", {
          keyword:this.proj_keyword
        })
        .then((res) => {
            this.$message.success(res.data.message);
            //根据portalid，要来对应的portalname、imgurl、introduction和papertotal

            this.projtotal = res.data.amount;
            for (var i = 0; i < res.data.result.length; i++) {
            var a = {
                projid:"",
                projuserid:"",
                projname:"",
                projdate:"",
                projdescription:"",
                projectjoiner:"",
            };
            a.projid = res.data.result[i].projid;
            a.projuserid = res.data.result[i].projuserid;
            a.projname = res.data.result[i].projname;
            a.projdate = res.data.result[i].projdate;
            a.projdescription = res.data.result[i].projdescription;
            a.projectjoiner = res.data.result[i].projectjoiner;
            this.project.push(a);
            }       
            console.log(res);
        })
        .catch((err) => {
            this.$message.error("网络错误,请稍后再试!");
        });

        // this.smgtotal=this.statemsg.length;
        // this.projtotal=this.project.length;
        this.change_current_proj(1);
        this.change_current_smg(1);
        },
        data(){
            return{
                // detailitem:{
                //     d_id:"",
                //     d_owners:"",
                //     d_description:"",

                // },
                smg_keyword:"",
                proj_keyword:"",
                userid:1,
                activeIndex: '1',
                type:1,
                current_smg:[],
                current_proj:[],
                projpage:1,
                smgpage:1,
                projtotal:'',
                smgtotal:'',
                project:[],
                statemsg:[],
            }

        },
        methods: {
            //分页器
            changeproj(val){
                this.projpage=val;
                this.change_current_proj(this.projpage);
            },
            changesmg(val){
                this.smgpage=val;
                this.change_current_smg(this.smgpage);
            },
            change_current_proj(val){


                this.current_proj=[];
                if(val==1){
                    if(this.projtotal<=10){
                    
                    for(var i=0;i<this.projtotal;i++){
                        var a={
                        projid:'',
                        projuserid:'',
                        projname:'',
                        projdate:'',
                        projdescription:'',
                        projectjoiner:''
                    };
                        a.projid=this.project[i].projid;
                        a.projuserid=this.project[i].projuserid;
                        a.projname=this.project[i].projname;
                        a.projdate=this.project[i].projdate;
                        a.projdescription=this.project[i].projdescription;
                        a.projectjoiner=this.project[i].projectjoiner;
                        this.current_proj.push(a)
                    }
                    }else{
                    
                    for(var i=0;i<10;i++){
                        var a={
                        projid:'',
                        projuserid:'',
                        projname:'',
                        projdate:'',
                        projdescription:'',
                        projectjoiner:''
                    };
                        a.projid=this.project[i].projid;
                        a.projuserid=this.project[i].projuserid;
                        a.projname=this.project[i].projname;
                        a.projdate=this.project[i].projdate;
                        a.projdescription=this.project[i].projdescription;
                        a.projectjoiner=this.project[i].projectjoiner;
                        this.current_proj.push(a)
                    }
                    }
                }else{
                    var paperremain;
                    paperremain=this.projtotal-10*(val-1);
                    if(this.paperremain<=10){
                    
                    var j=10*(val-1);
                    for(var i=j;i<(j+paperremain);i++){
                        var a={
                        projid:'',
                        projuserid:'',
                        projname:'',
                        projdate:'',
                        projdescription:'',
                        projectjoiner:''
                    };
                        a.projid=this.project[i].projid;
                        a.projuserid=this.project[i].projuserid;
                        a.projname=this.project[i].projname;
                        a.projdate=this.project[i].projdate;
                        a.projdescription=this.project[i].projdescription;
                        a.projectjoiner=this.project[i].projectjoiner;
                        this.current_proj.push(a)
                    }
                    }else{
                    var j=10*(val-1);
                    for(var i=j;i<j+10;i++){
                        var a={
                        projid:'',
                        projuserid:'',
                        projname:'',
                        projdate:'',
                        projdescription:'',
                        projectjoiner:''
                    };
                        a.projid=this.project[i].projid;
                        a.projuserid=this.project[i].projuserid;
                        a.projname=this.project[i].projname;
                        a.projdate=this.project[i].projdate;
                        a.projdescription=this.project[i].projdescription;
                        a.projectjoiner=this.project[i].projectjoiner;
                        this.current_proj.push(a)
                    }
                    }
                }


            },
            change_current_smg(val){
            this.current_smg=[];
            if(val==1){
                if(this.smgtotal<=10){
                
                for(var i=0;i<this.smgtotal;i++){
                    var a={
                    smgid:'',
                    smgowners:'',
                    smgtype:'',
                    smgrelationid:'',
                    smglike:'',
                    smglikenum:'',
                    smgdescription:'',
                    smgdate:''
                };
                    a.smgid=this.statemsg[i].smgid;
                    a.smgowners=this.statemsg[i].smgowners;
                    a.smgtype=this.statemsg[i].smgtype;
                    a.smgrelationid=this.statemsg[i].smgrelationid;
                    a.smglike=this.statemsg[i].smglike;
                    a.smglikenum=this.statemsg[i].smglikenum;
                    a.smgdescription=this.statemsg[i].smgdescription;
                    a.smgdate=this.statemsg[i].smgdate;
                    this.current_smg.push(a)
                }
                }else{
                
                for(var i=0;i<10;i++){
                    var a={
                    smgid:'',
                    smgowners:'',
                    smgtype:'',
                    smgrelationid:'',
                    smglike:'',
                    smglikenum:'',
                    smgdescription:'',
                    smgdate:''
                };
                    a.smgid=this.statemsg[i].smgid;
                    a.smgowners=this.statemsg[i].smgowners;
                    a.smgtype=this.statemsg[i].smgtype;
                    a.smgrelationid=this.statemsg[i].smgrelationid;
                    a.smglike=this.statemsg[i].smglike;
                    a.smglikenum=this.statemsg[i].smglikenum;
                    a.smgdescription=this.statemsg[i].smgdescription;
                    a.smgdate=this.statemsg[i].smgdate;
                    this.current_smg.push(a)
                }
                }
            }else{
                var paperremain;
                paperremain=this.smgtotal-10*(val-1);
                if(this.paperremain<=10){
                
                var j=10*(val-1);
                for(var i=j;i<(j+paperremain);i++){
                    var a={
                    smgid:'',
                    smgowners:'',
                    smgtype:'',
                    smgrelationid:'',
                    smglike:'',
                    smglikenum:'',
                    smgdescription:'',
                    smgdate:''
                };
                    a.smgid=this.statemsg[i].smgid;
                    a.smgowners=this.statemsg[i].smgowners;
                    a.smgtype=this.statemsg[i].smgtype;
                    a.smgrelationid=this.statemsg[i].smgrelationid;
                    a.smglike=this.statemsg[i].smglike;
                    a.smglikenum=this.statemsg[i].smglikenum;
                    a.smgdescription=this.statemsg[i].smgdescription;
                    a.smgdate=this.statemsg[i].smgdate;
                    this.current_smg.push(a)
                }
                }else{
                var j=10*(val-1);
                for(var i=j;i<j+10;i++){
                    var a={
                    smgid:'',
                    smgowners:'',
                    smgtype:'',
                    smgrelationid:'',
                    smglike:'',
                    smglikenum:'',
                    smgdescription:'',
                    smgdate:''
                };
                    a.smgid=this.statemsg[i].smgid;
                    a.smgowners=this.statemsg[i].smgowners;
                    a.smgtype=this.statemsg[i].smgtype;
                    a.smgrelationid=this.statemsg[i].smgrelationid;
                    a.smglike=this.statemsg[i].smglike;
                    a.smglikenum=this.statemsg[i].smglikenum;
                    a.smgdescription=this.statemsg[i].smgdescription;
                    a.smgdate=this.statemsg[i].smgdate;
                    this.current_smg.push(a)
                }
                }
            }


            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                this.type=key;
            },
            
            //查看详情
            seeDetail(id){

            },
            //点赞动态
            likesmg(id){
                var sid=parseInt(id);
                var uid=parseInt(this.userid);
                this.$http
                .post("/api/likeMsg", {
                smgid:sid,
                userid:uid,
                })
                .then((res) => {
                    this.$message.success(res.data.message);
                       
                    console.log(res);
                })
                .catch((err) => {
                this.$message.error("网络错误,请稍后再试!");
                });

            }
        
        },
    };
</script>
  
<style scoped>
        .whole {
        width: 65%;
        height: 100%;
        margin: 0 auto;
        background-color: #ffffff;
        font-family: "Microsoft YaHei";
        min-width: 500px;
        }
        .search_list {
        margin-top: 40px;
        min-height: 50px;
        }
        .list_card {
        padding: 10px 35px;
        border-top: 1px dashed #ccc;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        }
        .title {
        padding: 7px 0;
        font-size: 20px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: #215db1;
        user-select: none;
        }
        .title:hover {
        color: #ff6c00;
        cursor: pointer;
        }
        .date {
        float: right;
        margin-right: 100px;
        font-size: 16px;
        user-select: none;
        color: #666666;
        }
        .abstract {
        font-size: 16px;
        color: #666666;
        user-select: none;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        }
        .button {
        font-size: 18px;
        color: #417dc9;
        display: inline-block;
        padding: 4px 10px;
        border-radius: 5px;
        border: 1px solid #417dc9;
        user-select: none;
        }
        .button:hover {
        background-color: #417dc9;
        color: white;
        cursor: pointer;
        }
        .card_foot {
        float: right;
        font-size: 13px;
        color: #666666;
        }
    
</style>
  