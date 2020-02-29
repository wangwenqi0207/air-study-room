<template>
  <div class="gif">
      <!-- <p class="count">{{count}}</p> -->
      <div @click="close" class="close">
          <i class="iconfont icon-shengyin1" v-show="show_iocn"></i>
          <i class="iconfont icon-shengyinguanbi" v-show="show_iocn2"></i>
      </div>
      <div class="animation">
          <img src="../assets/img/5.gif" alt="">
      </div>
      <audio id='music' :src="ling" class="media-audio" ref="MusicPlay" autoplay></audio>
  </div>
</template>

<script>
export default {
  name: 'animation',
  data () {
    return {
      count:3,
      ling:require("../assets/ling.mp3"),
      show_iocn:true,
      show_iocn2:false,
    }
  },
  methods: {
     close() {
        var audio = document.getElementById('music');
        if (audio.paused) {
          audio.play();  // 播放
          this.show_iocn=true;
          this.show_iocn2 = false;
        } else {
          this.show_iocn=false;
          this.show_iocn2 = true;
          audio.pause();// 暂停
        }
     }
  },
  //vue设置背景色
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#F5B754')
    var _this = this
    setTimeout(function(){
          _this.$router.push('/studentId');
    },8200)     
 },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
 }
}
</script>

<style scoped>
.animation{
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);
}
.animation img{
    width: 100%;
    height: 10rem;
}
.close{
    float: right;
    margin-right: .5rem;
    margin-top:.5rem;
}
.close i{
    font-size: .7rem;
    color: #fff;
}
</style>
