"use strict";

exports.__esModule = true;
exports.SliderMark = exports.SliderFilledTrack = exports.SliderTrack = exports.SliderThumb = exports.Slider = exports.useSliderContext = exports.SliderProvider = void 0;

var _reactUtils = require("@chakra-ui/react-utils");

var _system = require("@chakra-ui/system");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _useSlider2 = require("./use-slider");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _createContext = (0, _reactUtils.createContext)({
  name: "SliderContext",
  errorMessage: "useSliderContext: `context` is undefined. Seems you forgot to wrap all slider components within <Slider />"
}),
    SliderProvider = _createContext[0],
    useSliderContext = _createContext[1];

exports.useSliderContext = useSliderContext;
exports.SliderProvider = SliderProvider;

/**
 * The Slider is used to allow users to make selections from a range of values.
 * It provides context and functionality for all slider components
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#slider
 */
var Slider = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var styles = (0, _system.useMultiStyleConfig)("Slider", props);
  var ownProps = (0, _system.omitThemingProps)(props);

  var _useTheme = (0, _system.useTheme)(),
      direction = _useTheme.direction;

  ownProps.direction = direction;

  var _useSlider = (0, _useSlider2.useSlider)(ownProps),
      getInputProps = _useSlider.getInputProps,
      getRootProps = _useSlider.getRootProps,
      context = _objectWithoutPropertiesLoose(_useSlider, ["getInputProps", "getRootProps"]);

  var rootProps = getRootProps();
  var inputProps = getInputProps({}, ref);
  return /*#__PURE__*/React.createElement(SliderProvider, {
    value: context
  }, /*#__PURE__*/React.createElement(_system.StylesProvider, {
    value: styles
  }, /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, rootProps, {
    className: "chakra-slider",
    __css: styles.container
  }), props.children, /*#__PURE__*/React.createElement("input", inputProps))));
});
exports.Slider = Slider;
Slider.defaultProps = {
  orientation: "horizontal"
};

if (_utils.__DEV__) {
  Slider.displayName = "Slider";
}

/**
 * Slider component that acts as the handle used to select predefined
 * values by dragging its handle along the track
 */
var SliderThumb = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _useSliderContext = useSliderContext(),
      getThumbProps = _useSliderContext.getThumbProps;

  var styles = (0, _system.useStyles)();
  var thumbProps = getThumbProps(props, ref);
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, thumbProps, {
    className: (0, _utils.cx)("chakra-slider__thumb", props.className),
    __css: styles.thumb
  }));
});
exports.SliderThumb = SliderThumb;

if (_utils.__DEV__) {
  SliderThumb.displayName = "SliderThumb";
}

var SliderTrack = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _useSliderContext2 = useSliderContext(),
      getTrackProps = _useSliderContext2.getTrackProps;

  var styles = (0, _system.useStyles)();
  var trackProps = getTrackProps(props, ref);
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, trackProps, {
    className: (0, _utils.cx)("chakra-slider__track", props.className),
    __css: styles.track
  }));
});
exports.SliderTrack = SliderTrack;

if (_utils.__DEV__) {
  SliderTrack.displayName = "SliderTrack";
}

var SliderFilledTrack = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _useSliderContext3 = useSliderContext(),
      getInnerTrackProps = _useSliderContext3.getInnerTrackProps;

  var styles = (0, _system.useStyles)();
  var trackProps = getInnerTrackProps(props, ref);
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, trackProps, {
    className: "chakra-slider__filled-track",
    __css: styles.filledTrack
  }));
});
exports.SliderFilledTrack = SliderFilledTrack;

if (_utils.__DEV__) {
  SliderFilledTrack.displayName = "SliderFilledTrack";
}

/**
 * SliderMark is used to provide names for specific Slider
 * values by defining labels or markers along the track.
 *
 * @see Docs https://chakra-ui.com/slider
 */
var SliderMark = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var _useSliderContext4 = useSliderContext(),
      getMarkerProps = _useSliderContext4.getMarkerProps;

  var markProps = getMarkerProps(props, ref);
  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, markProps, {
    className: (0, _utils.cx)("chakra-slider__marker", props.className)
  }));
});
exports.SliderMark = SliderMark;

if (_utils.__DEV__) {
  SliderMark.displayName = "SliderMark";
}
//# sourceMappingURL=slider.js.map