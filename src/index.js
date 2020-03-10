import tTable from './t-table'
import fForm from './f-form'
import dataTable from './data-table'
import dataDialog from './data-dialog.vue'
import $dataDialog from './data-dialog.js'
import optionsMixin from './mixin/options'
import arrayOrStringMixin from './mixin/arrayOrString'

export default {
  arrayOrStringMixin,
  optionsMixin,
  tTable,
  fForm,
  dataTable,
  dataDialog,
  install (Vue) {
    if (typeof Vue.component('ElForm') !== 'function') {
      throw new Error('element ui should be install first')
    }
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
    Vue.component('tTable', tTable)
    Vue.component('fForm', fForm)
    Vue.component('dataTable', dataTable)
    Vue.component('dataDialog', dataDialog)
    Vue.use($dataDialog)
  }
}
