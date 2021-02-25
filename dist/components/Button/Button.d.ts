import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
declare type ButtonSize = 'lg' | 'sm';
declare type ButtonType = 'default' | 'primary' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    /** 按钮尺寸 */
    size?: ButtonSize;
    /** 按钮类型 */
    btnType?: ButtonType;
    children?: React.ReactNode;
    /** 链接按钮跳转地址 */
    href?: string;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 这是我的第一个Button组件
 * @param props
 */
export declare const Button: FC<ButtonProps>;
export default Button;
