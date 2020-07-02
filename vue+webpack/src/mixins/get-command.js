import serviceCommand from './service-command'
import loading from './loading'
import formValidator from './form-validator'

export default {

  mixins: [
    serviceCommand,
    formValidator,
    loading
  ],

  methods: {
    getAll({ globalLoading = true } = {}) {
      if (globalLoading) {
        this.startLoading()
      } else if (!_.isUndefined(this.loading)) {
        this.loading = true
      }

      const bindings = this.getBindings({ type: 'get' })

      this.$_execCommand(bindings).finally(() => {
        if (globalLoading) {
          this.closeLoading()
        } else if (!_.isUndefined(this.loading)) {
          this.loading = false
        }
      })
    },

    doGet({ action, form }) {
      if (form) {
        this.doAction({ type: 'get', action, canExec: this.$_validateForms(form) })
      } else {
        this.doAction({ type: 'get', action })
      }
    },

    bindGet(api, bindingData,
      {
        callback = this.$_defaultGetCommandFunc,
        format = (data) => data,
        successMessage = '',
        sendingData = {},
        beforeSend = (data) => data,
        action = api.name,
        afterSuccess = _.noop,
        afterFail = _.noop
      } = {}
    ) {
      this.bindCommand({
        type: 'get',
        api,
        bindingData,
        sendingData,
        beforeAction: beforeSend,
        callback,
        action
      },
        {
          successMessage,
          afterSuccess,
          afterFail,
          format
        }
      )
    },

    $_defaultGetCommandFunc([result, data],
      {
        bindingData,
        successMessage = '',
        afterSuccess,
        afterFail,
        format
      }
    ) {
      if (result) {
        this[bindingData] = format(data)
        if (successMessage) {
          this.$dialog.toast({
            mes: successMessage,
            type: 'success',
            position: 'top'
          })
        }

        if (afterSuccess) {
          afterSuccess([result, data])
        }
      } else {
        if (afterFail === _.noop) {
          const { code, message } = data
          this.$dialog.toast({
            mes: `${message || '网络异常'}`,
            type: 'error'
          })
          // ( ${code || '504'} )
        } else {
          afterFail([result, data])
        }
      }
    }
  }
}
