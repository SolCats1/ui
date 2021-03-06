"use strict";

exports.__esModule = true;
exports.DefaultIcon = exports.Select = exports.SelectField = void 0;

var _formControl = require("@chakra-ui/form-control");

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SelectField = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var children = props.children,
      placeholder = props.placeholder,
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, ["children", "placeholder", "className"]);

  return /*#__PURE__*/React.createElement(_system.chakra.select, _extends({}, rest, {
    ref: ref,
    className: (0, _utils.cx)("chakra-select", className)
  }), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), children);
});
exports.SelectField = SelectField;

if (_utils.__DEV__) {
  SelectField.displayName = "SelectField";
}

/**
 * React component used to select one item from a list of options.
 */
var Select = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useMultiStyleConfig)("Select", props);

  var _omitThemingProps = (0, _system.omitThemingProps)(props),
      rootProps = _omitThemingProps.rootProps,
      placeholder = _omitThemingProps.placeholder,
      icon = _omitThemingProps.icon,
      color = _omitThemingProps.color,
      height = _omitThemingProps.height,
      h = _omitThemingProps.h,
      minH = _omitThemingProps.minH,
      minHeight = _omitThemingProps.minHeight,
      iconColor = _omitThemingProps.iconColor,
      iconSize = _omitThemingProps.iconSize,
      isFullWidth = _omitThemingProps.isFullWidth,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["rootProps", "placeholder", "icon", "color", "height", "h", "minH", "minHeight", "iconColor", "iconSize", "isFullWidth"]);

  var _split = (0, _utils.split)(rest, _system.layoutPropNames),
      layoutProps = _split[0],
      otherProps = _split[1];

  var ownProps = (0, _formControl.useFormControl)(otherProps);
  var rootStyles = {
    width: "100%",
    height: "fit-content",
    position: "relative",
    color: color
  };
  var fieldStyles = (0, _utils.mergeWith)({}, styles.field, {
    paddingEnd: "2rem",
    _focus: {
      zIndex: "unset"
    }
  });
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({
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
    "data-disabled": (0, _utils.dataAttr)(ownProps.disabled)
  }, (iconColor || color) && {
    color: iconColor || color
  }, {
    __css: styles.icon
  }, iconSize && {
    fontSize: iconSize
  }), icon));
});
exports.Select = Select;

if (_utils.__DEV__) {
  Select.displayName = "Select";
}

var DefaultIcon = function DefaultIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
  }));
};

exports.DefaultIcon = DefaultIcon;
var IconWrapper = (0, _system.chakra)("div", {
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

var SelectIcon = function SelectIcon(props) {
  var _props$children = props.children,
      children = _props$children === void 0 ? /*#__PURE__*/React.createElement(DefaultIcon, null) : _props$children,
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

if (_utils.__DEV__) {
  SelectIcon.displayName = "SelectIcon";
}
//# sourceMappingURL=select.js.map