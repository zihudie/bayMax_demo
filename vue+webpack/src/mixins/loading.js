
export default {

  data() {
    return {
      loading: false
    };
  },

  methods: {
    startLoading() {
      this.$dialog.loading.open()
    },

    closeLoading() {

      setTimeout(_ => {
        this.$dialog.loading.close()
      }, 500)


    }
  }

};
