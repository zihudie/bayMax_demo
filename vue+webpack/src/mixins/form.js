import resetForm from './reset-form';
import serviceCommand from './service-command';
import getCommand from './get-command';
import loading from './loading';
import formValidator from './form-validator';

/**
 * 表单加载数据和保存数据通用流程
 */
export default {
  mixins: [
    serviceCommand,
    resetForm,
    formValidator,
    getCommand,
    loading
  ],

  methods: {
    bindSave(api, action, sendingData,
      {
        callback = this.$_defaultSendingCommandFunc,
        successMessage = '',
        beforeSend = (data) => data,
        afterSuccess = _.noop,
        afterFail = _.noop
      } = {}
    ) {
      this.bindCommand({
        type: 'save',
        api,
        sendingData,
        callback,
        beforeAction: beforeSend,
        action
      },
        {
          successMessage,
          afterSuccess,
          afterFail
        }
      );
    },

    doSave({ action, form }) {
      if (form) {
        this.doAction({ type: 'save', action, canExec: this.$_validateForms(form) });
      } else {
        this.doAction({ type: 'save', action });
      }
    },

    $_defaultSendingCommandFunc([result, data],
      {
        successMessage = '',
        errorMessage = `操作失败.${data && data.message}`,
        afterSuccess,
        afterFail
      }
    ) {
      if (result) {
        if (successMessage) {
          this.$dialog.toast({
            mes: successMessage,
            type: 'success',
            position: "top"
          });
        }

        if (afterSuccess) {
          afterSuccess([result, data]);
        }
      } else {
        if (afterFail === _.noop) {
          this.$dialog.notify({
            mes: errorMessage,
            duration: 2000
          });
        } else {
          afterFail([result, data]);
        }
      }
    },
  }
};
