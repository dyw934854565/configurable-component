<template>
  <div>
    <el-button @click="onClick(btn)" :key="btn.label" v-bind="btn.extra" v-for="btn in (btns || [])">{{btn.label}}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    btns: {
      type: Array,
      required: true
    },
    scope: Object
  },
  methods: {
    async onClick (btn) {
      if (btn.handle) {
        try {
          const res = await btn.handle(this.scope)
        } catch (e) {
          this.$handleError && this.$handleError(e, '操作失败')
        }
      }
    }
  }
}
</script>
