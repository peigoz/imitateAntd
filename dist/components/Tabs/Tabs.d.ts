import React from 'react';
declare type TabsMode = 'line' | 'card';
declare type SelectCallback = (selectedIndex: number) => void;
export interface TabsProps {
    defaultIndex?: number;
    className?: string;
    type?: TabsMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}
interface ITabsContext {
    index: number;
    onSelect?: SelectCallback;
    type?: TabsMode;
}
export declare const TabsContext: React.Context<ITabsContext>;
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
