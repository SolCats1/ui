"use strict";

exports.__esModule = true;
exports.Avatar = exports.baseStyle = exports.AvatarBadge = void 0;

var _image = require("@chakra-ui/image");

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * AvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
var AvatarBadge = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useStyles)();

  var badgeStyles = _extends({
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    insetEnd: "0",
    bottom: "0"
  }, styles.badge);

  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({
    ref: ref
  }, props, {
    className: (0, _utils.cx)("chakra-avatar__badge", props.className),
    __css: badgeStyles
  }));
});
exports.AvatarBadge = AvatarBadge;

if (_utils.__DEV__) {
  AvatarBadge.displayName = "AvatarBadge";
}

function initials(name) {
  var _name$split = name.split(" "),
      firstName = _name$split[0],
      lastName = _name$split[1];

  return firstName && lastName ? "" + firstName.charAt(0) + lastName.charAt(0) : firstName.charAt(0);
}

/**
 * The avatar name container
 */
var AvatarName = function AvatarName(props) {
  var name = props.name,
      getInitials = props.getInitials,
      rest = _objectWithoutPropertiesLoose(props, ["name", "getInitials"]);

  var styles = (0, _system.useStyles)();
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({
    role: "img",
    "aria-label": name
  }, rest, {
    __css: styles.label
  }), name ? getInitials == null ? void 0 : getInitials(name) : null);
};
/**
 * Fallback avatar react component.
 * This should be a generic svg used to represent an avatar
 */


var DefaultIcon = function DefaultIcon(props) {
  return /*#__PURE__*/React.createElement(_system.chakra.svg, _extends({
    viewBox: "0 0 128 128",
    color: "#fff",
    width: "100%",
    height: "100%",
    className: "chakra-avatar__svg"
  }, props), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
  }), /*#__PURE__*/React.createElement("path", {
    fill: "currentColor",
    d: "M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
  }));
};

var baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "medium",
  position: "relative",
  flexShrink: 0
};
exports.baseStyle = baseStyle;

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
var Avatar = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useMultiStyleConfig)("Avatar", props);

  var _omitThemingProps = (0, _system.omitThemingProps)(props),
      src = _omitThemingProps.src,
      name = _omitThemingProps.name,
      showBorder = _omitThemingProps.showBorder,
      _omitThemingProps$bor = _omitThemingProps.borderRadius,
      borderRadius = _omitThemingProps$bor === void 0 ? "full" : _omitThemingProps$bor,
      onError = _omitThemingProps.onError,
      _omitThemingProps$get = _omitThemingProps.getInitials,
      getInitials = _omitThemingProps$get === void 0 ? initials : _omitThemingProps$get,
      _omitThemingProps$ico = _omitThemingProps.icon,
      icon = _omitThemingProps$ico === void 0 ? /*#__PURE__*/React.createElement(DefaultIcon, null) : _omitThemingProps$ico,
      _omitThemingProps$ico2 = _omitThemingProps.iconLabel,
      iconLabel = _omitThemingProps$ico2 === void 0 ? " avatar" : _omitThemingProps$ico2,
      loading = _omitThemingProps.loading,
      children = _omitThemingProps.children,
      borderColor = _omitThemingProps.borderColor,
      ignoreFallback = _omitThemingProps.ignoreFallback,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["src", "name", "showBorder", "borderRadius", "onError", "getInitials", "icon", "iconLabel", "loading", "children", "borderColor", "ignoreFallback"]);

  var avatarStyles = _extends({
    borderRadius: borderRadius,
    borderWidth: showBorder ? "2px" : undefined
  }, baseStyle, styles.container);

  if (borderColor) {
    avatarStyles.borderColor = borderColor;
  }

  return /*#__PURE__*/React.createElement(_system.chakra.span, _extends({
    ref: ref
  }, rest, {
    className: (0, _utils.cx)("chakra-avatar", props.className),
    __css: avatarStyles
  }), /*#__PURE__*/React.createElement(_system.StylesProvider, {
    value: styles
  }, /*#__PURE__*/React.createElement(AvatarImage, {
    src: src,
    loading: loading,
    onError: onError,
    getInitials: getInitials,
    name: name,
    borderRadius: borderRadius,
    icon: icon,
    iconLabel: iconLabel,
    ignoreFallback: ignoreFallback
  }), children));
});
exports.Avatar = Avatar;

if (_utils.__DEV__) {
  Avatar.displayName = "Avatar";
}

var AvatarImage = function AvatarImage(props) {
  var src = props.src,
      onError = props.onError,
      getInitials = props.getInitials,
      name = props.name,
      borderRadius = props.borderRadius,
      loading = props.loading,
      iconLabel = props.iconLabel,
      _props$icon = props.icon,
      icon = _props$icon === void 0 ? /*#__PURE__*/React.createElement(DefaultIcon, null) : _props$icon,
      ignoreFallback = props.ignoreFallback;
  /**
   * use the image hook to only show the image when it has loaded
   */

  var status = (0, _image.useImage)({
    src: src,
    onError: onError,
    ignoreFallback: ignoreFallback
  });
  var hasLoaded = status === "loaded";
  /**
   * Fallback avatar applies under 2 conditions:
   * - If `src` was passed and the image has not loaded or failed to load
   * - If `src` wasn't passed
   *
   * In this case, we'll show either the name avatar or default avatar
   */

  var showFallback = !src || !hasLoaded;

  if (showFallback) {
    return name ? /*#__PURE__*/React.createElement(AvatarName, {
      className: "chakra-avatar__initials",
      getInitials: getInitials,
      name: name
    }) : /*#__PURE__*/React.cloneElement(icon, {
      role: "img",
      "aria-label": iconLabel
    });
  }
  /**
   * If `src` was passed and the image has loaded, we'll show it
   */


  return /*#__PURE__*/React.createElement(_system.chakra.img, {
    src: src,
    alt: name,
    className: "chakra-avatar__img",
    loading: loading,
    __css: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: borderRadius
    }
  });
};

if (_utils.__DEV__) {
  AvatarImage.displayName = "AvatarImage";
}
//# sourceMappingURL=avatar.js.map