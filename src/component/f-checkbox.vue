<template>
  <el-checkbox-group
    v-bind="$attrs"
    v-on="$listeners"
    :value="values"
    @input="onInput"
    v-loading="loading"
  >
    <el-checkbox
      v-for="option in trueOptions || []"
      :key="option.value"
      :label="option.label">
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
import optionsMixin from '../mixin/options'
import arrayOrStringMixin from '../mixin/arrayOrString'
export default {
  inheritAttrs: false,
  mixins: [optionsMixin, arrayOrStringMixin]
}
</script>
