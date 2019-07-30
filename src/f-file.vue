<template>
  <el-upload
    v-bind="$attrs"
    :value="value"
    :fileList="fileList"
    :on-change="onChangeBind"
    :on-remove="onRemoveBind"
  >
    <el-button size="small" class="btn-green">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['value', 'on-change', 'on-remove'],
  computed: {
    fileList () {
      if (typeof this.value === 'object') {
        return this.value
      }
      return []
    }
  },
  methods: {
    setFileList (fileList) {
      this.$emit('input', fileList)
    },
    onChangeBind (...args) {
      console.log('onchange', this.onChange)

      if (this.onChange) {
        this.onChange(this, ...args)
      }
    },
    onRemoveBind (...args) {
      if (this.onRemove) {
        this.onRemove(this, ...args)
      }
    }
  }
}
</script>
