function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useFormControl } from "@chakra-ui/form-control";
import { chakra, forwardRef, layoutPropNames, omitThemingProps, useMultiStyleConfig } from "@chakra-ui/system";
import { cx, mergeWith, split, __DEV__, dataAttr } from "@chakra-ui/utils";
import * as React from "react";
export var SelectField = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    children,
    placeholder,
    className
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["children", "placeholder", "className"]);

  return /*#__PURE__*/React.createElement(chakra.select, _extends({}, rest, {
    ref: ref,
    className: cx("chakra-select", className)
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), children);
});

if (__DEV__) {
  SelectField.displayName = "SelectField";
}

/**
 * React component used to select one item from a list of options.
 */
export var Select = /*#__PURE__*/forwardRef((props, ref) => {
  var styles = useMultiStyleConfig("Select", props);

  var _omitThemingProps = omitThemingProps(props),
      {
    rootProps,
    placeholder,
    icon,
    color,
    height,
    h,
    minH,
    minHeight,
    iconColor,
    iconSize
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["rootProps", "placeholder", "icon", "color", "height", "h", "minH", "minHeight", "iconColor", "iconSize", "isFullWidth"]);

  var [layoutProps, otherProps] = split(rest, layoutPropNames);
  var ownProps = useFormControl(otherProps);
  var rootStyles = {
    width: "100%",
    height: "fit-content",
    position: "relative",
    color
  };
  var fieldStyles = mergeWith({}, styles.field, {
    paddingEnd: "2rem",
    _focus: {
      zIndex: "unset"
    }
  });
  return /*#__PURE__*/React.createElement(chakra.div, _extends({
    className: "chakra-select__wrapper",
    __css: rootStyles
  }, layoutProps, rootProps), /*#__PURE__*/React.createElement(SelectField, _extends({
    ref: ref,
    height: h != null ? h : height,
    minH: minH != null ? minH : minHeight,
    placeholder: placeholder
  }, ownProps, {
    __css: fieldStyles
  }), props.children), /*#__PURE__*/React.createElement(SelectIcon, _extends({
    "data-disabled": dataAttr(ownProps.disabled)
  }, (iconColor || color) && {
    color: iconColor || color
  }, {
    __css: styles.icon
  }, iconSize && {
    fontSize: iconSize
  }), icon));
});

if (__DEV__) {
  Select.displayName = "Select";
}

export var DefaultIcon = props => /*#__PURE__*/React.createElement("svg", _extends({
  viewBox: "0 0 24 24"
}, props), /*#__PURE__*/React.createElement("path", {
  fill: "currentColor",
  d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
}));
var IconWrapper = chakra("div", {
  baseStyle: {
    position: "absolute",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    top: "50%",
    transform: "translateY(-50%)"
  }
});

var SelectIcon = props => {
  var {
    children = /*#__PURE__*/React.createElement(DefaultIcon, null)
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["children"]);

  var clone = /*#__PURE__*/React.cloneElement(children, {
    role: "presentation",
    className: "chakra-select__icon",
    focusable: false,
    "aria-hidden": true,
    // force icon to adhere to `IconWrapper` styles
    style: {
      width: "1em",
      height: "1em",
      color: "currentColor"
    }
  });
  return /*#__PURE__*/React.createElement(IconWrapper, _extends({}, rest, {
    className: "chakra-select__icon-wrapper"
  }), /*#__PURE__*/React.isValidElement(children) ? clone : null);
};

if (__DEV__) {
  SelectIcon.displayName = "SelectIcon";
}
//# sourceMappingURL=select.js.map