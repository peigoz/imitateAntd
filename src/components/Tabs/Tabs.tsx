import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './TabItem'
type TabsMode = 'line' | 'card'
type SelectCallback = (selectedIndex: number) => void

export interface TabsProps {
  defaultIndex?: number
  className?: string
  type?: TabsMode
  style?: React.CSSProperties
  onSelect?: SelectCallback
}
interface ITabsContext {
  index: number
  onSelect?: SelectCallback
  type?: TabsMode
}
export const TabsContext = createContext<ITabsContext>({ index: 0 })
const Tabs: React.FC<TabsProps> = props => {
  const { defaultIndex, className, children, type, style, onSelect, ...restProps } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('tabs-nav', className, {
    'nav-line': type === 'line',
    'nav-card': type === 'card',
    
  })
  const handleClick = (index: number) => {
    setActive(index)
    onSelect && onSelect(index)
  }
  const passedContext: ITabsContext = {
    index: currentActive || 0,
    onSelect: handleClick,
    type,
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>
      if (childElement.type.displayName === 'TabItem') {
        return React.cloneElement(childElement, { index })
      } else {
        console.error('Warning:Tabs has a child which is not a TabItem component')
      }
    })
  }
  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      if (index === currentActive) {
        return child
      }
    })
  }
  return (
    <div className='tabs'>
      <ul className={classes} style={style} {...restProps}>
        <TabsContext.Provider value={passedContext}>{renderChildren()}</TabsContext.Provider>
      </ul>
      <div className='tabs-content'>{renderContent()}</div>
    </div>
  )
}
Tabs.defaultProps = {
  defaultIndex: 0,
  type: 'line',
}
export default Tabs
