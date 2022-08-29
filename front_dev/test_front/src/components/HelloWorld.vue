<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="form.id">
    <span>{{click}}</span>
    <button @click="clickbutton()">search name</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      click: "null",
      form:{
        id: "1",
      }
    }
  },
  methods: {
    async clickbutton(){
        const {data:res} = await this.$http.post("test",this.form);
        console.log(res);
        if(res==='')
          this.click = 'can not find';
        else
          this.click = res.name 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
