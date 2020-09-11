export default {
  install (Vue) {
    Vue.prototype.$handleError = function (err, msg) {
      if (err === false || err === 'cancel') return
      console.log('===> error', err, msg)
      let message = msg
      if (typeof err === 'string') {
        message = err
      } else if (err && (err.message || err.msg || err.errMsg)) {
        message = err.message || err.msg || err.errMsg
      }
      if (message) {
        this.$message.error(message)
      }
    }
  }
}
