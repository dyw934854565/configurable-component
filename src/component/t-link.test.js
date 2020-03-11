import tLink from './t-link'
import { mount, config } from '@vue/test-utils'
import {Link} from 'element-ui'

config.stubs['el-link'] = Link
test('tLink render label', () => {
  const wrapper = mount(tLink, {
    propsData: {
      label: 'red'
    }
  })
  expect(wrapper.props().label).toBe('red')
  expect(wrapper.find('.el-link--inner').text()).toBe('red')
})
