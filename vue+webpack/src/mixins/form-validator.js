export default {
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'wb-invalid': field.$invalid && field.$dirty
        }
      }
    },
  },
};

