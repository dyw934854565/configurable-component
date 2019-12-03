<template>
  <el-cascader
    v-bind="$attrs"
    :value="value"
    :options="trueOptions"
    :loading="loading"
    @input="onInput"
    @focus="fetchOption(false)"
  >
  </el-cascader>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
        required: true
    },
    options: {
      type: [Array, Function],
      required: true
    }
  },
  data: () => ({
    innerOptions: [],
    loading: false
  }),
  methods: {
    onInput (val) {
      return this.$emit('input', val)
    },
    async fetchOption (isInit) {
      if (typeof this.options !== 'function') {
        return
      }
      this.loading = true
      try {
        this.innerOptions = await this.options(isInit)
      } catch (e) {}
      this.loading = false
    }
  },
  created () {
    this.fetchOption(true)
  },
  computed: {
    trueOptions () {
      if (typeof this.options === 'function') {
        return this.innerOptions
      }
      return this.options
    }
  }
}
</script>
