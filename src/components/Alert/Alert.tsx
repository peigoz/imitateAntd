import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/Icon'
import Transition from '../Transition/Transition'

export type AlertType = 'success' | 'default' | 'danger' | 'warning'
export interface AlertProps {
  title?: string
  className?: string
  /**描述 */
  description?: string
  /**类型 四种可选 针对四种不同的场景 */
  type?: AlertType
  /**关闭alert时触发的事件 */
  onClose?: (e: React.MouseEvent) => void
  /**是否显示关闭图标*/
  closable?: boolean
}
const Alert: React.FC<AlertProps> = props => {
  const { title, className, description, type, onClose, closable, ...resetProps } = props
  const [alertShow, setAlertShow] = useState(true)
  const classes = classNames('alert', 'bold-title', className, {
    [`alert-${type}`]: type,
    'alert-desc': description,
  })
  const handleClick = (e: React.MouseEvent) => {
    onClose && onClose(e)
    setAlertShow(false)
  }
  const renderChildren = () => {
    const alertClose = classNames('alert', {
      'alert-close': closable,
    })
    return (
      <div className={alertClose} onClick={handleClick} {...resetProps}>
        <Icon icon='times' theme='light' size='sm' />
      </div>
    )
  }
  return (
    // <Fragment>
    //   {alertShow && (
    //     <div className={classes} data-testid='test-alert'>
    //       <div>{title}</div>
    //       <div>{description}</div>
    //       {closable && renderChildren()}
    //     </div>
    //   )}
    // </Fragment>
    <Transition in={alertShow} animation='zoom-in-left' timeout={500} unmountOnExit>
      <div className={classes} data-testid='test-alert'>
        <div>{title}</div>
        <div>{description}</div>
        {closable && renderChildren()}
      </div>
    </Transition>
  )
}
Alert.defaultProps = {
  title: 'Hello World',
  type: 'default',
  closable: true,
}
export default Alert
