"use strict";

exports.__esModule = true;
exports.useTooltip = useTooltip;

var _hooks = require("@chakra-ui/hooks");

var _popper = require("@chakra-ui/popper");

var _reactUtils = require("@chakra-ui/react-utils");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useTooltip(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$openDelay = _props.openDelay,
      openDelay = _props$openDelay === void 0 ? 0 : _props$openDelay,
      _props$closeDelay = _props.closeDelay,
      closeDelay = _props$closeDelay === void 0 ? 0 : _props$closeDelay,
      _props$closeOnClick = _props.closeOnClick,
      closeOnClick = _props$closeOnClick === void 0 ? true : _props$closeOnClick,
      closeOnMouseDown = _props.closeOnMouseDown,
      onOpenProp = _props.onOpen,
      onCloseProp = _props.onClose,
      placement = _props.placement,
      id = _props.id,
      isOpenProp = _props.isOpen,
      defaultIsOpen = _props.defaultIsOpen,
      _props$arrowSize = _props.arrowSize,
      arrowSize = _props$arrowSize === void 0 ? 10 : _props$arrowSize,
      arrowShadowColor = _props.arrowShadowColor,
      arrowPadding = _props.arrowPadding,
      modifiers = _props.modifiers,
      isDisabled = _props.isDisabled,
      gutter = _props.gutter,
      offset = _props.offset,
      direction = _props.direction,
      htmlProps = _objectWithoutPropertiesLoose(_props, ["openDelay", "closeDelay", "closeOnClick", "closeOnMouseDown", "onOpen", "onClose", "placement", "id", "isOpen", "defaultIsOpen", "arrowSize", "arrowShadowColor", "arrowPadding", "modifiers", "isDisabled", "gutter", "offset", "direction"]);

  var _useDisclosure = (0, _hooks.useDisclosure)({
    isOpen: isOpenProp,
    defaultIsOpen: defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp
  }),
      isOpen = _useDisclosure.isOpen,
      onOpen = _useDisclosure.onOpen,
      onClose = _useDisclosure.onClose;

  var _usePopper = (0, _popper.usePopper)({
    enabled: isOpen,
    placement: placement,
    arrowPadding: arrowPadding,
    modifiers: modifiers,
    gutter: gutter,
    offset: offset,
    direction: direction
  }),
      referenceRef = _usePopper.referenceRef,
      getPopperProps = _usePopper.getPopperProps,
      getArrowInnerProps = _usePopper.getArrowInnerProps,
      getArrowProps = _usePopper.getArrowProps;

  var tooltipId = (0, _hooks.useId)(id, "tooltip");
  var ref = React.useRef(null);
  var enterTimeout = React.useRef();
  var exitTimeout = React.useRef();
  var openWithDelay = React.useCallback(function () {
    if (!isDisabled) {
      enterTimeout.current = window.setTimeout(onOpen, openDelay);
    }
  }, [isDisabled, onOpen, openDelay]);
  var closeWithDelay = React.useCallback(function () {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }

    exitTimeout.current = window.setTimeout(onClose, closeDelay);
  }, [closeDelay, onClose]);
  var onClick = React.useCallback(function () {
    if (closeOnClick) {
      closeWithDelay();
    }
  }, [closeOnClick, closeWithDelay]);
  var onMouseDown = React.useCallback(function () {
    if (closeOnMouseDown) {
      closeWithDelay();
    }
  }, [closeOnMouseDown, closeWithDelay]);

  var onKeyDown = function onKeyDown(event) {
    if (isOpen && event.key === "Escape") {
      closeWithDelay();
    }
  };

  (0, _hooks.useEventListener)("keydown", onKeyDown);
  React.useEffect(function () {
    return function () {
      clearTimeout(enterTimeout.current);
      clearTimeout(exitTimeout.current);
    };
  }, []);
  /**
   * This allows for catching mouseleave events when the tooltip
   * trigger is disabled. There's currently a known issue in
   * React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */

  (0, _hooks.useEventListener)("mouseleave", closeWithDelay, function () {
    return ref.current;
  });
  var getTriggerProps = React.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends({}, props, {
      ref: (0, _reactUtils.mergeRefs)(ref, _ref, referenceRef),
      onMouseEnter: (0, _utils.callAllHandlers)(props.onMouseEnter, openWithDelay),
      onClick: (0, _utils.callAllHandlers)(props.onClick, onClick),
      onMouseDown: (0, _utils.callAllHandlers)(props.onMouseDown, onMouseDown),
      onFocus: (0, _utils.callAllHandlers)(props.onFocus, openWithDelay),
      onBlur: (0, _utils.callAllHandlers)(props.onBlur, closeWithDelay),
      "aria-describedby": isOpen ? tooltipId : undefined
    });

    return triggerProps;
  }, [openWithDelay, closeWithDelay, onMouseDown, isOpen, tooltipId, onClick, referenceRef]);
  var getTooltipPositionerProps = React.useCallback(function (props, forwardedRef) {
    var _extends2;

    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return getPopperProps(_extends({}, props, {
      style: _extends({}, props.style, (_extends2 = {}, _extends2[_popper.popperCSSVars.arrowSize["var"]] = arrowSize ? (0, _utils.px)(arrowSize) : undefined, _extends2[_popper.popperCSSVars.arrowShadowColor["var"]] = arrowShadowColor, _extends2))
    }), forwardedRef);
  }, [getPopperProps, arrowSize, arrowShadowColor]);
  var getTooltipProps = React.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var tooltipProps = _extends({
      ref: _ref
    }, htmlProps, props, {
      id: tooltipId,
      role: "tooltip",
      style: _extends({}, props.style, {
        position: "relative",
        transformOrigin: _popper.popperCSSVars.transformOrigin.varRef
      })
    });

    return tooltipProps;
  }, [htmlProps, tooltipId]);
  return {
    isOpen: isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps: getTriggerProps,
    getTooltipProps: getTooltipProps,
    getTooltipPositionerProps: getTooltipPositionerProps,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps
  };
}
//# sourceMappingURL=use-tooltip.js.map