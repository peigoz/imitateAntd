import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/Icon'

type InputSize = 'lg' | 'small'

//Omit<泛型，忽略值>，解决继承接口冲突项
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用Input */
  disabled?: boolean
  /**设置Input尺寸大小，支持lg或sm */
  size?: InputSize
  /**自定义在右侧添加fontawesome图标 */
  icon?: IconProp
  /**添加前缀 */
  prepend?: string | ReactElement
  /**添加后缀 */
  append?: string | ReactElement
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = props => {
  //取出各种属性
  const { disabled, size, icon, prepend, append, style, ...restProps } = props
  //根据属性计算不同的className
  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': prepend,
    'input-group-append': append,
  })

  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className='input-group-prepend'>{prepend}</div>}
      {icon && (
        <div className='icon-wrapper'>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className='input-inner' disabled={disabled} {...restProps} />
      {append && <div className='input-group-append'>{append}</div>}
    </div>
  )
}

export default Input
