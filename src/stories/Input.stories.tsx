import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Input, { InputProps } from '../components/Input/Input'
export default {
  title: 'Peigoship/Input',
  component: Input,
  parameters: {
    actions: {
      handles: ['onChange'],
    },
  },
} as Meta
const InputTemplate: Story<InputProps> = args => {
  return <Input style={{ width: '300px' }} {...args} />
}
export const PrimaryInput = InputTemplate.bind({})

PrimaryInput.args = {
  placeholder: 'input with icon',
  icon: 'search',
}
