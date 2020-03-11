import { addParameters } from '@storybook/vue'
import Vue from 'vue'
import element from 'element-ui'
import Admin from '../src'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(element)
Vue.use(Admin)
addParameters({
  options: {
    selectedPanel: 'docs'
  },
  docs: {
    inlineStories: true,
  }
});