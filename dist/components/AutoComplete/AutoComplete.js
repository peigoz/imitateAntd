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
import React, { useState, useEffect, useRef, } from 'react';
import classNames from 'classnames';
import Input from '../Input/Input';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
// const handleChange = (keyword: string, data: string[]) => {
//   // return data.filter(item => item.includes(keyword))
//   // return fetch(`url?keyword?=${keyword}`)
// }
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debounceValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    if (data.length > 0) {
                        setSuggestions(data);
                        setShowDropdown(true);
                    }
                });
            }
            else {
                if (results.length > 0) {
                    setSuggestions(results);
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
        // if (value) {
        //   const results = fetchSuggestions(value)
        //   if (results instanceof Promise) {
        //     setLoading(true)
        //     results.then(data => {
        //       setLoading(false)
        //       setSuggestions(data)
        //     })
        //   } else {
        //     setSuggestions(results)
        //   }
        // } else {
        //   setSuggestions([])
        // }
    };
    var highlight = function (index) {
        if (index < 0) {
            index = 0;
        }
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        // console.log(e.key)
        switch (e.key) {
            case 'ArrowDown':
                highlight(highlightIndex + 1);
                break;
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                break;
            case 'Enter':
                if (suggestions) {
                    if (highlightIndex === -1) {
                        // setHighlightIndex(0)
                        // console.log(highlightIndex) //异步，此时还是-1
                        handleSelect(suggestions[0]);
                        return;
                    }
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 'Escape':
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        triggerSearch.current = false;
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: 'zoom-in-top', timeout: 300, onExited: function () {
                setSuggestions([]);
            } }, loading ? (React.createElement("div", { className: 'suggestions-loading-icon' },
            React.createElement(Icon, { icon: 'spinner', spin: true }))) : (React.createElement("ul", { className: 'suggestion-list' }, suggestions.map(function (item, index) {
            var classes = classNames('suggestion-item', {
                'is-active': index === highlightIndex,
            });
            return (React.createElement("li", { key: index, className: classes, onClick: function () {
                    handleSelect(item);
                } }, renderTemplate(item)));
        })))));
    };
    return (React.createElement("div", { className: 'auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
//TODO: custom options
//TODO: keyboard support
//TODO: debounce
//TODO: click outside
export default AutoComplete;
