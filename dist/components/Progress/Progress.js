import React from 'react';
var Progress = function (props) {
    var percent = props.percent, strokeHight = props.strokeHight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: 'progress-bar', style: styles },
        React.createElement("div", { className: 'progress-bar-outer', style: { height: strokeHight + "px" } },
            React.createElement("div", { className: "progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: 'inner-text' }, percent + "%")))));
};
Progress.defaultProps = {
    strokeHight: 15,
    showText: true,
    theme: 'primary',
};
export default Progress;
