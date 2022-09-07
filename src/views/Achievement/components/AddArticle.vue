<template>
  <div>
    <el-row>
      <div class="main-title">
        <i class="el-icon-folder-add" style="font-size:60px"></i>
        请上传您的论文信息
      </div>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <el-form
        ref="form"
        :model="formData"
        style="margin-left:80px;"
        :rules="rules"
        >
          <el-form-item prop="file">
            <template #label>
              <div style="font-size:20px; font-weight:600">文件</div>
            </template>
            <el-upload
            class="upload"
            ref="file"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            :limit="1"
            style="float:left; margin-left:30px">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击添加</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="title">
            <template #label>
              <span style="font-size:20px; font-weight:600">标题</span>
            </template>
            <el-input v-model="formData.title" placeholder="请输入论文的标题"></el-input>
          </el-form-item>
          <el-form-item prop="authors">
            <template #label>
              <span style="font-size:20px; font-weight:600">作者</span>
            </template>
            <el-input v-model="formData.authors" placeholder="请按顺序输入作者姓名，中间用英文分号隔开"></el-input>
          </el-form-item>
          <el-form-item prop="date">
            <template #label>
              <span style="font-size:20px; font-weight:600">发表日期</span>
            </template>
            <el-date-picker type="date" v-model="formData.date" placeholder="选择日期" style="width:300px"></el-date-picker>
          </el-form-item>
          <el-form-item prop="doi">
            <template #label>
              <div style="font-size:20px; font-weight:600">DOI</div>
            </template>
            <el-input v-model="formData.doi" placeholder="请输入DOI"></el-input>
          </el-form-item>
          <el-form-item prop="abstract">
            <template #label>
              <div style="font-size:20px; font-weight:600">摘要</div>
            </template>
            <el-input
            type="textarea"
            v-model="formData.abstract"
            placeholder="论文的摘要或者概述"
            rows="5"
            style="float:left; width: 480px"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="journal">
            <template #label>
              <div style="font-size:20px; font-weight:600">期刊名称</div>
            </template>
            <el-input v-model="formData.journal" placeholder="请输入期刊名称" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item prop="volume">
            <template #label>
              <div style="font-size:20px; font-weight:600">卷</div>
            </template>
            <el-input v-model="formData.volume" placeholder="请输入卷号"></el-input>
          </el-form-item>
          <el-form-item prop="issue">
            <template #label>
              <div style="font-size:20px; font-weight:600">期</div>
            </template>
            <el-input v-model="formData.issue" placeholder="请输入期号"></el-input>
          </el-form-item>
          <el-form-item prop="page">
            <template #label>
              <div style="font-size:20px; font-weight:600">页</div>
            </template>
            <el-input v-model="formData.page" placeholder="请输入页码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="showBox = true" style="float:left; margin-left:220px">上传</el-button>
            <el-dialog title="上传确认" :visible.sync="showBox" :show-close="false" :close-on-click-modal="false" width="25%">
              <div style="font-size:15px">确认上传该论文吗？</div>
              <template #footer>
                <el-button @click="showBox = false">取&nbsp;消</el-button>
                <el-button type="primary" @click="submit('form')">确&nbsp;定</el-button>
              </template>
            </el-dialog>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "AddArticle",
  data(){
    return{
      form: null,
      formData: {
        title: '',
        authors: '',
        date: '',
        doi: '',
        abstract: '',
        journal: '',
        volume: '',
        issue: '',
        page: '',
      },
      file: null,
      showBox: false,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
        ],
        authors: [
          { required: true, message: '请输入作者', trigger: 'blur' },
        ],
        date: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
        ],
        
      }
    }
  },
  components:{
    
  },
  methods:{
    submit(form){
      this.showBox = false;
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$message({
            message: '已提交上传请求',
            type: 'success',
          });
          this.addAch();
        }
      });
    },

    async addAch(){
      let formData = {
        type: 1,
        title: this.formData.title,
        authors: this.formData.authors,
        date: this.formData.date,
        doi: this.formData.doi,
        description: this.formData.abstract,
        journal: this.formData.journal,
        volume: this.formData.volume,
        issue: this.formData.issue,
        page: this.formData.page,
        userId: 1,
      }
      const {data:res} = await this.$http.post("/achievement/addAch", formData);
      if (res.status === 200){
        this.$message({
          message: '上传成功',
          type: 'success',
        });
        router.push('/');
      }
      else {
        this.$message({
          message: '上传失败',
          type: 'error',
        });
      }
    }
  }
}
</script>

<style scoped>
.main-title {
  font-size: 30px;
  font-weight: 1000;
  margin-top: 30px;
}
.el-card {
  width: 700px;
  margin-top: 40px;
  margin-left: 130px;
}
.el-input {
    width: 400px;
    float: left;
    margin-left: 30px;
}
</style>