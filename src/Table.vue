<template>
  <el-table v-bind="$attrs" v-loading="loading" :data="dataInner" v-on="$listeners">
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
      required: false,
      default: () => []
    },
    data: {
      type: [Array, Function],
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      dataInner: [],
      loading: false
    }
  },
  created () {
    this.getData()
    this.$watch('data', this.getData.bind(this))
  },
  methods: {
    makeData (fn, val, row) {
      if (typeof fn === 'function') {
        return fn.call(this, val, row)
      }
      return val
    },
    async getDataInner () {
      this.loading = true
      try {
        this.dataInner = []
        this.dataInner = await this.data()
      } catch (e) {
        this.$handleError && this.$handleError(e)
      }
      this.loading = false
    },
    getData () {
      if (typeof this.data === 'function') {
        this.getDataInner()
      } else {
        this.loading = false
        this.dataInner = this.data
      }
    }
  }
}
</script>
