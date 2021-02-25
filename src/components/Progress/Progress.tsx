import React from 'react'
import { ThemeProps } from '../Icon/Icon'
export interface ProgressProps {
  percent: number
  strokeHight?: number
  showText?: boolean
  styles?: React.CSSProperties
  theme?: ThemeProps
}
const Progress: React.FC<ProgressProps> = props => {
  const { percent, strokeHight, showText, styles, theme } = props
  return (
    <div className='progress-bar' style={styles}>
      <div className='progress-bar-outer' style={{ height: `${strokeHight}px` }}>
        <div className={`progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHight: 15,
  showText: true,
  theme: 'primary',
}
export default Progress
