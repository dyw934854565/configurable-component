<template>
  <el-checkbox-group
    v-bind="$attrs"
    v-on="$listeners"
    :value="values"
    @input="onInput"
    v-loading="loading"
  >
    <el-checkbox
      v-for="(option, index) in trueOptions || []"
      :key="typeof option.value === 'object' ? index : option.value"
      :label="option.label">
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import optionsMixin from '../mixin/options'
import arrayOrStringMixin from '../mixin/arrayOrString'
export default {
  name: 'fCheckbox',
  inheritAttrs: false,
  mixins: [optionsMixin, arrayOrStringMixin]
}
</script>
