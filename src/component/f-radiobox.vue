<template>
  <el-radio-group
    v-bind="$attrs"
    v-on="$listeners"
    v-loading="loading"
  >
    <el-radio
      v-for="(option, index) in trueOptions"
      :key="typeof option.value === 'object' ? index : option.value"
      :label="option.value">{{option.label}}
    </el-radio>
  </el-radio-group>
</template>

<script>
import optionsMixin from '../mixin/options'
export default {
  name: 'fRadiobox',
  inheritAttrs: false,
  mixins: [optionsMixin]
}
</script>
