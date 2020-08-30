<template>
  <div class="t-lonog-text">
      <div :style="style">
        {{value}}
      </div>
      <div class="hide-wraper" :style="allWrapStyle">
        <div :style="allStyle" ref="all">{{value}}</div>
      </div>
      <el-button @click="isCollspan = !isCollspan" v-if="showCollspan" type="text">{{label}}</el-button>
  </div>
</template>

<script>
export default {
  name: 't-long-text',
  props: {
    value: {
      type: String,
      default: ''
    },
    lineHeight: {
      type: Number,
      default: 17
    },
    maxline: {
      type: Number,
      default: 2
    }
  },
  computed: {
    style () {
      // -webkit-line-clamp的值改了不生效，所以用了display: none来做区分展示
      return {
        lineHeight: this.lineHeight + 'px',
        maxHeight: this.lineHeight * this.maxline + 'px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: this.isCollspan ? '-webkit-box' : 'none',
        '-webkit-line-clamp': this.maxline,
        '-webkit-box-orient': 'vertical'
      }
    },
    label () {
      return this.isCollspan ? '详情' : '收起'
    },
    allStyle () {
      return {
        lineHeight: this.lineHeight + 'px',
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical'
      }
    },
    allWrapStyle () {
      return {
        height: this.isCollspan ? 0 : 'auto'
      }
    }
  },
  data () {
    return {
      showCollspan: false,
      isCollspan: true
    }
  },
  mounted () {
    if (this.$refs.all.clientHeight > this.lineHeight * this.maxline) {
      this.showCollspan = true
    }
  }
}
</script>

<style>
.t-lonog-text .hide-wraper {
  width: 100%;
  overflow: hidden;
}
</style>
