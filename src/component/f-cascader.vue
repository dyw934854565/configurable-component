<template>
  <el-cascader
    v-bind="$attrs"
    v-on="$listeners"
    :options="trueOptions"
    :loading="loading"
  >
  </el-cascader>
</template>

<script>
import optionsMixin from '../mixin/options'
export default {
  inheritAttrs: false,
  mixins: [optionsMixin]
}
</script>
