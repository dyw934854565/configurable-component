<template>
  <el-link :href="resolveHref" v-bind="$attrs">{{label}}</el-link>
</template>

<script>
import resolveString from '../utils/resolveString'
export default {
  name: 'tLink',
  inheritAttrs: false,
  props: {
    href: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    row: {
      type: Object,
      default: () => ({})
    },
    col: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    resolveHref () {
      return resolveString(this.href, {row: this.row, col: this.col})
    }
  }
}
</script>
