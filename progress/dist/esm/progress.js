function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { chakra, omitThemingProps, StylesProvider, useMultiStyleConfig, useStyles } from "@chakra-ui/system";
import { __DEV__ } from "@chakra-ui/utils";
import * as React from "react";
import { getProgressProps, progress, stripe } from "./progress.utils";

/**
 * ProgressLabel is used to show the numeric value of the progress.
 * @see Docs https://chakra-ui.com/progress
 */
export var ProgressLabel = props => {
  var styles = useStyles();

  var labelStyles = _extends({
    top: "50%",
    left: "50%",
    width: "100%",
    textAlign: "center",
    position: "absolute",
    transform: "translate(-50%, -50%)"
  }, styles.label);

  return /*#__PURE__*/React.createElement(chakra.div, _extends({}, props, {
    __css: labelStyles
  }));
};

if (__DEV__) {
  ProgressLabel.displayName = "ProgressLabel";
}

/**
 * ProgressFilledTrack (Linear)
 *
 * The progress component that visually indicates the current level of the progress bar.
 * It applies `background-color` and changes its width.
 *
 * @see Docs https://chakra-ui.com/progress
 */
var ProgressFilledTrack = props => {
  var {
    min,
    max,
    value,
    isIndeterminate
  } = props,
      rest = _objectWithoutPropertiesLoose(props, ["min", "max", "value", "isIndeterminate"]);

  var progress = getProgressProps({
    value,
    min,
    max,
    isIndeterminate
  });
  var styles = useStyles();

  var trackStyles = _extends({
    height: "100%"
  }, styles.filledTrack);

  return /*#__PURE__*/React.createElement(chakra.div, _extends({
    style: _extends({
      width: progress.percent + "%"
    }, rest.style)
  }, progress.bind, rest, {
    __css: trackStyles
  }));
};

/**
 * Progress (Linear)
 *
 * Progress is used to display the progress status for a task that takes a long
 * time or consists of several steps.
 *
 * It includes accessible attributes to help assistive technologies understand
 * and speak the progress values.
 *
 * @see Docs https://chakra-ui.com/progress
 */
export var Progress = props => {
  var _styles$track;

  var _omitThemingProps = omitThemingProps(props),
      {
    value,
    min = 0,
    max = 100,
    hasStripe,
    isAnimated,
    children,
    borderRadius: propBorderRadius,
    isIndeterminate,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy
  } = _omitThemingProps,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, ["value", "min", "max", "hasStripe", "isAnimated", "children", "borderRadius", "isIndeterminate", "aria-label", "aria-labelledby"]);

  var styles = useMultiStyleConfig("Progress", props);
  var borderRadius = propBorderRadius != null ? propBorderRadius : (_styles$track = styles.track) == null ? void 0 : _styles$track.borderRadius;
  var stripeAnimation = {
    animation: stripe + " 1s linear infinite"
  };
  /**
   * We should not use stripe if it is `indeterminate`
   */

  var shouldAddStripe = !isIndeterminate && hasStripe;
  var shouldAnimateStripe = shouldAddStripe && isAnimated;
  /**
   * Generate styles for stripe and stripe animation
   */

  var css = _extends({}, shouldAnimateStripe && stripeAnimation, isIndeterminate && {
    position: "absolute",
    willChange: "left",
    minWidth: "50%",
    animation: progress + " 1s ease infinite normal none running"
  });

  var trackStyles = _extends({
    overflow: "hidden",
    position: "relative"
  }, styles.track);

  return /*#__PURE__*/React.createElement(chakra.div, _extends({
    borderRadius: borderRadius,
    __css: trackStyles
  }, rest), /*#__PURE__*/React.createElement(StylesProvider, {
    value: styles
  }, /*#__PURE__*/React.createElement(ProgressFilledTrack, {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    min: min,
    max: max,
    value: value,
    isIndeterminate: isIndeterminate,
    css: css,
    borderRadius: borderRadius
  }), children));
};

if (__DEV__) {
  Progress.displayName = "Progress";
}
//# sourceMappingURL=progress.js.map