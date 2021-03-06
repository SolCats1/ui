"use strict";

exports.__esModule = true;
exports.useCounter = useCounter;

var _hooks = require("@chakra-ui/hooks");

var _utils = require("@chakra-ui/utils");

var _react = require("react");

function useCounter(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      onChange = _props.onChange,
      precisionProp = _props.precision,
      defaultValue = _props.defaultValue,
      valueProp = _props.value,
      _props$step = _props.step,
      stepProp = _props$step === void 0 ? 1 : _props$step,
      _props$min = _props.min,
      min = _props$min === void 0 ? _utils.minSafeInteger : _props$min,
      _props$max = _props.max,
      max = _props$max === void 0 ? _utils.maxSafeInteger : _props$max,
      _props$keepWithinRang = _props.keepWithinRange,
      keepWithinRange = _props$keepWithinRang === void 0 ? true : _props$keepWithinRang;
  var onChangeProp = (0, _hooks.useCallbackRef)(onChange);

  var _useState = (0, _react.useState)(function () {
    var _cast;

    if (defaultValue == null) return "";
    return (_cast = cast(defaultValue, stepProp, precisionProp)) != null ? _cast : "";
  }),
      valueState = _useState[0],
      setValue = _useState[1];
  /**
   * Because the component that consumes this hook can be controlled or uncontrolled
   * we'll keep track of that
   */


  var _useControllableProp = (0, _hooks.useControllableProp)(valueProp, valueState),
      isControlled = _useControllableProp[0],
      value = _useControllableProp[1];

  var decimalPlaces = getDecimalPlaces(parse(value), stepProp);
  var precision = precisionProp != null ? precisionProp : decimalPlaces;
  var update = (0, _react.useCallback)(function (next) {
    if (next === value) return;

    if (!isControlled) {
      setValue(next.toString());
    }

    onChangeProp == null ? void 0 : onChangeProp(next.toString(), parse(next));
  }, [onChangeProp, isControlled, value]); // Function to clamp the value and round it to the precision

  var clamp = (0, _react.useCallback)(function (value) {
    var nextValue = value;

    if (keepWithinRange) {
      nextValue = (0, _utils.clampValue)(nextValue, min, max);
    }

    return (0, _utils.toPrecision)(nextValue, precision);
  }, [precision, keepWithinRange, max, min]);
  var increment = (0, _react.useCallback)(function (step) {
    if (step === void 0) {
      step = stepProp;
    }

    var next;
    /**
     * Let's follow the native browser behavior for
     * scenarios where the input starts empty ("")
     */

    if (value === "") {
      /**
       * If `min` is set, native input, starts at the `min`.
       * Else, it starts at `step`
       */
      next = parse(step);
    } else {
      next = parse(value) + step;
    }

    next = clamp(next);
    update(next);
  }, [clamp, stepProp, update, value]);
  var decrement = (0, _react.useCallback)(function (step) {
    if (step === void 0) {
      step = stepProp;
    }

    var next; // Same thing here. We'll follow native implementation

    if (value === "") {
      next = parse(-step);
    } else {
      next = parse(value) - step;
    }

    next = clamp(next);
    update(next);
  }, [clamp, stepProp, update, value]);
  var reset = (0, _react.useCallback)(function () {
    var next;

    if (defaultValue == null) {
      next = "";
    } else {
      var _cast2;

      next = (_cast2 = cast(defaultValue, stepProp, precisionProp)) != null ? _cast2 : min;
    }

    update(next);
  }, [defaultValue, precisionProp, stepProp, update, min]);
  var castValue = (0, _react.useCallback)(function (value) {
    var _cast3;

    var nextValue = (_cast3 = cast(value, stepProp, precision)) != null ? _cast3 : min;
    update(nextValue);
  }, [precision, stepProp, update, min]);
  var valueAsNumber = parse(value);
  /**
   * Common range checks
   */

  var isOutOfRange = valueAsNumber > max || valueAsNumber < min;
  var isAtMax = valueAsNumber === max;
  var isAtMin = valueAsNumber === min;
  return {
    isOutOfRange: isOutOfRange,
    isAtMax: isAtMax,
    isAtMin: isAtMin,
    precision: precision,
    value: value,
    valueAsNumber: valueAsNumber,
    update: update,
    reset: reset,
    increment: increment,
    decrement: decrement,
    clamp: clamp,
    cast: castValue,
    setValue: setValue
  };
}

function parse(value) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ""));
}

function getDecimalPlaces(value, step) {
  return Math.max((0, _utils.countDecimalPlaces)(step), (0, _utils.countDecimalPlaces)(value));
}

function cast(value, step, precision) {
  var parsedValue = parse(value);
  if (Number.isNaN(parsedValue)) return undefined;
  var decimalPlaces = getDecimalPlaces(parsedValue, step);
  return (0, _utils.toPrecision)(parsedValue, precision != null ? precision : decimalPlaces);
}
//# sourceMappingURL=use-counter.js.map