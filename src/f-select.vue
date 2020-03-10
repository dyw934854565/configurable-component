<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    :loading="loading"
    :remote-method="remoteMethod"
    @focus="fetchOption(false)"
  >
    <template v-for="option in trueOptions">
      <el-option-group v-if="option.children" :key="option.label" :label="option.label" :disabled="option.disabled">
        <el-option v-for="optionItem in option.children || []" :key="optionItem.value" v-bind="optionItem"></el-option>
      </el-option-group>
      <el-option v-else :key="option.value" v-bind="option"></el-option>
    </template>
  </el-select>
</template>

<script>
import optionsMixin from './mixin/options'
export default {
  inheritAttrs: false,
  mixins: [optionsMixin],
  methods: {
    preventFirstFetch () {
      return this.$attrs.remote && this.$attrs.filterable
    }
  },
  computed: {
    remoteMethod () {
      return this.fetchOption.bind(this, false)
    }
  }
}
</script>
