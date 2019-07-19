<template>
  <div class="flex-layout">
    <div class="flex-head">
      <div class="text-center pt2">I am banner or title</div>
    </div>
    <div class="flex-con">
      <div class="scroll-con clear">
        <my-scroll :config="srcrollConfig" :itemFn="itemChangeFn">
          <template slot="list" slot-scope="props">
            <div>
              <p class="pd-name">{{props.item.creator}}</p>
              <p class="pd-price">{{props.item.role_name}}</p>
              <p class="pd-sold">{{props.item.role_code}}</p>
            </div>
          </template>
        </my-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import myScroll from "../components/mescroll";
export default {
  data() {
    return {
      srcrollConfig: {
        // 默认请求地址
        urlKey: "QUERY_ROLE",
        // list字段名
        listName: "",
        urlData: {},
        empty: {}
      }
    };
  },
  mounted() {},
  methods: {
    itemChangeFn(val) {
      console.log("I can do sth here now");
      console.log(val);
    }
  },
  components: {
    myScroll
  }
};
</script>
<style lang="scss" scoped>
.scroll-con {
  height: 100%;
}
.flex-head {
  height: 5rem;
  width: 100%;
  background-color: #e8e7e7;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
