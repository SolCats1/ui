function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { createContext } from "@chakra-ui/react-utils";
import { chakra, forwardRef, omitThemingProps, StylesProvider, useMultiStyleConfig, useStyles, useTheme } from "@chakra-ui/system";
import { cx, __DEV__ } from "@chakra-ui/utils";
import * as React from "react";
import { useSlider } from "./use-slider";
var [SliderProvider, useSliderContext] = createContext({
  name: "SliderContext",
  errorMessage: "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <Slider />"
});
export { SliderProvider, useSliderContext };

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#slider
 */
export var Slider = /*#__PURE__*/forwardRef((props, ref) => {
  var styles = useMultiStyleConfig("Slider", props);
  var ownProps = omitThemingProps(props);
  var {
    direction
  } = useTheme();
  ownProps.direction = direction;

  var _useSlider = useSlider(ownProps),
      {
    getInputProps,
    getRootProps
  } = _useSlider,
      context = _objectWithoutPropertiesLoose(_useSlider, ["getInputProps", "getRootProps"]);

  var rootProps = getRootProps();
  var inputProps = getInputProps({}, ref);
  return /*#__PURE__*/React.createElement(SliderProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/React.createElement(chakra.div, _extends({}, rootProps, {
    className: "chakra-slider",
    __css: styles.container
  }), props.children, /*#__PURE__*/React.createElement("input", inputProps))));
});
Slider.defaultProps = {
  orientation: "horizontal"
};

if (__DEV__) {
  Slider.displayName = "Slider";
}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
export var SliderThumb = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    getThumbProps
  } = useSliderContext();
  var styles = useStyles();
  var thumbProps = getThumbProps(props, ref);
  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, thumbProps, {
    className: cx("chakra-slider__thumb", props.className),
    __css: styles.thumb
  }));
});

if (__DEV__) {
  SliderThumb.displayName = "SliderThumb";
}

export var SliderTrack = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    getTrackProps
  } = useSliderContext();
  var styles = useStyles();
  var trackProps = getTrackProps(props, ref);
  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, trackProps, {
    className: cx("chakra-slider__track", props.className),
    __css: styles.track
  }));
});

if (__DEV__) {
  SliderTrack.displayName = "SliderTrack";
}

export var SliderFilledTrack = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    getInnerTrackProps
  } = useSliderContext();
  var styles = useStyles();
  var trackProps = getInnerTrackProps(props, ref);
  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, trackProps, {
    className: "chakra-slider__filled-track",
    __css: styles.filledTrack
  }));
});

if (__DEV__) {
  SliderFilledTrack.displayName = "SliderFilledTrack";
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/slider
 */
export var SliderMark = /*#__PURE__*/forwardRef((props, ref) => {
  var {
    getMarkerProps
  } = useSliderContext();
  var markProps = getMarkerProps(props, ref);
  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, markProps, {
    className: cx("chakra-slider__marker", props.className)
  }));
});

if (__DEV__) {
  SliderMark.displayName = "SliderMark";
}
//# sourceMappingURL=slider.js.map