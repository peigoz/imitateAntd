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
import React, { createContext, useState } from 'react';
import classNames from 'classnames';
export var TabsContext = createContext({ index: 0 });
var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, children = props.children, type = props.type, style = props.style, onSelect = props.onSelect, restProps = __rest(props, ["defaultIndex", "className", "children", "type", "style", "onSelect"]);
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('tabs-nav', className, {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
    });
    var handleClick = function (index) {
        setActive(index);
        onSelect && onSelect(index);
    };
    var passedContext = {
        index: currentActive || 0,
        onSelect: handleClick,
        type: type,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            if (childElement.type.displayName === 'TabItem') {
                return React.cloneElement(childElement, { index: index });
            }
            else {
                console.error('Warning:Tabs has a child which is not a TabItem component');
            }
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === currentActive) {
                return child;
            }
        });
    };
    return (React.createElement("div", { className: 'tabs' },
        React.createElement("ul", __assign({ className: classes, style: style }, restProps),
            React.createElement(TabsContext.Provider, { value: passedContext }, renderChildren())),
        React.createElement("div", { className: 'tabs-content' }, renderContent())));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line',
};
export default Tabs;
