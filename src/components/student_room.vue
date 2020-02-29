<template>
  <div class="studentRoom">
    <div v-show="go_study" class="blackboard">
        {{text}}<span id="meClocker" >{{clocker}}</span>
    </div>
    <div v-show="go_rest" class="blackboard">
        {{text2}}<span id="meClocker" >{{clocker2}}</span>
    </div>
     <div class="seat_box">
         <div class="seat_background"  v-bind:class="{ seat_background2: isChoose }"></div>
        <div class="table_box">
            <div>
                <waterfall :col='col' :data="data"  @loadmore="loadmore"  @scroll="scroll" :isTransition=true>
                    <template>
                        <div class="cell-item" v-for="(item,index) in data" :key=index>
                            <p>{{item}}</p>
                            <div class="seat">
                                <div class="seat_son" @click="seat_down('1',index)" :class="activeClass == index ? 'active' : ''" >
                                    <p>+</p>
                                </div>
                                <div class="seat_son" @click="seat_down('2',index)" :class="activeClass2 == index ? 'active2' : ''" >
                                    <p>+</p>
                                </div>
                            </div>
                        </div>
                    </template>
                </waterfall>
            </div>
        </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'studentRoom',
  data () {
    return {
        isChoose:false,
        activeClass: -1,  //一开始样式不显示
        activeClass2: -1,
        data:["坐这里","坐这里","坐这里","坐这里","坐这里","坐这里","坐这里","坐这里","坐这里","坐这里"],
        col:2,
        timer: "",//定义一个定时器的变量
        startTime: null,
        endTime: null,
        currentTime: Math.round(new Date().getTime()/1000),
        go_study:false,
        go_rest:false,
        clocker: "", //显示倒计时
        clocker2: "",
        timeobj: null, //时间对象
        text:'自习时间还剩：',
        text2:'休息弹幕时间：'
    }
  },
  created() {
      var calss1_start2 = Math.round(new Date(new Date(new Date().getTime()).setHours(8,45,0,0))/1000)  //获取当天8点 开始时间

    //var calss1_start = Math.round(new Date(new Date(new Date().getTime()).setHours(8,0,0,0))/1000)
      var calss1_end = Math.round(new Date(new Date(new Date().getTime()).setHours(9,0,0,0))/1000)  //下课时间

    //var rest_start = Math.round(new Date(new Date(new Date().getTime()).setHours(9,0,0,0))/1000)
      var rest_end = Math.round(new Date(new Date(new Date().getTime()).setHours(19,0,0,0))/1000)  //休息时间

      this.endTime = calss1_end;
    // this.startTime = calss1_start;
      this.endTime2 = rest_end;
    // this.startTime2 = rest_start;
      console.log('我是时间差',calss1_end - calss1_start2 ) //45分钟 2700  15分钟900

      if(this.currentTime >= calss1_start2){
          console.log("上课啦")
          this.go_study = true;
          this.begin();
        }   
  },

	methods:{
    //上课倒计时
    begin(){
      let timeLag = parseInt(this.endTime) - parseInt(this.currentTime);
      // if(timeLag>=0){
      //     // this.shows = true;
      // }
      let add0 = num => {
        return num < 10 ? "0" + num : num;
      };
      let timeFunction = () => {
        // time为两个时间戳之间相差的秒数
        let time = timeLag--;
        //打印出时间对象
        this.timeobj = {
          seconds: time % 60,
          minutes: Math.floor(time / 60) % 60,
          hours: Math.floor(time / 60 / 60) % 24,
          days: Math.floor(time / 60 / 60 / 24),
          weeks: Math.floor(time / 60 / 60 / 24 / 7),
          months: Math.floor(time / 60 / 60 / 24 / 30),
          years: Math.floor(time / 60 / 60 / 24 / 365)
        };
        this.clocker = 
            `
            ${add0(this.timeobj.hours)}:
            ${add0(this.timeobj.minutes)}: 
            ${add0(this.timeobj.seconds)}
            `;
        // 当时间差小于等于0的时候证明倒计时已经过结束
        if (time <= 0) {
          clearInterval(go);
          this.go_study = false;
          this.go_rest = true;
          this.begin2();
        }
      };

      //此处调用函数避免前一秒倒计时不显示
      timeFunction();
      let go = setInterval(function(){
        timeFunction();
      }, 1000);
    },

    //下课倒计时
    begin2(){
      let timeLag = parseInt(this.endTime2) - parseInt(this.currentTime);
      let add0 = num => {
        return num < 10 ? "0" + num : num;
      };
      let timeFunction = () => {
        // time为两个时间戳之间相差的秒数
        let time = timeLag--;
        //打印出时间对象
        this.timeobj = {
          seconds: time % 60,
          minutes: Math.floor(time / 60) % 60,
          hours: Math.floor(time / 60 / 60) % 24,
          days: Math.floor(time / 60 / 60 / 24),
          weeks: Math.floor(time / 60 / 60 / 24 / 7),
          months: Math.floor(time / 60 / 60 / 24 / 30),
          years: Math.floor(time / 60 / 60 / 24 / 365)
        };
        this.clocker2 = 
            `
            ${add0(this.timeobj.hours)}:
            ${add0(this.timeobj.minutes)}: 
            ${add0(this.timeobj.seconds)}
            `;
        // 当时间差小于等于0的时候证明倒计时已经过结束
        if (time <= 0) {
          clearInterval(go);
          this.go_study = true;
          this.go_rest = false;
          this.begin();
        }
      };

      //此处调用函数避免前一秒倒计时不显示
      timeFunction();
      let go = setInterval(function(){
        timeFunction();
      }, 1000);
    },

    //监听滚动 判断背景色
        scroll(scrollData){
            if(scrollData.scrollTop>=4){
                this.isChoose =true
                //console.log("我移动了")
            }
            if(scrollData.scrollTop<=0){
                this.isChoose =false
                // console.log("我回去了")
            }
                console.log(scrollData)
            },
            //列数
	    switchCol(col){
	        this.col = col
	        console.log(this.col)
          },
          //滚动到底部触发
	    loadmore(index){
	        this.data = this.data.concat(this.data)
        },

        //点击当前座位 当前座位加头像 因为我循环是两个座位用的一个index 所以传入参数区分
        seat_down(num,index){
            if(num ==1){
                this.activeClass = index;
                this.activeClass2 = -1;
            }
            if(num ==2){
                this.activeClass = -1;
                this.activeClass2 = index;
            } 
        }
	}
}
</script>

<style scoped>
/*底 #FBF0D2  桌#EAC27A 边#C38C53 位#668679 黑板边#67564F*/
.studentRoom{
    width: 100%;
}
.blackboard{
   width: 60%;
   height: 1.5rem;
   border:.3rem solid #67564F;
   border-bottom-right-radius:.3em;
   border-bottom-left-radius:.3em;
   border-top:none;
   background: #668679;
   position: fixed;
   top:0;
   left:50%;
   margin-left: -32%;
   z-index: 100;
   font-size: .6rem;
   color: #fff;
   line-height: 1.5rem;
   text-align: center;
}
.table_box{
    display: flex;
    justify-content: space-around;
    margin-top:4rem;
}
.seat_background{
    width: 100%;
    height: 90%;
    background: #FBF0D2;
    position: fixed;
    bottom: 0;
    left: 0;
}
.seat_background2{
    width: 100%;
    height: 100%;
    background: #FBF0D2;
    position: fixed;
    bottom: 0;
    left: 0;
}
.cell-item{
    width: 5rem;
    height: 3rem;
    background: #EAC27A;
    margin-bottom:2rem;
    text-align: center;
    line-height: 3rem;
    margin-left: .5rem;
    margin-right: .5rem;
    border-radius: .3rem;
    border-bottom: .2rem solid #C99659;
}
.cell-item p{
    font-size: .9rem;
    color: #fff;
}
.seat{
    display: flex;
    justify-content: space-around;
    margin-top:-0.6rem;
}
.seat_son{
    width: 1.3rem;
    height: 1.3rem;
    line-height: 1.2rem;
    border-radius: 50%;
    background: #668679;
    background-size: 1.3rem 1.3rem;
    border:.1rem solid #94b8a9;
}
.active{
     width: 1.3rem;
    height: 1.3rem;
    line-height: 1.2rem;
    border-radius: 50%;
    background-image: url("../assets/img/tx.jpg");
    background-size: 1.3rem 1.3rem;
    border:.1rem solid #94b8a9;
}
.active2{
     width: 1.3rem;
    height: 1.3rem;
    line-height: 1.2rem;
    border-radius: 50%;
    background-image: url("../assets/img/tx.jpg");
    background-size: 1.3rem 1.3rem;
    border:.1rem solid #94b8a9;
}
.seat_son p{
    color: #fff;
    font-size: .9rem;
}
.seat img{
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
}
</style>
