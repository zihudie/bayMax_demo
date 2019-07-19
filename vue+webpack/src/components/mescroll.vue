<template>
  <!--标题-->
  <!--滑动区域-->
  <div ref="mescroll" class="mescroll">
    <!--筛选条件; 模拟列表的重置和演示空布局的使用-->
    <!--展示上拉加载的数据列表-->
    <ul id="dataList" class="data-list">
      <li v-for="(item,index) in dataList" :key="index" v-on:click="itemFn(item)">
        <slot :item="item" name="list"></slot>
      </li>
    </ul>
  </div>
</template>
<script>
// 引入mescroll.min.js和mescroll.min.css
import MeScroll from "mescroll.js/mescroll.min.js";
import "mescroll.js/mescroll.min.css";
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          // 默认请求地址
          urlKey: "ORDER_LIST",
          // list字段名
          listName: "",
          empty: {},
          urlData: {}
        };
      }
    },
    itemFn: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      down: {},
      mescroll: null, // mescroll实例对象
      // 下拉刷新的所有配置项
      mescrollDown: {
        use: true, // 是否初始化下拉刷新; 默认true
        auto: true, // 是否在初始化完毕之后自动执行下拉回调callback; 默认true
        autoShowLoading: false, // 如果在初始化完毕之后自动执行下拉回调,是否显示下拉刷新进度; 默认false
        isBoth: false, // 下拉刷新时,如果滑动到列表底部是否可以同时触发上拉加载;默认false,两者不可同时触发;
        callback: function(mescroll) {
          mescroll.resetUpScroll();
        }
      },
      mescrollUp: {
        isBounce: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }

        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        toTop: {
          src: "./public/mescroll/mescroll-totop.png" // 回到顶部按钮的图片路径,支持网络图
        },
        htmlNodata: '<p class="upwarp-nodata"> -- 暂无更多数据 --</p>',
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: "dataList", // 父布局的id;
          icon: "./public/mescroll/mescroll-empty.png", // 图标,支持网络图
          tip: "暂无相关数据~" // 提示
          //   btntext: "去逛逛 >", // 按钮,默认""
          //   btnClick() {

          //     // 点击按钮的回调,默认null
          //     alert("点击了按钮,具体逻辑自行实现");
          //   }
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      },
      dataList: [] // 列表数据
    };
  },
  mounted() {
    this.mescrollInit();
  },
  methods: {
    changeFn(item) {
      console.log(item);
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit() {
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        up: this.mescrollUp,
        down: this.mescrollDown
      });
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      let sendData = Object.assign(
        {},
        {
          num: page.num, //页码
          size: page.size //每页长度
        },
        this.config.urlData
      );
      this.$post(
        this.config["urlKey"],
        { data: sendData },
        data => {
          let arr = [];
          if (this.config.listName) {
            arr = data.retObj[this.config.listName];
          } else {
            arr = data.retObj;
          }
          // 如果是第一页需手动制空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
        },
        err => {
          mescroll.endErr();
        }
      );
    }
  }
};
</script>
<style>
/* 以fixed的方式固定mescroll的高度 */
.mescroll {
  height: 100%;
}

.header {
  z-index: 9990;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-bottom: 1px solid #eee;
  background-color: white;
}

.header .btn-left {
  position: absolute;
  top: 0;
  left: 0;
  padding: 12px;
  line-height: 22px;
}
.mescroll-totop {
  display: none;
}
.swiper {
  width: 100%;
  vertical-align: bottom;
}

.nav {
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.nav p {
  display: inline-block;
  width: 30%;
  padding: 10px 0;
}

.nav .active {
  border-bottom: 1px solid #ff6990;
  color: #ff6990;
}

.data-list li {
  position: relative;
  font-size: 1.4rem;
  padding: 10px 8px 10px 15px;
  border-bottom: 1px solid #eee;
}

.data-list .pd-img {
  position: absolute;
  left: 18px;
  top: 18px;
  width: 80px;
  height: 80px;
}

.data-list .pd-name {
  line-height: 20px;
  overflow: hidden;
}

.data-list .pd-price {
  margin-top: 8px;
  color: red;
}

.data-list .pd-sold {
  margin-top: 8px;
  color: gray;
}
</style>
