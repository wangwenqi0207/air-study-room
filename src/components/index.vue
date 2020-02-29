<template>
  <div class="index">
    <h4 class="index-text">一起迎接美好</h4>
    <div class="index-buttons" @click="go_animation">
        <div class="index-button-left"></div>
        <p>空中自习室</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  methods: {
        go_animation(){
          this.$router.push('/animation'); 
        }
      },
}
</script>

<style scoped>
.index-text{ 
  margin:0 auto;
  width:1rem;
  text-align:center;
  margin-top:5rem;
  line-height: 1.5rem;
} 
.index-buttons{
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
  justify-content: center;
}
.index-button-left{
  width: 1.2rem;
  height: 1.2rem;
  background: #ccc;
  border:1px solid #000;
  border-radius: .2rem;
}
.index-buttons p{
  font-size: .7rem;
  margin-left: .4rem;
}
</style>
