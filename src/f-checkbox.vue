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
      :label="option.label"
      :value="option.value">
    </el-checkbox>
  </el-checkbox-group>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['value', 'options'],
  data: () => ({
    innerOptions: [],
    loading: 'false'
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
