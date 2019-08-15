# 使用配置完成表格组件的调用

## 与原来使用的区别

原来的写法
```javascript
 <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
    </el-table>
  </template>
  <script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎'
          }, {
            date: '2016-05-03',
            name: '王小虎'
          }]
        }
      }
    }
  </script>
```
痛点：手写模版；如果用v-for，有些特殊的列可能不支持；如果有数据是需要改动的就需要手写template

改版之后用法
```javascript
<template>
    <Table :cols="cols" :data="tableData" style="width: 100%">
    </Table>
</template>
<script>
  export default {
    data() {
      return {
        cols: [{
          prop: 'date',
          label: '日期',
          extra: {
            width: '180',
            fixed: 'right'
          },
          value(val, scope) {
            // val为值， scope是使用template的scope值
            return val
          }
        }, {
          prop: 'name',
          label: '姓名',
          extra: {
            width: '180'
          }
        }],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎'
        }, {
          date: '2016-05-03',
          name: '王小虎'
        }]
      }
    }
  }
</script>
```
优点：配置型使用，更方便；el-table的属性都能支持；Table-column的配置可以放在extra中；值需要变化时可以用value方法即可

# 自定义组件
表格中经常用到链接和按钮，准备了内置组件，快速完成

使用方法
```javascript
export default {
    data() {
      return {
        cols: [{
          prop: 'date',
          label: '日期',
          component: 't-link',
          extra: {
            width: '180',
            fixed: 'right'
          },
          value(val, scope) {
            return {
              href: val,
              label: '详情'
            }
            // 如果使用组件，请返回一个对象，这个对象会被v-bind到组件上
          }
        }]
      }
    }
}
```

# 支持的组件
## t-link
value返回的对象， 参考el-link, 增加label参数

## t-tag
value返回的对象， 参考el-tag, 增加label参数

## t-btns
value返回的对象 {btns, scope}, scope为value传入的第二个参数
btns为数组
```javascript
export default {
    data() {
      return {
        cols: [{
          prop: 'ops',
          label: '操作',
          component: 't-btns',
          extra: {
            width: '180',
            fixed: 'right'
          },
          value(val, scope) {
            return {
              btns: [
                {
                  label: '删除',
                  handle: scope => {
                    // 按钮被点击的处理方法
                  }
                  extra: {
                    // 其余参数，参考el-button
                    size: 'mini',
                    type: 'danger'
                  }
                }
              ],
              scope
            }
          }
        }]
      }
    }
}
```

# 自定义组件
当组件不能完全满足需求的时候可以，自己开发一个组件。

写完可以用Vue.component挂在全局组件上

如t-btns组件，很简单

```javascript
// t-btns.vue
<template>
  <div>
    <el-button @click="onClick(btn)" :key="btn.label" v-bind="btn.extra" v-for="btn in (btns || [])">{{btn.label}}</el-button>
  </div>
</template>

<script>
export default {
  props: ['btns', 'scope'],
  methods: {
    onClick (btn) {
      if (btn.handle) {
        btn.handle(this.scope)
      }
    }
  }
}
</script>

// main.js
import Vue from 'vue'
import tBtns from 'path to t-btns.vue'
Vue.component('t-btns', tBtns)
```