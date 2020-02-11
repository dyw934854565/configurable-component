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
  props: {
    value: {
      required: true
    },
    'on-change': {
      type: Function,
      required: false
    },
    'on-remove': {
      type: Function,
      required: false
    }
  },
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
