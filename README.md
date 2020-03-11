# configurable-component

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![NPM Download][dt-image]][npm-url]

## 是个组件库

基于[element-ui](https://element.eleme.cn/#/zh-CN/component/layout)二次封装，现阶段主要处理表单和表格，快速完成增删改查操作。

[组件文档](https://dyw934854565.github.io/configurable-component/)，目前用的github page，有点慢。或者拉代码本地查看文档

```shell
git clone https://github.com/dyw934854565/configurable-component.git
cd configurable-component
npm install
npm start
```

## 简化原理

牺牲了一部分的可扩展性，构建更简单调用的组件。更少的使用slot，更多的通过props来完成定制化需求。

保证单个组件纯使用props来做定制化需求，更方便的将多个不同的组件组合成新的组件，通过组件props透传来保证子组件的可定制化。这样的好处是组合组件可以处理组件间通用的逻辑，简单的来说就是高阶组件，这样不用反复去写相同的逻辑。

相同的逻辑，比如有，分页页码变动，表格数据请求；弹窗修改数据，点保存，需要做表单数据的验证，保存按钮置灰，以防止重复请求。等等，还有更多

## 保证可扩展性

现在的大部分组件，为了可扩展性，会用slot。比如el-option，简单使用如下

```vue
<el-option>{{item.label}}</el-option>
```

其slot不仅可以放字符串，还可以放一些自定义模版。对于基础组件来说，它要满足各种奇葩的需求，保证可扩展性是很重要的一件事。

```vue
<el-option>
    <span style="float: left">{{ item.label }}</span>
    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
</el-option>
```

这样对于自定义需求来说极为方便，但是，对于el-select来说，大部分需求，只需要简单默认模版，每次都要拿到options数组自己写一遍v-for，很浪费时间。

如果select增加options参数，使用固定的模版，就可以不用重复写v-for了。当然，好处不止于此，如果表单项组件都可以通过参数配置，那么el-from，可以一个form数组配置表单项，各种组件可以混搭。

这样做的问题就是一棒子打死了可扩展性，不过还是有一些补救的办法的。在固定模板中使用component，可以弥补大部分情况下的可扩展性

大概使用如下：
```vue
<el-option>
    <component v-if="item.component" :is="item.component" :label="item.label" :value="item.value" v-bind="item.extra || {}">
    <template v-else>
        {{item.label}}
    <template>
</el-option>
```

item.component可以是字符串(已注册组件的名字)或一个组件的选项对象(从.vue文件import/Vue.extend的返回值)。

想扩展没那么方便了，但是带来的收益也很明显。对于一个项目来说，扩展内容一般会一致，保证用户体验一致，所以使用component也不一定不好，也可能是更方便。

这样写，可能会多很多v-if，可能有一些性能问题，这个具体没测。未来考虑

## 测试用例

慢慢补吧，易代码还有优化空间，还是优先优化代码

## LICENSE ##

MIT License


[npm-url]: https://npmjs.org/package/configurable-component
[npm-image]: https://badge.fury.io/js/configurable-component.png
[travis-image]: https://travis-ci.com/dyw934854565/configurable-component.svg?branch=master
[travis-url]: https://travis-ci.com/dyw934854565/configurable-component
[dt-image]: https://img.shields.io/npm/dt/configurable-component.svg
