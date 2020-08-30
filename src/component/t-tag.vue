<template>
  <el-tag v-bind="$attrs">{{label || value}}</el-tag>
</template>

<script>
export default {
  name: 'tTag',
  props: ['label', 'value']
}
</script>
