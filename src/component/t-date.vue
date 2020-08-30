<template>
    <span>{{date}}</span>
</template>

<script>
import format from 'date-format'
export default {
  name: 't-date',
  props: {
    value: {
      type: [Date, Number, String],
      required: true
    },
    format: {
      type: String,
      default: 'yyyy-MM-ddThh:mm:ss.SSS'
    }
  },
  computed: {
    date () {
      return format(this.format, new Date(this.value))
    }
  }
}
</script>
