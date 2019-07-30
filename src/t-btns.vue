<template>
  <div>
    <el-button @click="onClick(btn)" :key="btn.label" v-bind="btn.extra" v-for="btn in (btns || [])">{{btn.label}}</el-button>
  </div>
</template>

<script>
export default {
  props: ['btns', 'scope'],
  methods: {
    onClick (btn) {
      if (btn.handle) {
        btn.handle(this.scope)
      }
    }
  }
}
</script>
