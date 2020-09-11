<template>
  <div>
    <t-btn :row="row" :col="col" :key="btn.label" v-bind="btn" v-for="btn in (btns || [])" v-on="$listeners"></t-btn>
  </div>
</template>

<script>
import tBtn from './t-btn'
export default {
  name: 'tBtns',
  props: {
    btns: {
      type: Array,
      required: true
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
  components: {
    tBtn
  }
}
</script>
