import Table from './Table'
import Forms from './Forms'

export default {
  Table,
  Forms,
  install (Vue) {
    Vue.component('Table', Table)
    Vue.component('Forms', Forms)
  }
}
