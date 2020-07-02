export default {
  data() {
    return {
      formItem: undefined,
      codeOps: {
        countDownTime: consts.COUNT_DOWN_TIME,
        countdown: 0,
        firstTime: true,
        countdownTimer: undefined,
        codeError: '',
      },

      tDefaults: '发送验证码',
      tSending: '',
      tReSend: '重新发送验证码',
      sendingData: 'form',
      sendingCode: false,
    };
  },

  computed: {
    codeBtnText() {
      if (this.sendingCode) {
        return `${this.tSending} ${this.codeOps.countdown}s`;
      } else if (this.codeOps.firstTime) {
        return this.tDefaults;
      } else {
        return this.tReSend;
      }
    }
  },
  mounted() {
    this.bindGet(this.codeApi, 'mobileData', {
      action: 'getCode',
      sendingData: this.sendingData,
      successMessage: '发送成功',
      beforeSend: (data) => {
        this.codeOps.codeError = '';
        return data;
      },
      afterSuccess: () => {
        this.$_countDown();
      },
      afterFail: ([result, data]) => {
        this.$dialog.toast({
          mes: data.message
        });
      }
    });
  },

  methods: {
    /**
     * 
     * @param {*} 依赖顶象的回调
     */
    sendCode({ formItem } = {}) {
      if (this.codeOps.countdown === 0) {
        this.doGet({ action: 'getCode', form: this.formItem });
      }
    },
    doCodeCallback() {
      if (this.codeOps.countdown === 0) {
        this.doGet({ action: 'getCode', form: this.formItem });
      }
    },
    $_restCount() {
      this.codeOps.firstTime = false;
      this.sendingCode = false;
      this.codeOps.countdown = 0;
      this.sendingCode = false;
    },

    $_countDown() {
      this.codeOps.firstTime = false;
      this.sendingCode = true;
      this.codeOps.countdown = this.codeOps.countDownTime;
      this.codeOps.countdownTimer = setInterval(() => {
        if (this.codeOps.countdown > 1) {
          --this.codeOps.countdown;
        } else {
          this.codeOps.countdown = 0;
          this.sendingCode = false;
          clearInterval(this.codeOps.countdownTimer);
        }
      }, 1000);
    },
  }
};
