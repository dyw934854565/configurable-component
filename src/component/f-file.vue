<template>
  <el-upload
    action="#"
    v-bind="$attrs"
    :auto-upload="false"
    :multiple="multiple"
    :fileList="fileList"
    :onRemove="onRemove"
    :onChange="onChange"
  >
    <component v-if="triggerComponent" :is="triggerComponent" />
    <el-button v-else size="small" class="btn-green">点击上传</el-button>
    <div v-if="tip" slot="tip" class="el-upload__tip">{{tip}}</div>
  </el-upload>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Array
    },
    tip: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    triggerComponent: {
      type: [String, Function]
    }
  },
  computed: {
    fileList () {
      if (typeof this.value === 'object' && this.value) {
        return this.value
      }
      return []
    }
  },
  methods: {
    setFileList (fileList) {
      this.$emit('input', fileList)
    },
    onChange (file, fileList) {
      this.setFileList(this.multiple ? fileList : [file])
    },
    onRemove (file, fileList) {
      this.setFileList(fileList)
    }
  }
}
</script>
