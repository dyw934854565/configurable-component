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
    Vue.component('Table', Table)
    Vue.component('Forms', Forms)
    Vue.component('dataTable', dataTable)
    Vue.component('dataDialog', dataDialog)
  }
}
