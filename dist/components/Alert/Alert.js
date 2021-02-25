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
import React, { useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
var Alert = function (props) {
    var _a;
    var title = props.title, className = props.className, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable, resetProps = __rest(props, ["title", "className", "description", "type", "onClose", "closable"]);
    var _b = useState(true), alertShow = _b[0], setAlertShow = _b[1];
    var classes = classNames('alert', 'bold-title', className, (_a = {},
        _a["alert-" + type] = type,
        _a['alert-desc'] = description,
        _a));
    var handleClick = function (e) {
        onClose && onClose(e);
        setAlertShow(false);
    };
    var renderChildren = function () {
        var alertClose = classNames('alert', {
            'alert-close': closable,
        });
        return (React.createElement("div", __assign({ className: alertClose, onClick: handleClick }, resetProps),
            React.createElement(Icon, { icon: 'times', theme: 'light', size: 'sm' })));
    };
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
    React.createElement(Transition, { in: alertShow, animation: 'zoom-in-left', timeout: 500, unmountOnExit: true },
        React.createElement("div", { className: classes, "data-testid": 'test-alert' },
            React.createElement("div", null, title),
            React.createElement("div", null, description),
            closable && renderChildren())));
};
Alert.defaultProps = {
    title: 'Hello World',
    type: 'default',
    closable: true,
};
export default Alert;
