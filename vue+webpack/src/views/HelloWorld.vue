<template>
  <div class="hello">
    <p>{{msg}}</p>
    <router-link to="/module1/test">1</router-link>
    <router-link to="/module1/test2">2</router-link>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
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
.dabai {
  font-size: 3rem;
}
.baiduTest {
  color: red;
  font-size: 300rem;
}
</style>
