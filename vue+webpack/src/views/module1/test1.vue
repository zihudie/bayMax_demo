<template>
  <div>
    i am module1 test1
    <div>
      <p>[state && actions change]:{{t1}}</p>
      <p>[gettersLength]:{{todoGetters}}</p>
    </div>
    <div>{{t2}}</div>
    <div>
      <input style="height:2rem;border:1px solid #ffefef;" type="text" v-model="t2" />
    </div>
    <!-- // ssr
    // 前端工程化
    // 模块化  amd cmd module  
    // 组件化  支付组件，输入交易密码-->
    <p>前端模块化</p>
    <div>
      amd
      cmd
      import export
    </div>
    <div>组件化，支付组件，交易密码弹框。 页面是组件的容器。可自由组合。</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "test1",
  data() {
    return {
      msg: "test1",
      t1: "",
      t2: ""
    };
  },
  methods: {
    foo() {
      console.log("method foo init");
    }
  },
  watch: {
    t1() {
      console.log("watch", "t1 改变了。。。。。");
    }
  },
  computed: {
    ...mapGetters(["todoGetters"])
  },

  beforeCreate() {
    console.log("beforeCreate");
    console.log(this.t1);
    this.foo();
  },
  methods: {
    foo() {
      console.log("foo......");
    }
  },
  create() {
    console.log("create");
    console.log(this.t1);
    this.foo();
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
    this.$store.commit("increment", "测试");
    this.t1 = this.$store.state.module1;
    this.$store.dispatch("incrementAsync", "actions commit").then(data => {
      this.t1 = this.$store.state.module1;
    });

    // this.post
    // this.$post(
    //   "ADDRESS",
    //   {},
    //   function(data) {
    //     cosole.log("success.......");
    //   },
    //   function(err) {
    //     console.log("error.........");
    //   }
    // );
    this.t2 = "data update ";
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>