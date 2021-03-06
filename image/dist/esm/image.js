function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { chakra, forwardRef } from "@chakra-ui/system";
import { omit, __DEV__ } from "@chakra-ui/utils";
import * as React from "react";
import { useImage } from "./use-image";
var NativeImage = /*#__PURE__*/React.forwardRef((props, ref) => {
  var {
    htmlWidth,
    htmlHeight,
    alt
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["htmlWidth", "htmlHeight", "alt"]);

  return /*#__PURE__*/React.createElement("img", _extends({
    width: htmlWidth,
    height: htmlHeight,
    ref: ref,
    alt: alt
  }, rest));
});

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chakra-ui.com/image
 */
export var Image = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    fallbackSrc,
    fallback,
    src,
    srcSet,
    align,
    fit,
    loading,
    ignoreFallback,
    crossOrigin
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["fallbackSrc", "fallback", "src", "srcSet", "align", "fit", "loading", "ignoreFallback", "crossOrigin"]);
  /**
   * Defer to native `img` tag if `loading` prop is passed
   * @see https://github.com/chakra-ui/chakra-ui/issues/1027
   */


  var shouldIgnore = loading != null || ignoreFallback || fallbackSrc === undefined && fallback === undefined; // if the user doesn't provide any kind of fallback we should ignore it

  var status = useImage(_extends({}, props, {
    ignoreFallback: shouldIgnore
  }));

  var shared = _extends({
    ref,
    objectFit: fit,
    objectPosition: align
  }, shouldIgnore ? rest : omit(rest, ["onError", "onLoad"]));

  if (status !== "loaded") {
    /**
     * If user passed a custom fallback component,
     * let's render it here.
     */
    if (fallback) return fallback;
    return /*#__PURE__*/React.createElement(chakra.img, _extends({
      as: NativeImage,
      className: "chakra-image__placeholder",
      src: fallbackSrc
    }, shared));
  }

  return /*#__PURE__*/React.createElement(chakra.img, _extends({
    as: NativeImage,
    src: src,
    srcSet: srcSet,
    crossOrigin: crossOrigin,
    loading: loading,
    className: "chakra-image"
  }, shared));
});

/**
 * Fallback component for most SSR users who want to use the native `img` with
 * support for chakra props
 */
export var Img = /*#__PURE__*/forwardRef((props, ref) => /*#__PURE__*/React.createElement(chakra.img, _extends({
  ref: ref,
  as: NativeImage,
  className: "chakra-image"
}, props)));

if (__DEV__) {
  Image.displayName = "Image";
}
//# sourceMappingURL=image.js.map