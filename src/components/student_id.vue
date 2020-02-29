<template>
  <div class="studentId">
      <div class="study_card">
        <h4 class="study_card_title">学生证</h4>
        <div class="photo">
            <input type="file" multiple="multiple" accept="image/*" 
                    ref="file"  id='imgFile' @change="getFile"/>
            <img :src=srcbox alt="" class="user_box"/>
        </div>
        <div class="info_box">
            <form action="">
            <div class="form_input">
                <span>姓名</span>
                <input type="text" class="name" placeholder="请填写" v-model.trim="name">
            </div>
            <div class="form_input">
                <span>性别</span>
               <label class="sex sex1"  v-bind:class="{ active: isChoose1 }"><input name="sex" type="radio" value="m" v-model='selectStatus' @change="handle"/>男</label>
               <label class="sex"  v-bind:class="{ active: isChoose2 }"><input name="sex" type="radio" value="f" v-model='selectStatus' @change="handle"/>女</label>
            </div>
        </form>
        <div class="study_info">
            <p><span>学号</span>{{student_id}}</p>
            <p><span>入学日期</span>{{student_date}}</p>
        </div>
        <div class="study_info_logo">
            <p>空中</p>
            <p>自习室</p>   
        </div>
        </div>
      </div>
      <div class="go_study" @click="go_study">去自习</div>
  </div>
</template>

<script>
export default {
  name: 'studentId',
  data () {
    return {
      name:"",
      srcbox:require("../assets/img/card.png"),
      selectStatus:"",
      isChoose1:false,
      isChoose2:true,
      student_id:"20191120001",
      student_date:"2019年11月20日"
    }
  },
  methods: {
        getFile (e) {
        let _this = this
        let files = e.target.files[0]
        if (!e || !window.FileReader) return  
        let reader = new FileReader()
        reader.readAsDataURL(files) 
        reader.onloadend = function () {
          _this.srcbox = this.result
        }
        this.filesName =files.name;
        //console.log(this.filesName); 
       },

        handle(){
        // console.log("取到的值是"+this.selectStatus);
        if(this.selectStatus=='m'){
            this.isChoose1 = false;
            this.isChoose2 = true;
        }
        if(this.selectStatus=='f'){
            this.isChoose1 = true;
            this.isChoose2 = false;
        }
      },

      go_study(){
        this.$router.push('/studentRoom');
      }
  },
 mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#F5B754')
 },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
 }
}
</script>

<style scoped>
.studentId{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
}
.study_card{
    width: 80%;
    height: 17rem;
    background: #fff;
    margin: 0 auto;
    margin-top:3rem;
    border-radius: .5rem;
}
.study_card_title{
    font-size: .7rem;
    text-align: center;
    font-weight: 600;
    padding-top: 1rem;
}
.go_study{
    width: 60%;
    height: 1.7rem;
    line-height: 1.7rem;
    background: #494949;
    font-size: .9rem;
    font-weight: 600;
    color: #fff;
    margin:0 auto;
    text-align: center;
    border-radius: 10rem;
    font-family: "宋体";
    margin-top:2rem;
    margin-bottom:2rem;
}
.photo{
    width: 4.7rem;
    height: 3.3rem;
    margin: 0 auto;
    margin-top:.5rem;
    z-index: 200;
    /* 定位元素才能用z-index */
    position: relative;  
}
#imgFile{
    width: 100%;
    height: 100%;
    position: relative;
    opacity: 0;
    z-index: 200;
}
.user_box{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    z-index: 1;
}
form{
    margin-top: .5rem;
    margin-left: 2.4rem;
    margin-bottom: 3rem;
}
.form_input{
    display: flex;
    width: 13rem;
    margin-top: 1rem;
}
.form_input .name{
    width: 3rem;
    font-size: .7rem;
    font-weight: 600;
}
form span{
    font-size: .7rem;
    margin-right: 1.3rem;
    font-weight: 600;
}
.sex1{
    margin-right: 1.6rem;
}
.sex{
    font-size: .7rem;
    font-weight: 600;
}
.sex input{
     opacity: 0;
}
.active{
    color:#ccc;
}
.info_box{
    position: relative;
}
.study_info {
    width: 100%;
}
.study_info span{
    display: inline-block;
    width: 30%;
    font-size: .6rem;
    font-weight: 600;
    text-align: right;
    margin-right: 1rem;
}
.study_info p{
    font-size: .6rem;
    font-weight: 600;
    margin-bottom: 1rem;
}
.study_info_logo{
    width: 3rem;
    height: 3rem;
    font-size: .7rem;
    color: #D2000D;
    font-family: "宋体";
    font-weight: 600;
    border: .2rem solid #D2000D;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: rotate(-31deg);
    position: absolute;
    right:1rem;
    top:6rem;
}
.study_info_logo p{
    margin-bottom: .2rem;
}
</style>
