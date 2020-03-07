<template>
  <el-tag v-bind="$attrs">{{label}}</el-tag>
</template>

<script>
export default {
  props: ['label']
}
</script>
