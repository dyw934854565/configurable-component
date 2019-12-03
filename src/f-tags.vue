<template>
  <div class="f-tags">
    <div>
      <el-tag
        v-for="(tag, index) in values"
        :key="index + tag"
        closable
        @close="del(index)"
        :type="type">
        {{tag}}
      </el-tag>
    </div>
    <div><el-input v-model="newStr" v-bind="$attrs" @keydown.native.enter="add"></el-input></div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: [String, Array],
    type: String,
    checkNew: Function
  },
  data: () => ({
    newStr: ''
  }),
  methods: {
    del (index) {
      const value = [...this.values]
      value.splice(index, 1)
      this.onInput(value)
    },
    async add () {
      if (!this.newStr) return
      if (this.checkNew) {
        const isChecked = await this.checkNew(this.newStr)
        if (isChecked === false) return
      }
      const value = [...this.values, this.newStr]
      this.newStr = ''
      this.onInput(value)
    },
    onInput (val) {
      return this.$emit('input', val)
    }
  },
  computed: {
    values () {
      if (this.value === '') {
        return []
      }
      if (typeof this.value === 'string') {
        return this.value.split(',')
      }
      return [...this.value]
    }
  }
}
</script>

<style>
.f-tags .el-tag + .el-tag {
  margin-left: 10px;
}
</style>
