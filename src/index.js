import tTable from './component/t-table'
import fForm from './component/f-form'
import dataTable from './component/data-table'
import dataDialog from './component/data-dialog.vue'
import editPage from './component/edit-page.vue'

import $handleError from './api/handle-error'
import $dataDialog from './api/data-dialog.js'

import optionsMixin from './mixin/options'
import arrayOrStringMixin from './mixin/arrayOrString'

import fCascader from './component/f-cascader'
import fCheckbox from './component/f-checkbox'
import fFile from './component/f-file'
import fSelect from './component/f-select'
import fObjSelect from './component/f-obj-select'
import fRadiobox from './component/f-radiobox'
import fTags from './component/f-tags'
import fInputNumber from './component/f-input-number.vue'

import tLink from './component/t-link'
import tTag from './component/t-tag'
import tBtns from './component/t-btns'
import tBtn from './component/t-btn'
import tSwitch from './component/t-switch'
import tPreview from './component/t-preview'
import tDataMap from './component/t-data-map.vue'
import tColor from './component/t-color.vue'
import tDate from './component/t-date.vue'
import tLongText from './component/t-long-text.vue'

const components = [
  // 表单组件，可用于表格，就可以在表格中直接修改数据
  fCascader, fCheckbox, fFile, fSelect, fObjSelect, fRadiobox, fTags, fInputNumber,
  // 表格展示组件
  tLink, tTag, tBtns, tBtn, tSwitch, tPreview, tDataMap, tColor, tDate, tLongText
]
export default {
  arrayOrStringMixin,
  optionsMixin,
  tTable,
  fForm,
  fCascader,
  fCheckbox,
  fFile,
  fSelect,
  fObjSelect,
  fRadiobox,
  fTags,
  tLink,
  tTag,
  tBtn,
  tBtns,
  tPreview,
  tSwitch,
  tDataMap,
  tColor,
  tDate,
  tLongText,
  dataTable,
  editPage,
  dataDialog,
  install (Vue) {
    if (typeof Vue.component('ElForm') !== 'function') {
      throw new Error('element ui should be install first')
    }
    Vue.component('tTable', tTable)
    Vue.component('fForm', fForm)
    Vue.component('dataTable', dataTable)
    Vue.component('dataDialog', dataDialog)
    Vue.component('editPage', editPage)

    components.forEach(component => {
      Vue.component(component.name, component)
    })
    Vue.use($dataDialog)
    Vue.use($handleError)
  }
}
