<template>
  <el-checkbox-group
    v-bind="$attrs"
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
      return this.$emit('input', val.join())
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
    },
    values () {
      if (this.value === '') {
        return []
      }
      if (typeof this.value === 'string') {
        return this.value.split(',')
      }
      return []
    }
  }
}
</script>
