import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Icon, { IconProps } from '../components/Icon/Icon'
export default {
  title: 'Peigoship/Icon',
  component: Icon,
} as Meta

const IconTemplate: Story<IconProps> = args => <Icon {...args}></Icon>
export const PrimaryIcon = IconTemplate.bind({})
PrimaryIcon.args = {
  icon: 'coffee',
  theme: 'primary',
  size: '3x',
}
