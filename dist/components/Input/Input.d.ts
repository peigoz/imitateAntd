import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'small';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**是否禁用Input */
    disabled?: boolean;
    /**设置Input尺寸大小，支持lg或sm */
    size?: InputSize;
    /**自定义在右侧添加fontawesome图标 */
    icon?: IconProp;
    /**添加前缀 */
    prepend?: string | ReactElement;
    /**添加后缀 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
declare const Input: React.FC<InputProps>;
export default Input;
