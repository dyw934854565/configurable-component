<template>
  <div>
    <el-button @click="onClick(btn)" :key="btn.label" v-bind="btn.extra" v-for="btn in (btns || [])">{{btn.label}}</el-button>
  </div>
</template>

<script>
export default {
  props: ['btns', 'scope'],
  methods: {
    async onClick (btn) {
      if (btn.handle) {
        try {
          const res = await btn.handle(this.scope)
          res && this.$message.success(res)
        } catch (e) {
          e && this.$message.error(e.message || e.msg || '操作失败')
        }
      }
    }
  }
}
</script>
