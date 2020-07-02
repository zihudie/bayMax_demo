import axios from 'axios'

export default {

  data() {
    return {
      $_commands: []
    }
  },

  methods: {
    bindCommand({
      api,
      bindingData,
      sendingData,
      callback,
      commandType,
      type,
      beforeAction = (data) => data,
      action = api.name
    }, restOps) {
      this.$data.$_commands.push({
        type,
        api,
        bindingData,
        sendingData,
        beforeAction,
        action,
        callback,
        ...restOps
      })
    },

    doAction({ type, action, canExec = [Promise.resolve(true)] }) {
      const bindings = this.getBindings({ type, action })
      if (!_.isEmpty(bindings)) {
        return this.$_execCommand(bindings, canExec)
      } else {
        throw new Error(`没有找到对应的action:${action}, type:${type}`)
      }
    },
    getBindings(params) {
      return _.filter(this.$data.$_commands, params)
    },
    async $_execCommand(bindings, canExec = [Promise.resolve(true)]) {
      try {
        if (await Promise.all(canExec)) {
          // if (!_.isUndefined(this.loading)) this.loading = true;
          const execPromises = _.map(bindings, (binding) => {
            console.log('binding', binding)

            if (_.isString(binding.api)) {
              return this.$store.dispatch(binding.api, binding.beforeAction(this.$_getProps(binding.sendingData)))
                .then((repo) => {
                  binding.callback(repo, binding)
                })
            } else {
              return binding.api(binding.beforeAction(this.$_getProps(binding.sendingData))).then((repo) => {
                binding.callback(repo, binding)
              })
            }
          })

          return axios.all(execPromises).finally(() => {
            // if (!_.isUndefined(this.loading)) this.loading = false;
          })
        }
      } catch (e) {
        return Promise.resolve(true)
      }

      // const result = await Promise.all(canExec);.then(() => {
      //
      // }).catch(() => {
      // });
    },

    $_getProps(props) {
      if (_.isObject(props)) {
        return props
      } else if (_.isString(props)) {
        return _.result(this, props)
      } else {
        return undefined
      }
    }
  }
}
