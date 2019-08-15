# 使用配置完成表单组件的调用

## 与原来使用的区别

原来的写法
```javascript
<el-form :model="ruleForm" :rules="rules"   ref="ruleForm" label-width="100px"     class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
    <el-input v-model="ruleForm.name" placeholder="输入活动名称"></el-input>
  </el-form-item>
</el-form>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
    }
  }
</script>
```
痛点：手写模版内容， el-form-item可以用v-for，但是每次都要重复的去写不方便。rule和form-item分离

改版之后用法
```javascript
<Forms :forms="forms" :model="model" label-width="100px" >
</Forms>
<script>
  export default {
    data() {
      return {
        model: {
        },
        forms: {
          name: {
            type: 'el-input',
            default: 'name',
            extra: {
              placeholder: '',
              clearable: true
            },
            rules: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
          },
        }
      }
    }
  }
</script>
```
优点：Forms支持el-form的所有属性；每个表单项和rules在一起，方便查看；可以添加默认值；方便的添加表单组件的其他属性，如el-input的placeholder，内部实现是会把extra使用v-bind到对应的表单组件上

# type 支持组件类型

## el-input 输入框  el-switch 开关等一类简单组件
el-input可在extra中设置type="textarea"
更多extra可用参数可详见element文档
## f-select 选择框 f-radiobox f-checkbox f-cascader
因为选择框是要options的所以改写了el-select，新增options属性
可以是数据，也可以是函数，可以返回promise,意味这可以远程获取选项
```javascript
<Forms :forms="forms" :model="model" label-width="100px" >
</Forms>
<script>
  export default {
    data() {
      return {
        model: {
        },
        forms: {
          name: {
            type: 'f-select',
            extra: {
              options: [
                {
                  value: 'a',
                  label: 'a活动'
                },
                {
                  value: 'b',
                  label: 'b活动'
                }
              ]
            },
            rules: [
              { required: true, message: '请选择活动名称', trigger: 'blur' }
            ]
          },
        }
      }
    }
  }
</script>
```
## f-file 文件
使用upload组件，但是upload没有做v-model处理，也就是不能改model里的值，所以重写了一下upload
是否可多选可以在extra中设置
新增on-change和on-remove配置，可以在extra中配置

```javascript
<Forms :forms="forms" :model="model" label-width="100px" >
</Forms>
<script>
  export default {
    data() {
      return {
        model: {
        },
        forms: {
          name: {
            type: 'f-file',
            extra: {
              multiple: false,
              'auto-upload': false,
              'on-change': function (fFile, file, fileList) {
                fFile.setFileList([file])
              },
              'on-remove': function (fFile) {
                fFile.setFileList([])
              }
            },
            rules: [
              { required: true, message: '请选择文件', trigger: 'blur' }
            ]
          },
        }
      }
    }
  }
</script>
```
上面是一个单选的示例
fFile是f-file组件的实例，一定要调用fFile.setFileList设置文件列表，是改变model里的值

setFileList里代码
```javascript
setFileList (fileList) {
  this.$emit('input', fileList)
}
```

# 自定义组件
当组件不能完全满足需求的时候可以，自己开发一个组件。有些产品里的表单操作可能是很复杂的

表单组件的核心是在数据改变的时候使用$emit('input')

写完可以用Vue.component挂在全局组件上