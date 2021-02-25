import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from '../components/Button/Button'

const styles: React.CSSProperties = {
  textAlign: 'center',
}
// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
const CenterDecorator = (Story: any) => <div style={styles}>{Story()}</div>
export default {
  title: 'Peigoship/Button',
  component: Button,
  argTypes: {
    btnType: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'danger', 'link'],
      },
    },
    size: {
      control: {
        type: 'inline-radio',
      },
    },
  },
  parameters: {
    actions: {
      handles: ['click .button'],
    },
    docs: {
      description: {
        component: '这是我的第一个Button组件',
      },
      // source: {
      //   type: 'code',
      // },
    },
  },
  decorators: [CenterDecorator],
} as Meta

const ButtonTemplate: Story<ButtonProps> = args => <Button {...args}>Default Button</Button>
export const Primary = ButtonTemplate.bind({})
Primary.args = {
  btnType: 'primary',
}

export const ButtonWithSize: Story<ButtonProps> = args => {
  return (
    <>
      <Button {...args}>Large Button</Button>
      <Button size='sm'>small Button</Button>
    </>
  )
}
ButtonWithSize.args = {
  size: 'lg',
}

export const ButtonWithType: Story<ButtonProps> = args => (
  <>
    <Button btnType='danger'>Danger Button</Button>
    <Button {...args}>Link Button</Button>
  </>
)
ButtonWithType.args = {
  btnType: 'link',
  href: 'https://www.bing.com',
}
