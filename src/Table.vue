<template>
  <el-table v-bind="$attrs" v-on="$listeners">
    <el-table-column v-for="col in cols" :key="col.prop" :prop="col.prop" :label="col.label" v-bind="col.extra || {}">
      <template slot-scope="scope">
        <component v-if="col.component" :is="col.component" v-bind="makeData(col.value, scope.row[col.prop], scope)"></component>
        <span v-else>{{ makeData(col.value, scope.row[col.prop], scope) }}</span>
      </template>
    </el-table-column>
    <slot></slot>
  </el-table>
</template>

<script>
import tLink from './t-link'
import tTag from './t-tag'
import tBtns from './t-btns'
import tSwitch from './t-switch'
export default {
  components: {
    tLink,
    tTag,
    tBtns,
    tSwitch
  },
  props: {
    cols: {
      type: Array,
      required: true
    }
  },
  methods: {
    makeData (fn, val, row) {
      if (typeof fn === 'function') {
        return fn.call(this, val, row)
      }
      return val
    }
  }
}
</script>
