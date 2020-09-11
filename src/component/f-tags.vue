<template>
  <div class="f-tags">
    <el-tag
      v-for="(tag, index) in values"
      :key="`${index}_${tag}`"
      :closable="!readonly && !disabled"
      @close="del(index)"
      :type="type || tag.type">
      {{tag.label || tag}}
    </el-tag>
    <component :controls="false" :is="valueType" class="input-new-tag" size="small" v-if="!readonly && !disabled" v-model="newStr" :placeholder="placeholder" @blur="add" @keydown.native.enter="add"></component>
  </div>
</template>

<script>
import arrayOrStringMixin from '../mixin/arrayOrString'
import fInputNumber from './f-input-number'
export default {
  name: 'fTags',
  components: {fInputNumber},
  inheritAttrs: false,
  props: {
    valueType: {
      type: String,
      default: 'el-input'
    },
    type: String,
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '+ new item'
    },
    checkNew: Function
  },
  mixins: [arrayOrStringMixin],
  data: () => ({
    newStr: undefined
  }),
  methods: {
    del (index) {
      const value = [...this.values]
      value.splice(index, 1)
      this.onInput(value)
    },
    async add () {
      if (this.newStr === '' || typeof this.newStr === 'undefined') return
      if (this.checkNew) {
        const isChecked = await this.checkNew(this.newStr)
        if (isChecked === false) return
      }
      const value = [...this.values, this.newStr]
      this.newStr = undefined
      this.onInput(value)
    }
  }
}
</script>

<style>
.f-tags {
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .input-new-tag {
    width: 100px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
