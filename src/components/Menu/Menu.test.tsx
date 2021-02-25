import React from 'react'
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
jest.mock('../Icon/Icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
}

const testVerProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
}

const GenerateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>thirdItem</MenuItem>
      {/* <li>error node</li> */}
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
        <MenuItem>drop2</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
  .submenu{
    display:none;
  }
  .submenu.menu-opened{
    display:block;
  }
  `
  const style = document.createElement('style')
  style.innerHTML = cssFile
  return style
}
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe('test <Menu></Menu> and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(GenerateMenu(testProps))
    // wrapper.container.getElementsByClassName()也可以拿到
    wrapper.container.append(createStyleFile())
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })
  it('should render correct Menu and MenuItem based on default prop', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click item should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('thirdItem')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(GenerateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(() => expect(wrapper.queryByText('drop1')).toBeVisible())
    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => expect(wrapper.queryByText('drop1')).not.toBeVisible())
  })
})
