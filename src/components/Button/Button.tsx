import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import classNames from 'classnames'
// export enum ButtonSize {
//   Large = 'lg',
//   Small = 'sm',
// }
// export enum ButtonType {
//   Primary = 'primary',
//   Default = 'default',
//   Danger = 'danger',
//   Link = 'link',
// }

type ButtonSize = 'lg' | 'sm'
type ButtonType = 'default' | 'primary' | 'danger' | 'link'
interface BaseButtonProps {
  className?: string
  disabled?: boolean
  /** 按钮尺寸 */
  size?: ButtonSize
  /** 按钮类型 */
  btnType?: ButtonType
  children?: React.ReactNode
  /** 链接按钮跳转地址 */
  href?: string
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>

//使用Partial使得所有属性都变为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 这是我的第一个Button组件
 * @param props 
 */
export const Button: FC<ButtonProps> = props => {
  const { btnType, className, disabled, size, children, href, ...restProps } = props

  //默认样式btn，用户可传btn-lg,btn-primary
  const classes = classNames('btn', className, {
    //如果btnType存在，则为true，对应添加btn-btnType的class类
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  })
  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
}
export default Button
