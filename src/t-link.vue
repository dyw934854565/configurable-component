<template>
  <el-link v-bind="$attrs">{{label}}</el-link>
</template>

<script>
export default {
  props: ['label']
}
</script>
