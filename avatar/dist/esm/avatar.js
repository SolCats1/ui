function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { useImage } from "@chakra-ui/image";
import { chakra, forwardRef, omitThemingProps, StylesProvider, useMultiStyleConfig, useStyles } from "@chakra-ui/system";
import { cx, __DEV__ } from "@chakra-ui/utils";
import * as React from "react";

/**
 * AvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export var AvatarBadge = /*#__PURE__*/forwardRef((props, ref) => {
  var styles = useStyles();

  var badgeStyles = _extends({
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    insetEnd: "0",
    bottom: "0"
  }, styles.badge);

  return /*#__PURE__*/React.createElement(chakra.div, _extends({
    ref: ref
  }, props, {
    className: cx("chakra-avatar__badge", props.className),
    __css: badgeStyles
  }));
});

if (__DEV__) {
  AvatarBadge.displayName = "AvatarBadge";
}

function initials(name) {
  var [firstName, lastName] = name.split(" ");
  return firstName && lastName ? "" + firstName.charAt(0) + lastName.charAt(0) : firstName.charAt(0);
}

/**
 * The avatar name container
 */
var AvatarName = props => {
  var {
    name,
    getInitials
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["name", "getInitials"]);

  var styles = useStyles();
  return /*#__PURE__*/React.createElement(chakra.div, _extends({
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


var DefaultIcon = props => /*#__PURE__*/React.createElement(chakra.svg, _extends({
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

export var baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textTransform: "uppercase",
  fontWeight: "medium",
  position: "relative",
  flexShrink: 0
};

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export var Avatar = /*#__PURE__*/forwardRef((props, ref) => {
  var styles = useMultiStyleConfig("Avatar", props);

  var _omitThemingProps = omitThemingProps(props),
      {
    src,
    name,
    showBorder,
    borderRadius = "full",
    onError,
    getInitials = initials,
    icon = /*#__PURE__*/React.createElement(DefaultIcon, null),
    iconLabel = " avatar",
    loading,
    children,
    borderColor,
    ignoreFallback
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["src", "name", "showBorder", "borderRadius", "onError", "getInitials", "icon", "iconLabel", "loading", "children", "borderColor", "ignoreFallback"]);

  var avatarStyles = _extends({
    borderRadius,
    borderWidth: showBorder ? "2px" : undefined
  }, baseStyle, styles.container);

  if (borderColor) {
    avatarStyles.borderColor = borderColor;
  }

  return /*#__PURE__*/React.createElement(chakra.span, _extends({
    ref: ref
  }, rest, {
    className: cx("chakra-avatar", props.className),
    __css: avatarStyles
  }), /*#__PURE__*/React.createElement(StylesProvider, {
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

if (__DEV__) {
  Avatar.displayName = "Avatar";
}

var AvatarImage = props => {
  var {
    src,
    onError,
    getInitials,
    name,
    borderRadius,
    loading,
    iconLabel,
    icon = /*#__PURE__*/React.createElement(DefaultIcon, null),
    ignoreFallback
  } = props;
  /**
   * use the image hook to only show the image when it has loaded
   */

  var status = useImage({
    src,
    onError,
    ignoreFallback
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


  return /*#__PURE__*/React.createElement(chakra.img, {
    src: src,
    alt: name,
    className: "chakra-avatar__img",
    loading: loading,
    __css: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius
    }
  });
};

if (__DEV__) {
  AvatarImage.displayName = "AvatarImage";
}
//# sourceMappingURL=avatar.js.map