import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Menu, { MenuProps } from '../components/Menu/Menu'
import MenuItem from '../components/Menu/MenuItem'
import SubMenu from '../components/Menu/SubMenu'
export default {
  title: 'Peigoship/Menu',
  component: Menu,
  parameters: {
    actions: {
      handles: ['onSelect'],
    },
  },
} as Meta
const MenuTemplate: Story<MenuProps> = args => {
  return (
    <Menu defaultIndex='0' defaultOpenSubMenus={['3']} {...args}>
      <MenuItem>cool link</MenuItem>
      <MenuItem disabled>cool link2</MenuItem>
      <MenuItem>cool link3</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>dropdown 1</MenuItem>
        <MenuItem>dropdown 2</MenuItem>
      </SubMenu>
      <MenuItem>cool link4</MenuItem>
    </Menu>
  )
}
export const PrimaryMenu = MenuTemplate.bind({})

PrimaryMenu.args = {
  defaultIndex: '0',
  defaultOpenSubMenus: ['3'],
}
