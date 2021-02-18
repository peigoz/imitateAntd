import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabsContext } from './Tabs'
export interface TabItemProps {
  label: any
  index?: number
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}
const TabItem: React.FC<TabItemProps> = props => {
  const { index, label, disabled, children, className, style, ...restProps } = props
  const context = useContext(TabsContext)
  const classes = classNames('tabs-nav-item', className, {
    disabled: context.type === 'card' && disabled,
    'is-active': context.index === index,
  })
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'number') {
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick} {...restProps}>
      {label}
    </li>
  )
}

TabItem.displayName = 'TabItem'
export default TabItem
