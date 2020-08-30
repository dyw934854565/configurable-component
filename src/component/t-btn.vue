<template>
    <el-button :loading="loading" @click="onHandle" v-bind="$attrs">{{label}}</el-button>
</template>

<script>
import handle from '../mixin/handle'
export default {
  name: 'tBtn',
  inheritAttrs: false,
  props: {
    label: {
      type: [String],
      required: true
    }
  },
  mixins: [handle]
}
</script>
