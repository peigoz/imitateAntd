import React from 'react';
export declare type AlertType = 'success' | 'default' | 'danger' | 'warning';
export interface AlertProps {
    title?: string;
    className?: string;
    /**描述 */
    description?: string;
    /**类型 四种可选 针对四种不同的场景 */
    type?: AlertType;
    /**关闭alert时触发的事件 */
    onClose?: (e: React.MouseEvent) => void;
    /**是否显示关闭图标*/
    closable?: boolean;
}
declare const Alert: React.FC<AlertProps>;
export default Alert;
