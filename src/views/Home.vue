<template>
  <div class="home" style="background: rgb(244,244,244) ;">
    <div style="width: 100vw; height: 100vh; overflow: hidden; z-index: 0;">
      <navbar></navbar>
      <div>
        <img :src="door" style="object-fit: contain" alt="">
      </div>
    </div>
    <div style="color: white;position: absolute; top: 20vh; left: 15vw;width: 70vw; font-size: 80px; font-weight: 1000;"
         class="wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay="0.05s">
      Access <br>
      By <br>
      ResearchDoor <br>

    </div>
    <div style="position: absolute; top: 65vh; left: 15vw;width: 70vw" class="wow bounceInUp" data-wow-duration="2.5s"
         data-wow-delay="0.25s">
      <div class="search">
        <el-input style="width: 60vw; " placeholder="search for publication, author or questions" v-model="searchinput"
                  class="input-with-select">
          <el-select style="width:120px" v-model="select" slot="prepend" placeholder="select">
            <el-option label="publication" value="1"></el-option>
            <el-option label="author" value="2"></el-option>
            <el-option label="questions" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>

    <div style=" width: 100vw; height: 500vh; background: rgb(244,244,244) ;">
      <div style="width: 55vw; margin-left: 10vw;float: left;">
        <div style="margin: 3vw auto;" v-for="i in 5">
          <ScholarDetails author="Yijun Huang" style="width: 45vw;"
                          title="A brief review for deep Visual Odometry since 2016"
                          description="August 2022"
                          read-cnt="1145">

          </ScholarDetails>
        </div>
      </div>
      <div style="width: 25vw;margin-right: 10vw; float: right;">
        <div style="margin: 3vw auto;">
          <el-card shadow="hover" style="width: 25vw;border-radius: 1vw" header="Who to follow">
            <div v-for="i in 10">
              <el-avatar shape="circle" size="20px" style="float: left; margin-right: 1vw;"></el-avatar>
              <div class="name-box">
                <div class="author-name">Yeqi Gao</div>
                <div class="author-description">Extended network</div>
              </div>
              <div style="float: right; vertical-align: center; margin-bottom: 2vw; margin-right: 2vw;"
                   class="author-name">
                Follow
              </div>
              <el-divider>

              </el-divider>
            </div>
          </el-card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from "../components/Navbar";
import WOW from "wow.js";
import ScholarDetails from "../components/Scholar/ScholarDetails";

export default {
  name: 'Home',
  components: {
    Navbar,
    HelloWorld,
    ScholarDetails
  },
  data() {
    return {
      door: require('../assets/images/Home/door.jpg'),
      select: ''
    }
  },
  mounted() {

    const wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null, // optional scroll container selector, otherwise use window,
      resetAnimation: true, // reset animation on end (default is true)
    });
    wow.init();
  }
}
</script>
<style>
.author-name {
  display: flex;
  flex-direction: row;
  justify-content: left;
  color: dodgerblue;
}

.author-name:hover {
  cursor: pointer;
  text-decoration: underline;
}

.author-description {
  display: flex;
  flex-direction: row;
  justify-content: left;
}
</style>
