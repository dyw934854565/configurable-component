import { addons } from '@storybook/addons'

import { create } from '@storybook/theming/create'
addons.setConfig({
    theme: create({
        base: 'light',
        brandTitle: 'configurable-component',
        brandUrl: 'https://github.com/dyw934854565/configurable-component',
    }),
    isToolshown: true,
    showPanel: false,
})