<template>
  <el-radio-group
    v-bind="$attrs"
    v-on="$listeners"
    v-loading="loading"
  >
    <el-radio
      v-for="option in trueOptions"
      :key="option.value"
      :label="option.value">{{option.label}}
    </el-radio>
  </el-radio-group>
</template>

<script>
import optionsMixin from '../mixin/options'
export default {
  inheritAttrs: false,
  mixins: [optionsMixin]
}
</script>
