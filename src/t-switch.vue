<template>
  <div>
    <el-switch @change="onChange" v-bind="elswitch.extra" v-model="elswitch.value" ></el-switch>
  </div>
</template>

<script>
export default {
  props: ['elswitch', 'scope'],
  methods: {
    onChange (val) {
      if (this.elswitch.handle) {
        this.elswitch.handle(this.scope)
      }
    }
  }
}
</script>
