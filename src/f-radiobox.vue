<template>
  <el-radio-group
    v-bind="$attrs"
    :value="value"
    @input="onInput"
    v-loading="loading"
  >
    <el-radio
      v-for="option in trueOptions || []"
      :key="option.value"
      :label="option.value">{{option.label}}
    </el-radio>
  </el-radio-group>
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
