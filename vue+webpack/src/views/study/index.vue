<template>
  <div class="hello">
    <p class="title">吴心雨要学习啦~~</p>
    <p class="img-mode">
      <img src="./logo.jpg" alt />
    </p>

    <div class="study-body">
      <button class="begin" @click="getWord">开始</button>
      <button class="finish" @click="gameover">结束</button>

      <div style="text-align:center">
        <span>{{curWord}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      curWord: "",
      timer: null,
      msg: "Welcome to Link test"
    };
  },
  methods: {
    getWord() {
      this.curWord = "努力寻找中。。。";
      this.timer = setTimeout(() => {
        let num = Math.ceil(Math.random() * (this.wordsArr.length - 1));
        console.log(num);
        this.curWord = this.wordsArr[num];
      }, 1000);
    },
    gameover() {
      this.timer = null;
    }
  },
  mounted() {
    this.wordsArr = ["春花秋月", "战斗", "蝌蚪", "选择", "可爱"];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="scss" scoped>
.study-body {
  width: 400px;
  margin: 0 auto;
}
button {
  width: 100px;
  line-height: 40px;
  background: red;
  border: 1px solid #999;
}
.begin {
  background: green;
}
.finish {
  float: right;
}
.title {
  color: red;
  text-align: center;
}
.img-mode {
  width: 400px;
  height: 360px;
  margin: 10px auto;

  vertical-align: middle;
  text-align: center;
  border: 1px solid red;
}
.img-mode img {
  vertical-align: middle;
  width: 300px;
  margin-top: 50px;
  animation: fadeIn 1s infinite alternate;
  /* height: 300px; */
}
@keyframes fadeIn {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
