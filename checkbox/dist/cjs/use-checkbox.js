"use strict";

exports.__esModule = true;
exports.useCheckbox = useCheckbox;

var _hooks = require("@chakra-ui/hooks");

var _reactUtils = require("@chakra-ui/react-utils");

var _utils = require("@chakra-ui/utils");

var _visuallyHidden = require("@chakra-ui/visually-hidden");

var _react = require("react");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * useCheckbox that provides all the state and focus management logic
 * for a checkbox. It is consumed by the `Checkbox` component
 *
 * @see Docs https://chakra-ui.com/checkbox#hooks
 */
function useCheckbox(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      defaultIsChecked = _props.defaultIsChecked,
      _props$defaultChecked = _props.defaultChecked,
      defaultChecked = _props$defaultChecked === void 0 ? defaultIsChecked : _props$defaultChecked,
      checkedProp = _props.isChecked,
      isFocusable = _props.isFocusable,
      isDisabled = _props.isDisabled,
      isReadOnly = _props.isReadOnly,
      isRequired = _props.isRequired,
      onChange = _props.onChange,
      isIndeterminate = _props.isIndeterminate,
      isInvalid = _props.isInvalid,
      name = _props.name,
      value = _props.value,
      id = _props.id,
      onBlur = _props.onBlur,
      onFocus = _props.onFocus,
      _props$tabIndex = _props.tabIndex,
      tabIndex = _props$tabIndex === void 0 ? undefined : _props$tabIndex,
      ariaLabel = _props["aria-label"],
      ariaLabelledBy = _props["aria-labelledby"],
      ariaInvalid = _props["aria-invalid"],
      ariaDescribedBy = _props["aria-describedby"],
      htmlProps = _objectWithoutPropertiesLoose(_props, ["defaultIsChecked", "defaultChecked", "isChecked", "isFocusable", "isDisabled", "isReadOnly", "isRequired", "onChange", "isIndeterminate", "isInvalid", "name", "value", "id", "onBlur", "onFocus", "tabIndex", "aria-label", "aria-labelledby", "aria-invalid", "aria-describedby"]);

  var onChangeProp = (0, _hooks.useCallbackRef)(onChange);
  var onBlurProp = (0, _hooks.useCallbackRef)(onBlur);
  var onFocusProp = (0, _hooks.useCallbackRef)(onFocus);

  var _useBoolean = (0, _hooks.useBoolean)(),
      isFocused = _useBoolean[0],
      setFocused = _useBoolean[1];

  var _useBoolean2 = (0, _hooks.useBoolean)(),
      isHovered = _useBoolean2[0],
      setHovered = _useBoolean2[1];

  var _useBoolean3 = (0, _hooks.useBoolean)(),
      isActive = _useBoolean3[0],
      setActive = _useBoolean3[1];

  var inputRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(true),
      rootIsLabelElement = _useState[0],
      setRootIsLabelElement = _useState[1];

  var _useState2 = (0, _react.useState)(!!defaultChecked),
      checkedState = _useState2[0],
      setCheckedState = _useState2[1];

  var _useControllableProp = (0, _hooks.useControllableProp)(checkedProp, checkedState),
      isControlled = _useControllableProp[0],
      isChecked = _useControllableProp[1];

  (0, _utils.warn)({
    condition: !!defaultIsChecked,
    message: 'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. ' + 'Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.'
  });
  var handleChange = (0, _react.useCallback)(function (event) {
    if (isReadOnly || isDisabled) {
      event.preventDefault();
      return;
    }

    if (!isControlled) {
      if (isChecked) {
        setCheckedState(event.target.checked);
      } else {
        setCheckedState(isIndeterminate ? true : event.target.checked);
      }
    }

    onChangeProp == null ? void 0 : onChangeProp(event);
  }, [isReadOnly, isDisabled, isChecked, isControlled, isIndeterminate, onChangeProp]);
  (0, _hooks.useSafeLayoutEffect)(function () {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate]);
  var trulyDisabled = isDisabled && !isFocusable;
  var onKeyDown = (0, _react.useCallback)(function (event) {
    if (event.key === " ") {
      setActive.on();
    }
  }, [setActive]);
  var onKeyUp = (0, _react.useCallback)(function (event) {
    if (event.key === " ") {
      setActive.off();
    }
  }, [setActive]);
  /**
   * Sync state with uncontrolled form libraries like `react-hook-form`.
   *
   * These libraries set the checked value for input fields
   * using their refs. For the checkbox, it sets `ref.current.checked = true | false` directly.
   *
   * This means the `isChecked` state will get out of sync with `ref.current.checked`,
   * even though the input validation with work, the UI will not be up to date.
   *
   * Let's correct that by checking and syncing the state accordingly.
   */

  (0, _hooks.useSafeLayoutEffect)(function () {
    if (!inputRef.current) return;
    var notInSync = inputRef.current.checked !== isChecked;

    if (notInSync) {
      setCheckedState(inputRef.current.checked);
    }
  }, [inputRef.current]);
  var getCheckboxProps = (0, _react.useCallback)(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    var onPressDown = function onPressDown(event) {
      // On mousedown, the input blurs and returns focus to the `body`,
      // we need to prevent this. Native checkboxes keeps focus on `input`
      event.preventDefault();
      setActive.on();
    };

    return _extends({}, props, {
      ref: forwardedRef,
      "data-active": (0, _utils.dataAttr)(isActive),
      "data-hover": (0, _utils.dataAttr)(isHovered),
      "data-checked": (0, _utils.dataAttr)(isChecked),
      "data-focus": (0, _utils.dataAttr)(isFocused),
      "data-indeterminate": (0, _utils.dataAttr)(isIndeterminate),
      "data-disabled": (0, _utils.dataAttr)(isDisabled),
      "data-invalid": (0, _utils.dataAttr)(isInvalid),
      "data-readonly": (0, _utils.dataAttr)(isReadOnly),
      "aria-hidden": true,
      onMouseDown: (0, _utils.callAllHandlers)(props.onMouseDown, onPressDown),
      onMouseUp: (0, _utils.callAllHandlers)(props.onMouseUp, setActive.off),
      onMouseEnter: (0, _utils.callAllHandlers)(props.onMouseEnter, setHovered.on),
      onMouseLeave: (0, _utils.callAllHandlers)(props.onMouseLeave, setHovered.off)
    });
  }, [isActive, isChecked, isDisabled, isFocused, isHovered, isIndeterminate, isInvalid, isReadOnly, setActive, setHovered.off, setHovered.on]);
  var getRootProps = (0, _react.useCallback)(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends({}, htmlProps, props, {
      ref: (0, _reactUtils.mergeRefs)(forwardedRef, function (node) {
        if (!node) return;
        setRootIsLabelElement(node.tagName === "LABEL");
      }),
      onClick: (0, _utils.callAllHandlers)(props.onClick, function () {
        /**
         * Accessibility:
         *
         * Ideally, `getRootProps` should be spread unto a `label` element.
         *
         * If the element was changed using the `as` prop or changing
         * the dom node `getRootProps` is spread unto (to a `div` or `span`), we'll trigger
         * click on the input when the element is clicked.
         * @see Issue https://github.com/chakra-ui/chakra-ui/issues/3480
         */
        if (!rootIsLabelElement) {
          var _inputRef$current;

          (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.click();
          (0, _utils.focus)(inputRef.current, {
            nextTick: true
          });
        }
      }),
      "data-disabled": (0, _utils.dataAttr)(isDisabled),
      "data-checked": (0, _utils.dataAttr)(isChecked),
      "data-invalid": (0, _utils.dataAttr)(isInvalid)
    });
  }, [htmlProps, isDisabled, isChecked, isInvalid, rootIsLabelElement]);
  var getInputProps = (0, _react.useCallback)(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends({}, props, {
      ref: (0, _reactUtils.mergeRefs)(inputRef, forwardedRef),
      type: "checkbox",
      name: name,
      value: value,
      id: id,
      tabIndex: tabIndex,
      onChange: (0, _utils.callAllHandlers)(props.onChange, handleChange),
      onBlur: (0, _utils.callAllHandlers)(props.onBlur, onBlurProp, setFocused.off),
      onFocus: (0, _utils.callAllHandlers)(props.onFocus, onFocusProp, setFocused.on),
      onKeyDown: (0, _utils.callAllHandlers)(props.onKeyDown, onKeyDown),
      onKeyUp: (0, _utils.callAllHandlers)(props.onKeyUp, onKeyUp),
      required: isRequired,
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-invalid": ariaInvalid ? Boolean(ariaInvalid) : isInvalid,
      "aria-describedby": ariaDescribedBy,
      "aria-disabled": isDisabled,
      style: _visuallyHidden.visuallyHiddenStyle
    });
  }, [name, value, id, handleChange, setFocused.off, setFocused.on, onBlurProp, onFocusProp, onKeyDown, onKeyUp, isRequired, isChecked, trulyDisabled, isReadOnly, ariaLabel, ariaLabelledBy, ariaInvalid, isInvalid, ariaDescribedBy, isDisabled, tabIndex]);
  var getLabelProps = (0, _react.useCallback)(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return _extends({}, props, {
      ref: forwardedRef,
      onMouseDown: (0, _utils.callAllHandlers)(props.onMouseDown, stopEvent),
      onTouchStart: (0, _utils.callAllHandlers)(props.onTouchStart, stopEvent),
      "data-disabled": (0, _utils.dataAttr)(isDisabled),
      "data-checked": (0, _utils.dataAttr)(isChecked),
      "data-invalid": (0, _utils.dataAttr)(isInvalid)
    });
  }, [isChecked, isDisabled, isInvalid]);
  return {
    state: {
      isInvalid: isInvalid,
      isFocused: isFocused,
      isChecked: isChecked,
      isActive: isActive,
      isHovered: isHovered,
      isIndeterminate: isIndeterminate,
      isDisabled: isDisabled,
      isReadOnly: isReadOnly,
      isRequired: isRequired
    },
    getRootProps: getRootProps,
    getCheckboxProps: getCheckboxProps,
    getInputProps: getInputProps,
    getLabelProps: getLabelProps,
    htmlProps: htmlProps
  };
}
/**
 * Prevent `onBlur` being fired when the checkbox label is touched
 */


function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
//# sourceMappingURL=use-checkbox.js.map