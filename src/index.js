import tTable from './t-table'
import fForm from './f-form'
import dataTable from './dataTable'
import dataDialog from './dataDialog'

export default {
  tTable,
  fForm,
  dataTable,
  dataDialog,
  install (Vue) {
    if (typeof Vue.component('ElForm') !== 'function') {
      throw new Error('element ui should be install first')
    }
    Vue.component('tTable', tTable)
    Vue.component('fForms', fForm)
    Vue.component('dataTable', dataTable)
    Vue.component('dataDialog', dataDialog)
  }
}
