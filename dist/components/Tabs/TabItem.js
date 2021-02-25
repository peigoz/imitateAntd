var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useContext } from 'react';
import classNames from 'classnames';
import { TabsContext } from './Tabs';
var TabItem = function (props) {
    var index = props.index, label = props.label, disabled = props.disabled, children = props.children, className = props.className, style = props.style, restProps = __rest(props, ["index", "label", "disabled", "children", "className", "style"]);
    var context = useContext(TabsContext);
    var classes = classNames('tabs-nav-item', className, {
        disabled: context.type === 'card' && disabled,
        'is-active': context.index === index,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && typeof index === 'number') {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", __assign({ className: classes, style: style, onClick: handleClick }, restProps), label));
};
TabItem.displayName = 'TabItem';
export default TabItem;
