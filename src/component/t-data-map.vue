<template>
    <div class="t-data-map" v-loading="loading">
        {{ render }}
    </div>
</template>

<script>
import { createMixin } from '../mixin/data'
export default {
  name: 'tDataMap',
  props: {
    value: {
      type: [Number, String, Array],
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
  mixins: [createMixin('map', instance => ({
    row: instance.row, col: instance.col
  }))],
  computed: {
    render () {
      if (this.trueMap) {
        if (Array.isArray(this.value)) {
          let toFind = this.trueMap
          return this.value.map((item, index) => {
            if (Array.isArray(toFind)) {
              const option = toFind.find(option => option.value === item)
              toFind = option && option.children ? option.children : toFind
              return option ? option.label : item
            }
            return this.trueMap[item] || item
          }).join('/')
        }
        if (Array.isArray(this.trueMap)) {
          const res = this.trueMap.find(i => i.value === this.value)
          if (res) {
            return res.label
          }
        } else if (typeof this.trueMap[this.value] !== 'undefined') {
          return this.trueMap[this.value]
        }
      }
      return this.value
    }
  }
}
</script>
