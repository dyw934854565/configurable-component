import Table from './Table'
import Forms from './Forms'
import dataTable from './dataTable'
import dataDialog from './dataDialog'

export default {
  Table,
  Forms,
  dataTable,
  dataDialog,
  install (Vue) {
    if (typeof Vue.component('el-form') !== 'function') {
      throw new Error('element ui should be install first')
    }
    Vue.component('Table', Table)
    Vue.component('Forms', Forms)
    Vue.component('dataTable', dataTable)
    Vue.component('dataDialog', dataDialog)
  }
}
