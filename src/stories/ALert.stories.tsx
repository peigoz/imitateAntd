import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Alert, { AlertProps } from '../components/Alert/Alert'
export default {
  title: 'Peigoship/Alert',
  component: Alert,
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
    },
  },
  parameters: {
    actions: {
      handles: ['onClose .alert-close'],
    },
  }
} as Meta

const AlertTemplate: Story<AlertProps> = args => <Alert {...args}></Alert>
export const PrimaryAlert = AlertTemplate.bind({})
PrimaryAlert.args = {
  description: '你好,世界',
}
