<template>
    <div class="t-preview" :style="style">
        <component
            @click="onClick"
            v-if="preview && value"
            :is="preview"
            controls
            :src="value"
            :style="style"
            :width="width"
        ></component>
        <div v-else-if="value">{{ value }}</div>
        <div v-else>没有内容</div>
        <div :style="titleStyle" @click="onClick" v-if="title">{{title}}</div>
    </div>
</template>

<script>
export default {
  name: 'tPreview',
  props: {
    list: {
      type: Object,
      default: () => ({})
    },
    title: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    },
    width: {
      type: Number,
      default: 160
    },
    href: {
      type: String,
      required: false
    },
    value: {
      type: String,
      default: '',
      required: true
    },
    fullscreen: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      defaultList: {
        img: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'],
        video: ['mp4', 'm4v', 'avi', 'mov', 'rmvb', 'wmv', 'mkv'],
        audio: ['mp3', 'ogg', 'wav', 'm4a', 'aac']
      }
    }
  },
  methods: {
    onClick (e) {
      if (this.href) {
        return window.open(this.href)
      }
      if (this.fullscreen) {
        e.preventDefault()
        if (this.preview === 'img' || this.preview === 'video') {
          const h = this.$createElement
          this.$msgbox({
            customClass: 't-preview-modal',
            title: '',
            width: '800',
            message: h(this.preview, {
              attrs: {
                src: this.value,
                width: '100%',
                controls: true,
                autoplay: true
              }
            }),
            showCancelButton: false,
            showConfirmButton: false
          })
          return false
        }
      }
    }
  },
  computed: {
    style () {
      return `width: ${this.width}px;cursor: ${this.href ? 'pointer' : 'initial'}`
    },
    titleStyle () {
      return `text-align: center;cursor: ${this.href ? 'pointer' : 'initial'}`
    },
    mergedList () {
      // 为了性能，浅拷贝一下
      return {
        ...this.defaultList,
        ...this.list
      }
    },
    ext () {
      if (!this.value) return ''
      return this.value.substr(this.value.lastIndexOf('.') + 1)
    },
    preview () {
      if (this.type) return this.type
      if (!this.ext) return ''
      const preview = Object.keys(this.mergedList).find(key => {
        const exts = this.mergedList[key]
        return exts.includes(this.ext.toLowerCase())
      })
      return preview
    }
  }
}
</script>

<style>
.el-message-box.t-preview-modal {
  width: 600px;
}
</style>
