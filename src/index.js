import tTable from './component/t-table'
import fForm from './component/f-form'
import dataTable from './component/data-table'
import dataDialog from './component/data-dialog.vue'

import $handleError from './api/handle-error'
import $dataDialog from './api/data-dialog.js'

import optionsMixin from './mixin/options'
import arrayOrStringMixin from './mixin/arrayOrString'

import fCascader from './component/f-cascader'
import fCheckbox from './component/f-checkbox'
import fFile from './component/f-file'
import fSelect from './component/f-select'
import fRadiobox from './component/f-radiobox'
import fTags from './component/f-tags'

import tLink from './component/t-link'
import tTag from './component/t-tag'
import tBtns from './component/t-btns'
import tSwitch from './component/t-switch'

export default {
  arrayOrStringMixin,
  optionsMixin,
  tTable,
  fForm,
  fCascader,
  fCheckbox,
  fFile,
  fSelect,
  fRadiobox,
  fTags,
  tLink,
  tTag,
  tBtns,
  tSwitch,
  dataTable,
  dataDialog,
  install (Vue) {
    if (typeof Vue.component('ElForm') !== 'function') {
      throw new Error('element ui should be install first')
    }
    Vue.component('tTable', tTable)
    Vue.component('fForm', fForm)
    Vue.component('dataTable', dataTable)
    Vue.component('dataDialog', dataDialog)
    Vue.use($dataDialog)
    Vue.use($handleError)
  }
}
