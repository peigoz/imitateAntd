import React from 'react';
export interface TabItemProps {
    label: any;
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
