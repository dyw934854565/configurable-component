<template>
    <el-switch @input="onHandle" v-bind="$attrs"></el-switch>
</template>

<script>
import handle from '../mixin/handle'
export default {
  name: 'tSwitch',
  props: {
    handle: {
      type: [Function, Object],
      required: false,
      default: function (val) {
        this.$emit('input', val)
      }
    }
  },
  inheritAttrs: false,
  mixins: [handle]
}
</script>
