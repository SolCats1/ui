function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useBoolean, useCallbackRef, useControllableState, useDimensions, useIds, useLatestRef, usePanGesture, useUpdateEffect } from "@chakra-ui/hooks";
import { mergeRefs } from "@chakra-ui/react-utils";
import { ariaAttr, callAllHandlers, clampValue, dataAttr, focus, getBox, normalizeEventKey, percentToValue, roundValueToStep, valueToPercent } from "@chakra-ui/utils";
import { useCallback, useMemo, useRef } from "react";
import { getStyles, getIsReversed } from "./slider-utils";

/**
 * React hook that implements an accessible range slider.
 *
 * It is an alternative to `<input type="range" />`, and returns
 * prop getters for the component parts
 *
 * @see Docs     https://chakra-ui.com/docs/form/slider
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices-1.1/#slider
 */
export function useSlider(props) {
  var _getAriaValueText;

  var {
    min = 0,
    max = 100,
    onChange,
    value: valueProp,
    defaultValue,
    isReversed: isReversedProp,
    direction = "ltr",
    orientation = "horizontal",
    id: idProp,
    isDisabled,
    isReadOnly,
    onChangeStart: onChangeStartProp,
    onChangeEnd: onChangeEndProp,
    step = 1,
    getAriaValueText: getAriaValueTextProp,
    "aria-valuetext": ariaValueText,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    name,
    focusThumbOnChange = true
  } = props,
      htmlProps = _objectWithoutPropertiesLoose(props, ["min", "max", "onChange", "value", "defaultValue", "isReversed", "direction", "orientation", "id", "isDisabled", "isReadOnly", "onChangeStart", "onChangeEnd", "step", "getAriaValueText", "aria-valuetext", "aria-label", "aria-labelledby", "name", "focusThumbOnChange"]);

  var onChangeStart = useCallbackRef(onChangeStartProp);
  var onChangeEnd = useCallbackRef(onChangeEndProp);
  var getAriaValueText = useCallbackRef(getAriaValueTextProp);
  var isReversed = getIsReversed({
    isReversed: isReversedProp,
    direction,
    orientation
  });
  /**
   * Enable the slider handle controlled and uncontrolled scenarios
   */

  var [computedValue, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue != null ? defaultValue : getDefaultValue(min, max),
    onChange
  });
  var [isDragging, setDragging] = useBoolean();
  var [isFocused, setFocused] = useBoolean();
  var eventSourceRef = useRef(null);
  var isInteractive = !(isDisabled || isReadOnly);
  /**
   * Constrain the value because it can't be less than min
   * or greater than max
   */

  var value = clampValue(computedValue, min, max);
  var valueRef = useLatestRef(value);
  var prevRef = useRef(valueRef.current);
  var reversedValue = max - value + min;
  var trackValue = isReversed ? reversedValue : value;
  var thumbPercent = valueToPercent(trackValue, min, max);
  var isVertical = orientation === "vertical";
  /**
   * Let's keep a reference to the slider track and thumb
   */

  var trackRef = useRef(null);
  var thumbRef = useRef(null);
  var rootRef = useRef(null);
  /**
   * Generate unique ids for component parts
   */

  var [thumbId, trackId] = useIds(idProp, "slider-thumb", "slider-track");
  /**
   * Get relative value of slider from the event by tracking
   * how far you clicked within the track to determine the value
   *
   * @todo - Refactor this later on to use info from pan session
   */

  var getValueFromPointer = useCallback(event => {
    var _event$touches$, _event$touches;

    if (!trackRef.current) return;
    eventSourceRef.current = "pointer";
    var trackRect = getBox(trackRef.current).borderBox;
    var {
      clientX,
      clientY
    } = (_event$touches$ = (_event$touches = event.touches) == null ? void 0 : _event$touches[0]) != null ? _event$touches$ : event;
    var diff = isVertical ? trackRect.bottom - clientY : clientX - trackRect.left;
    var length = isVertical ? trackRect.height : trackRect.width;
    var percent = diff / length;

    if (isReversed) {
      percent = 1 - percent;
    }

    var nextValue = percentToValue(percent, min, max);

    if (step) {
      nextValue = parseFloat(roundValueToStep(nextValue, min, step));
    }

    nextValue = clampValue(nextValue, min, max);
    return nextValue;
  }, [isVertical, isReversed, max, min, step]);
  var tenSteps = (max - min) / 10;
  var oneStep = step || (max - min) / 100;
  var constrain = useCallback(value => {
    if (!isInteractive) return;
    value = parseFloat(roundValueToStep(value, min, oneStep));
    value = clampValue(value, min, max);
    setValue(value);
  }, [oneStep, max, min, setValue, isInteractive]);
  var actions = useMemo(() => ({
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
    reset: () => constrain(defaultValue || 0),
    stepTo: value => constrain(value)
  }), [constrain, isReversed, value, oneStep, defaultValue]);
  /**
   * Keyboard interaction to ensure users can operate
   * the slider using only their keyboard.
   */

  var onKeyDown = useCallback(event => {
    var eventKey = normalizeEventKey(event);
    var keyMap = {
      ArrowRight: () => actions.stepUp(),
      ArrowUp: () => actions.stepUp(),
      ArrowLeft: () => actions.stepDown(),
      ArrowDown: () => actions.stepDown(),
      PageUp: () => actions.stepUp(tenSteps),
      PageDown: () => actions.stepDown(tenSteps),
      Home: () => constrain(min),
      End: () => constrain(max)
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

  var thumbBoxModel = useDimensions(thumbRef);
  /**
   * Compute styles for all component parts.
   */

  var {
    getThumbStyle,
    rootStyle,
    trackStyle,
    innerTrackStyle
  } = useMemo(() => {
    var _thumbBoxModel$border;

    var thumbRect = (_thumbBoxModel$border = thumbBoxModel == null ? void 0 : thumbBoxModel.borderBox) != null ? _thumbBoxModel$border : {
      width: 0,
      height: 0
    };
    return getStyles({
      isReversed,
      orientation,
      thumbRects: [thumbRect],
      thumbPercents: [thumbPercent]
    });
  }, [isReversed, orientation, thumbBoxModel == null ? void 0 : thumbBoxModel.borderBox, thumbPercent]);
  var focusThumb = useCallback(() => {
    if (thumbRef.current && focusThumbOnChange) {
      setTimeout(() => focus(thumbRef.current));
    }
  }, [focusThumbOnChange]);
  useUpdateEffect(() => {
    focusThumb();

    if (eventSourceRef.current === "keyboard") {
      onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current);
    }
  }, [value, onChangeEnd]);

  var setValueFromPointer = event => {
    var nextValue = getValueFromPointer(event);

    if (nextValue != null && nextValue !== valueRef.current) {
      setValue(nextValue);
    }
  };

  usePanGesture(rootRef, {
    onPanSessionStart(event) {
      if (!isInteractive) return;
      setDragging.on();
      focusThumb();
      setValueFromPointer(event);
      onChangeStart == null ? void 0 : onChangeStart(valueRef.current);
    },

    onPanSessionEnd() {
      if (!isInteractive) return;
      setDragging.off();
      onChangeEnd == null ? void 0 : onChangeEnd(valueRef.current);
      prevRef.current = valueRef.current;
    },

    onPan(event) {
      if (!isInteractive) return;
      setValueFromPointer(event);
    }

  });
  var getRootProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, htmlProps, {
      ref: mergeRefs(ref, rootRef),
      tabIndex: -1,
      "aria-disabled": ariaAttr(isDisabled),
      "data-focused": dataAttr(isFocused),
      style: _extends({}, props.style, rootStyle)
    });
  }, [htmlProps, isDisabled, isFocused, rootStyle]);
  var getTrackProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: mergeRefs(ref, trackRef),
      id: trackId,
      "data-disabled": dataAttr(isDisabled),
      style: _extends({}, props.style, trackStyle)
    });
  }, [isDisabled, trackId, trackStyle]);
  var getInnerTrackProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref,
      style: _extends({}, props.style, innerTrackStyle)
    });
  }, [innerTrackStyle]);
  var getThumbProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref: mergeRefs(ref, thumbRef),
      role: "slider",
      tabIndex: isInteractive ? 0 : undefined,
      id: thumbId,
      "data-active": dataAttr(isDragging),
      "aria-valuetext": valueText,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-orientation": orientation,
      "aria-disabled": ariaAttr(isDisabled),
      "aria-readonly": ariaAttr(isReadOnly),
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabel ? undefined : ariaLabelledBy,
      style: _extends({}, props.style, getThumbStyle(0)),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
      onFocus: callAllHandlers(props.onFocus, setFocused.on),
      onBlur: callAllHandlers(props.onBlur, setFocused.off)
    });
  }, [isInteractive, thumbId, isDragging, valueText, min, max, value, orientation, isDisabled, isReadOnly, ariaLabel, ariaLabelledBy, getThumbStyle, onKeyDown, setFocused.on, setFocused.off]);
  var getMarkerProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    var isInRange = !(props.value < min || props.value > max);
    var isHighlighted = value >= props.value;
    var markerPercent = valueToPercent(props.value, min, max);

    var markerStyle = _extends({
      position: "absolute",
      pointerEvents: "none"
    }, orient({
      orientation,
      vertical: {
        bottom: isReversed ? 100 - markerPercent + "%" : markerPercent + "%"
      },
      horizontal: {
        left: isReversed ? 100 - markerPercent + "%" : markerPercent + "%"
      }
    }));

    return _extends({}, props, {
      ref,
      role: "presentation",
      "aria-hidden": true,
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(!isInRange),
      "data-highlighted": dataAttr(isHighlighted),
      style: _extends({}, props.style, markerStyle)
    });
  }, [isDisabled, isReversed, max, min, orientation, value]);
  var getInputProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      ref,
      type: "hidden",
      value,
      name
    });
  }, [name, value]);
  return {
    state: {
      value,
      isFocused,
      isDragging
    },
    actions,
    getRootProps,
    getTrackProps,
    getInnerTrackProps,
    getThumbProps,
    getMarkerProps,
    getInputProps
  };
}

function orient(options) {
  var {
    orientation,
    vertical,
    horizontal
  } = options;
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