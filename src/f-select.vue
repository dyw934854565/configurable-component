<template>
  <el-select
    v-bind="$attrs"
    :value="value"
    @input="onInput"
    :loading="loading"
    @focus="fetchOption(false)"
  >
    <el-option v-for="option in trueOptions || []" :key="option.value" v-bind="option"></el-option>
  </el-select>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['value', 'options'],
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
