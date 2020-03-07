import { addParameters } from '@storybook/vue'
import Vue from 'vue'
import element from 'element-ui'
import Admin from '../src'
import 'element-ui/lib/theme-chalk/index.css'
import { create } from '@storybook/theming/create'
Vue.use(element)
Vue.use(Admin)
addParameters({
  options: {
    theme: create({
        base: 'light',
        brandTitle: 'configurable-component',
        brandUrl: 'https://github.com/dyw934854565/configable-component',
    }),
    // isToolshown: false,
    showPanel: false
  },
  docs: {
    inlineStories: true,
  }
});