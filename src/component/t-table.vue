<template>
  <el-table v-bind="$attrs" v-loading="loading" :data="trueData" v-on="$listeners" @filter-change="onFilterChange">
    <slot name="pre-column"></slot>
    <template v-for="(col, index) in cols" >
      <el-table-column v-if="col.colExtra && col.colExtra.type" :key="`${col.prop || col.key}-${index}`" :columnKey="col.prop || col.key" :prop="col.prop || col.key" :label="col.label" v-bind="col.colExtra || col.extra || {}">
      </el-table-column>
      <el-table-column v-else :key="`${col.prop || col.key}-${index}`" :columnKey="col.prop || col.key" :prop="col.prop || col.key" :label="col.label" v-bind="getColExtra(col)">
        <template slot-scope="scope">
          <component
            @input="onInput(scope, $event)"
            @refresh="refreshData"
            v-if="col.component"
            :is="col.component"
            @op="op($event, scope.row)"
            :row="scope.row"
            :col="col"
            v-bind="makeData(col, scope.row, scope, true)"
          >
          </component>
          <span v-else>{{ makeData(col, scope.row, scope) }}</span>
        </template>
      </el-table-column>
    </template>
    <slot></slot>
    <div slot="empty">{{showText}}</div>
  </el-table>
</template>

<script>
import tLink from './t-link'
import tTag from './t-tag'
import tBtns from './t-btns'
import tBtn from './t-btn'
import tSwitch from './t-switch'
import tPreview from './t-preview'
import {createMixin} from '../mixin/data'
import get from 'lodash.get'
import resolveString from '../utils/resolveString'
export default {
  inheritAttrs: false,
  name: 'tTable',
  mixins: [createMixin('data', instance => ({
    filterOption: instance.filterOption
  }))],
  components: {
    tLink,
    tTag,
    tBtn,
    tBtns,
    tSwitch,
    tPreview
  },
  props: {
    page: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    autoGet: {
      type: Boolean,
      default: true
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    errorText: {
      type: String,
      default: '加载失败'
    },
    cols: {
      type: Array,
      required: false,
      default: () => []
    },
    onUpdateRow: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      filterOption: {}
    }
  },
  computed: {
    showText () {
      return (this.error || this.fetchError) ? this.errorText : this.emptyText
    }
  },
  methods: {
    preventFirstFetch () {
      return !this.autoGet
    },
    op (name, row) {
      this.$emit('op', {name, row})
    },
    getColExtra (col) {
      const res = col.colExtra || col.extra || {}
      if (!this.page || !res.sortable) return res
      return {...res, sortable: 'custom'}
    },
    handleTable (item, scope) {
      const ignoreKeys = {handle: 1, map: 1}
      const clone = {...item}
      Object.keys(clone).forEach(key => {
        if (!ignoreKeys[key]) {
          clone[key] = resolveString(clone[key], scope)
        }
      })
      return clone
    },
    async onInput (scope, value) {
      const newRow = {...scope.row, [scope.column.property]: value}
      if (this.onUpdateRow) {
        try {
          this.loading = true
          await this.onUpdateRow(newRow, scope)
        } catch (e) {
          this.$handleError && this.$handleError(e)
        }
        this.loading = false
      }
    },
    makeData ({value: fn, extra, prop, key}, row, scope, isComponent = false) {
      const extraData = this.handleTable(extra || {}, scope)
      const value = get(row, prop || key)
      if (typeof fn === 'function') {
        const res = fn.call(this, value, scope)
        return isComponent ? {...extraData, value, ...res} : res
      }
      return isComponent ? { ...extraData, value } : value
    },
    refreshData () {
      return this.fetchData()
    },
    onFilterChange (filterOption) {
      this.filterOption = filterOption
      return this.refreshData()
    }
  }
}
</script>
