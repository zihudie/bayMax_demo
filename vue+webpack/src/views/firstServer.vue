<template>
  <div class="hello">
    <p>{{msg}}</p>
    <router-link to="/module1/test">1</router-link>
    <router-link to="/module1/test2">2</router-link>
    <div class="img">
      <img src="../../static/images/logo.png" alt />
    </div>
    <div id="img"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "first server this needs  ........"
    };
  },
  mounted() {
    document.getElementById(
      "img"
    ).innerHTML = `<img src="../../static/images/logo.png" alt /><div class="jscss">for test</div>`;
  },
  methods: {
    foo() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
.img {
  background: url("../../static/images/picverify.png") no-repeat;
}
/* >>> */
#img .jscss {
  color: red;
  border: 1px solid red;
}
</style>
