export default {
  install (Vue) {
    Vue.prototype.$handleError = function (err) {
      if (err === false) return
      let message = ''
      if (typeof err === 'string') {
        message = err
      } else if (err && err.message) {
        message = err.message
      }
      if (message) {
        this.$message.error(message)
      }
    }
  }
}
