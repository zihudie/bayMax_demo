import getCommand from './get-command';
import form from './form';
import Sortable from 'sortablejs';

/**
 * 表单加载数据和保存数据通用流程
 */
export default {
  mixins: [
    getCommand,
    form
  ],

  data() {
    return {
      gridPageSize: [10, 20, 30, 50],
      gridLayout: 'total, sizes, prev, pager, next, jumper',
      tableSortAble: false,
      sortable: null,
      sendingData: undefined,
      option: undefined,
    };
  },
  watch: {
    // filters:{
    //   handler:(val,oldVal)=>{
    //     console.log(val,oldVal)
    //   },
    //   // 深度观察
    //   deep:true
    // },

    newList(data) {
      if (data.length !== 0 && !_.isEqual(data, this.oldList.slice())) {
        this.doSave({ action: 'saveSort', type: 'save' });
      }
    },
    tableSortAble(data) {
      if (data) {
        this.setSort();
      } else {
        this.sortable.destroy();
      }
    }
  },

  computed: {
    tableList() {
      let list = [];
      if (!_.isUndefined(this.sendingData)) {
        list = _.result(this, this.sendingData);

        // 判断filters是否有传参数
        const filterNow = _.some(this.filters, o => !_.isEmpty(o));
        if (filterNow) {
          this.tableSortAble = false;
        }
      }
      return list;
    },
    oldList() {
      if (this.tableSortAble && this.tableList && this.tableList.length > 0) {
        return this.tableList.map(o => o[this.option]);
      }
      return [];
    },
    newList() {
      if (this.tableSortAble && this.tableList && this.tableList.length > 0) {
        return this.oldList.slice();
      }
      return [];
    },
  },
  methods: {
    gridSearch() {
      this.filters.page = 1;
      this.doGet({ action: 'getGrid' });
    },
    gridSizeChange(val) {
      this.filters.limit = val;
      this.doGet({ action: 'getGrid' });
    },
    gridCurrentChange(val) {
      this.filters.page = val;
      this.doGet({ action: 'getGrid' });
    },

    getSummaries() {
      const fStatistic = [];
      _.each(this.statistic, (statisticInfo) => {
        fStatistic[statisticInfo.index] = statisticInfo.format ?
          statisticInfo.format(_.result(this, statisticInfo.prop)) : _.result(this, statisticInfo.prop);
      });
      if (!fStatistic[0]) {
        fStatistic[0] = '总计';
      }

      return fStatistic;
    },

    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '');
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const list = this.tableList;
          const targetRow = list.splice(evt.oldIndex, 1)[0];
          list.splice(evt.newIndex, 0, targetRow);

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
        }
      });
    },
    initSort(api, sortAble, sendingData, option) {
      this.tableSortAble = sortAble;
      this.option = option;
      this.sendingData = sendingData;
      this.bindSave(api, 'saveSort', 'newList', {

      });
    }
  },
  // mounted(){
  //   this.$nextTick(() => {
  //     if(this.tableSortAble){
  //       this.setSort()
  //     }
  //   })
  // }
};
