import React from 'react';
import { ThemeProps } from '../Icon/Icon';
export interface ProgressProps {
    percent: number;
    strokeHight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: React.FC<ProgressProps>;
export default Progress;
