import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Tabs, { TabsProps } from '../components/Tabs/Tabs'
import TabItem from '../components/Tabs/TabItem'
export default {
  title: 'Peigoship/Tabs',
  component: Tabs,
  parameters: {
    actions: {
      handles: ['onSelect'],
    },
  },
} as Meta
const TabsTemplate: Story<TabsProps> = args => {
  return (
    <Tabs {...args}>
      <TabItem label='选项卡一'>this is content one</TabItem>
      <TabItem label='选项卡二'>this is content two</TabItem>
      <TabItem label='用户管理' disabled>
        this is content three
      </TabItem>
    </Tabs>
  )
}
export const PrimaryTabs = TabsTemplate.bind({})

PrimaryTabs.args = {
  defaultIndex: 0,
  type: 'card',
}
