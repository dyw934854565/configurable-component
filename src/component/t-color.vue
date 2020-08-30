<template>
    <div class="t-color">
        <span>{{value}}</span>
        <span class="t-color-show" :style="style"></span>
    </div>
</template>

<script>
export default {
  name: 't-color',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    style () {
      return this.value ? `background-color: ${this.value};` : ''
    }
  }
}
</script>

<style>
.t-color .t-color-show {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>
