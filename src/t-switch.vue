<template>
  <div>
    <el-switch @input="onChange" v-bind="$attrs"></el-switch>
  </div>
</template>

<script>
export default {
  props: {
    handle: {
      type: Function
    },
    scope: Object
  },
  methods: {
    async onChange (val) {
      if (this.handle) {
        try {
          await this.handle(val, this.scope)
        } catch (e) {
          this.$handleError && this.$handleError(e, '操作失败')
        }
      }
    }
  }
}
</script>
