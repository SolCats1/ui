"use strict";

exports.__esModule = true;
exports.useSlider = useSlider;

var _hooks = require("@chakra-ui/hooks");

var _reactUtils = require("@chakra-ui/react-utils");

var _utils = require("@chakra-ui/utils");

var _react = require("react");

var _sliderUtils = require("./slider-utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * React hook that implements an accessible range slider.
 *
 * It is an alternative to `<input type="range" />`, and returns
 * prop getters for the component parts
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#slider
 */
function useSlider(props) {
  var _getAriaValueText;

  var _props$min = props.min,
      min = _props$min === void 0 ? 0 : _props$min,
      _props$max = props.max,
      max = _props$max === void 0 ? 100 : _props$max,
      onChange = props.onChange,
      valueProp = props.value,
      defaultValue = props.defaultValue,
      isReversedProp = props.isReversed,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? "ltr" : _props$direction,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? "horizontal" : _props$orientation,
      idProp = props.id,
      isDisabled = props.isDisabled,
      isReadOnly = props.isReadOnly,
      onChangeStartProp = props.onChangeStart,
      onChangeEndProp = props.onChangeEnd,
      _props$step = props.step,
      step = _props$step === void 0 ? 1 : _props$step,
      getAriaValueTextProp = props.getAriaValueText,
      ariaValueText = props["aria-valuetext"],
      ariaLabel = props["aria-label"],
      ariaLabelledBy = props["aria-labelledby"],
      name = props.name,
      _props$focusThumbOnCh = props.focusThumbOnChange,
      focusThumbOnChange = _props$focusThumbOnCh === void 0 ? true : _props$focusThumbOnCh,
      htmlProps = _objectWithoutPropertiesLoose(props, ["min", "max", "onChange", "value", "defaultValue", "isReversed", "direction", "orientation", "id", "isDisabled", "isReadOnly", "onChangeStart", "onChangeEnd", "step", "getAriaValueText", "aria-valuetext", "aria-label", "aria-labelledby", "name", "focusThumbOnChange"]);

  var onChangeStart = (0, _hooks.useCallbackRef)(onChangeStartProp);
  var onChangeEnd = (0, _hooks.useCallbackRef)(onChangeEndProp);
  var getAriaValueText = (0, _hooks.useCallbackRef)(getAriaValueTextProp);
  var isReversed = (0, _sliderUtils.getIsReversed)({
    isReversed: isReversedProp,
    direction: direction,
    orientation: orientation
  });
  /**
   * Enable the slider handle controlled and uncontrolled scenarios
   */

  var _useControllableState = (0, _hooks.useControllableState)({
    value: valueProp,
    defaultValue: defaultValue != null ? defaultValue : getDefaultValue(min, max),
    onChange: onChange
  }),
      computedValue = _useControllableState[0],
      setValue = _useControllableState[1];

  var _useBoolean = (0, _hooks.useBoolean)(),
      isDragging = _useBoolean[0],
      setDragging = _useBoolean[1];

  var _useBoolean2 = (0, _hooks.useBoolean)(),
      isFocused = _useBoolean2[0],
      setFocused = _useBoolean2[1];

  var eventSourceRef = (0, _react.useRef)(null);
  var isInteractive = !(isDisabled || isReadOnly);
  /**
   * Constrain the value because it can't be less than min
   * or greater than max
   */

  var value = (0, _utils.clampValue)(computedValue, min, max);
  var valueRef = (0, _hooks.useLatestRef)(value);
  var prevRef = (0, _react.useRef)(valueRef.current);
  var reversedValue = max - value + min;
  var trackValue = isReversed ? reversedValue : value;
  var thumbPercent = (0, _utils.valueToPercent)(trackValue, min, max);
  var isVertical = orientation === "vertical";
  /**
   * Let's keep a reference to the slider track and thumb
   */

  var trackRef = (0, _react.useRef)(null);
  var thumbRef = (0, _react.useRef)(null);
  var rootRef = (0, _react.useRef)(null);
  /**
   * Generate unique ids for component parts
   */

  var _useIds = (0, _hooks.useIds)(idProp, "slider-thumb", "slider-track"),
      thumbId = _useIds[0],
      trackId = _useIds[1];
  /**
   * Get relative value of slider from the event by tracking
   * how far you clicked within the track to determine the value
   *
   * @todo - Refactor this later on to use info from pan session
   */


  var getValueFromPointer = (0, _react.useCallback)(function (event) {
    var _event$touches$, _event$touches;

    if (!trackRef.current) return;
    eventSourceRef.current = "pointer";
    var trackRect = (0, _utils.getBox)(trackRef.current).borderBox;

    var _ref = (_event$touches$ = (_event$touches = event.touches) == null ? void 0 : _event$touches[0]) != null ? _event$touches$ : event,
        clientX = _ref.clientX,
        clientY = _ref.clientY;

    var diff = isVertical ? trackRect.bottom - clientY : clientX - trackRect.left;
    var length = isVertical ? trackRect.height : trackRect.width;
    var percent = diff / length;

    if (isReversed) {
      percent = 1 - percent;
    }

    var nextValue = (0, _utils.percentToValue)(percent, min, max);

    if (step) {
      nextValue = parseFloat((0, _utils.roundValueToStep)(nextValue, min, step));
    }

    nextValue = (0, _utils.clampValue)(nextValue, min, max);
    return nextValue;
  }, [isVertical, isReversed, max, min, step]);
  var tenSteps = (max - min) / 10;
  var oneStep = step || (max - min) / 100;
  var constrain = (0, _react.useCallback)(function (value) {
    if (!isInteractive) return;
    value = parseFloat((0, _utils.roundValueToStep)(value, min, oneStep));
    value = (0, _utils.clampValue)(value, min, max);
    setValue(value);
  }, [oneStep, max, min, setValue, isInteractive]);
  var actions = (0, _react.useMemo)(function () {
    return {
      stepUp: function stepUp(step) {
        if (step === void 0) {
          step = oneStep;
        }

        var next = isReversed ? value - step : value + step;
        constrain(next);
      },
      stepDown: function stepDown(step) {
        if (step === void 0) {
          step = oneStep;
        }

        var next = isReversed ? value + step : value - step;
        constrain(next);
      },
      reset: function reset() {
        return constrain(defaultValue || 0);
      },
      stepTo: function stepTo(value) {
        return constrain(value);
      }
    };
  }, [constrain, isReversed, value, oneStep, defaultValue]);
  /**
   * Keyboard interaction to ensure users can operate
   * the slider using only their keyboard.
   */

  var onKeyDown = (0, _react.useCallback)(function (event) {
    var eventKey = (0, _utils.normalizeEventKey)(event);
    var keyMap = {
      ArrowRight: function ArrowRight() {
        return actions.stepUp();
      },
      ArrowUp: function ArrowUp() {
        return actions.stepUp();
      },
      ArrowLeft: function ArrowLeft() {
        return actions.stepDown();
      },
      ArrowDown: function ArrowDown() {
        return actions.stepDown();
      },
      PageUp: function PageUp() {
        return actions.stepUp(tenSteps);
      },
      PageDown: function PageDown() {
        return actions.stepDown(tenSteps);
      },
      Home: function Home() {
        return constrain(min);
      },
      End: function End() {
        return constrain(max);
      }
    };
    var action = keyMap[eventKey];

    if (action) {
      event.preventDefault();
      event.stopPropagation();
      action(event);
      eventSourceRef.current = "keyboard";
    }
  }, [actions, constrain, max, min, tenSteps]);
  /**
   * ARIA (Optional): To define a human readable representation of the value,
   * we allow users pass aria-valuetext.
   */

  var valueText = (_getAriaValueText = getAriaValueText == null ? void 0 : getAriaValueText(value)) != null ? _getAriaValueText : ariaValueText;
  /**
   * Measure the dimensions of the thumb so
   * we can center it within the track properly
   */

  var thumbBoxModel = (0, _hooks.useDimensions)(thumbRef);
  /**
   * Compute styles for all component parts.
   */

  var _useMemo = (0, _react.useMemo)(function () {
    var _thumbBoxModel$border;

    var thumbRect = (_thumbBoxModel$border = thumbBoxModel == null ? void 0 : thumbBoxModel.borderBox) != null ? _thumbBoxModel$border : {
      width: 0,
      height: 0
    };
    return (0, _sliderUtils.getStyles)({
      isReversed: isReversed,
      orientation: orientation,
      thumbRects: [thumbRect],
      thumbPercents: [thumbPercent]
    });
  }, [isReversed, orientation, thumbBoxModel == null ? void 0 : thumbBoxModel.borderBox, thumbPercent]),
      getThumbStyle = _useMemo.getThumbStyle,
      rootStyle = _useMemo.rootStyle,
      trackStyle = _useMemo.trackStyle,
      innerTrackStyle = _useMemo.innerTrackStyle;

  var focusThumb = (0, _react.useCallback)(function () {
    if (thumbRef.current && focusThumbOnChange) {
      setTimeout(function () {
        return (0, _utils.focus)(thumbRef.current);
      });
    }
  }, [focusThumbOnChange]);
  (0, _hooks.useUpdateEffect)(function () {
    focusThumb();

    if (eventSourceRef.current === "keyboard") {
      onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current);
    }
  }, [value, onChangeEnd]);

  var setValueFromPointer = function setValueFromPointer(event) {
    var nextValue = getValueFromPointer(event);

    if (nextValue != null && nextValue !== valueRef.current) {
      setValue(nextValue);
    }
  };

  (0, _hooks.usePanGesture)(rootRef, {
    onPanSessionStart: function onPanSessionStart(event) {
      if (!isInteractive) return;
      setDragging.on();
      focusThumb();
      setValueFromPointer(event);
      onChangeStart == null ? void 0 : onChangeStart(valueRef.current);
    },
    onPanSessionEnd: function onPanSessionEnd() {
      if (!isInteractive) return;
      setDragging.off();
      onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current);
      prevRef.current = valueRef.current;
    },
    onPan: function onPan(event) {
      if (!isInteractive) return;
      setValueFromPointer(event);
    }
  });
  var getRootProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, htmlProps, {
      ref: (0, _reactUtils.mergeRefs)(ref, rootRef),
      tabIndex: -1,
      "aria-disabled": (0, _utils.ariaAttr)(isDisabled),
      "data-focused": (0, _utils.dataAttr)(isFocused),
      style: _extends({}, props.style, rootStyle)
    });
  }, [htmlProps, isDisabled, isFocused, rootStyle]);
  var getTrackProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: (0, _reactUtils.mergeRefs)(ref, trackRef),
      id: trackId,
      "data-disabled": (0, _utils.dataAttr)(isDisabled),
      style: _extends({}, props.style, trackStyle)
    });
  }, [isDisabled, trackId, trackStyle]);
  var getInnerTrackProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: ref,
      style: _extends({}, props.style, innerTrackStyle)
    });
  }, [innerTrackStyle]);
  var getThumbProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: (0, _reactUtils.mergeRefs)(ref, thumbRef),
      role: "slider",
      tabIndex: isInteractive ? 0 : undefined,
      id: thumbId,
      "data-active": (0, _utils.dataAttr)(isDragging),
      "aria-valuetext": valueText,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-orientation": orientation,
      "aria-disabled": (0, _utils.ariaAttr)(isDisabled),
      "aria-readonly": (0, _utils.ariaAttr)(isReadOnly),
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabel ? undefined : ariaLabelledBy,
      style: _extends({}, props.style, getThumbStyle(0)),
      onKeyDown: (0, _utils.callAllHandlers)(props.onKeyDown, onKeyDown),
      onFocus: (0, _utils.callAllHandlers)(props.onFocus, setFocused.on),
      onBlur: (0, _utils.callAllHandlers)(props.onBlur, setFocused.off)
    });
  }, [isInteractive, thumbId, isDragging, valueText, min, max, value, orientation, isDisabled, isReadOnly, ariaLabel, ariaLabelledBy, getThumbStyle, onKeyDown, setFocused.on, setFocused.off]);
  var getMarkerProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    var isInRange = !(props.value < min || props.value > max);
    var isHighlighted = value >= props.value;
    var markerPercent = (0, _utils.valueToPercent)(props.value, min, max);

    var markerStyle = _extends({
      position: "absolute",
      pointerEvents: "none"
    }, orient({
      orientation: orientation,
      vertical: {
        bottom: isReversed ? 100 - markerPercent + "%" : markerPercent + "%"
      },
      horizontal: {
        left: isReversed ? 100 - markerPercent + "%" : markerPercent + "%"
      }
    }));

    return _extends({}, props, {
      ref: ref,
      role: "presentation",
      "aria-hidden": true,
      "data-disabled": (0, _utils.dataAttr)(isDisabled),
      "data-invalid": (0, _utils.dataAttr)(!isInRange),
      "data-highlighted": (0, _utils.dataAttr)(isHighlighted),
      style: _extends({}, props.style, markerStyle)
    });
  }, [isDisabled, isReversed, max, min, orientation, value]);
  var getInputProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: ref,
      type: "hidden",
      value: value,
      name: name
    });
  }, [name, value]);
  return {
    state: {
      value: value,
      isFocused: isFocused,
      isDragging: isDragging
    },
    actions: actions,
    getRootProps: getRootProps,
    getTrackProps: getTrackProps,
    getInnerTrackProps: getInnerTrackProps,
    getThumbProps: getThumbProps,
    getMarkerProps: getMarkerProps,
    getInputProps: getInputProps
  };
}

function orient(options) {
  var orientation = options.orientation,
      vertical = options.vertical,
      horizontal = options.horizontal;
  return orientation === "vertical" ? vertical : horizontal;
}
/**
 * The browser <input type="range" /> calculates
 * the default value of a slider by using mid-point
 * between the min and the max.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
 */


function getDefaultValue(min, max) {
  return max < min ? min : min + (max - min) / 2;
}
//# sourceMappingURL=use-slider.js.map