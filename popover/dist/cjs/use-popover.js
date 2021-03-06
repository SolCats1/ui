"use strict";

exports.__esModule = true;
exports.usePopover = usePopover;

var _hooks = require("@chakra-ui/hooks");

var _popper = require("@chakra-ui/popper");

var _reactUtils = require("@chakra-ui/react-utils");

var _utils = require("@chakra-ui/utils");

var _react = require("react");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TRIGGER = {
  click: "click",
  hover: "hover"
};

/**
 * @internal
 */
function usePopover(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$closeOnBlur = _props.closeOnBlur,
      closeOnBlur = _props$closeOnBlur === void 0 ? true : _props$closeOnBlur,
      _props$closeOnEsc = _props.closeOnEsc,
      closeOnEsc = _props$closeOnEsc === void 0 ? true : _props$closeOnEsc,
      initialFocusRef = _props.initialFocusRef,
      id = _props.id,
      _props$returnFocusOnC = _props.returnFocusOnClose,
      returnFocusOnClose = _props$returnFocusOnC === void 0 ? true : _props$returnFocusOnC,
      _props$autoFocus = _props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus,
      arrowSize = _props.arrowSize,
      arrowShadowColor = _props.arrowShadowColor,
      _props$trigger = _props.trigger,
      trigger = _props$trigger === void 0 ? TRIGGER.click : _props$trigger,
      _props$openDelay = _props.openDelay,
      openDelay = _props$openDelay === void 0 ? 200 : _props$openDelay,
      _props$closeDelay = _props.closeDelay,
      closeDelay = _props$closeDelay === void 0 ? 200 : _props$closeDelay,
      isLazy = _props.isLazy,
      _props$lazyBehavior = _props.lazyBehavior,
      lazyBehavior = _props$lazyBehavior === void 0 ? "unmount" : _props$lazyBehavior,
      computePositionOnMount = _props.computePositionOnMount,
      popperProps = _objectWithoutPropertiesLoose(_props, ["closeOnBlur", "closeOnEsc", "initialFocusRef", "id", "returnFocusOnClose", "autoFocus", "arrowSize", "arrowShadowColor", "trigger", "openDelay", "closeDelay", "isLazy", "lazyBehavior", "computePositionOnMount"]);

  var _useDisclosure = (0, _hooks.useDisclosure)(props),
      isOpen = _useDisclosure.isOpen,
      onClose = _useDisclosure.onClose,
      onOpen = _useDisclosure.onOpen,
      onToggle = _useDisclosure.onToggle;

  var triggerRef = (0, _react.useRef)(null);
  var popoverRef = (0, _react.useRef)(null);
  var isHoveringRef = (0, _react.useRef)(false);
  var hasBeenOpened = (0, _react.useRef)(false);

  if (isOpen) {
    hasBeenOpened.current = true;
  }

  var _useState = (0, _react.useState)(false),
      hasHeader = _useState[0],
      setHasHeader = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      hasBody = _useState2[0],
      setHasBody = _useState2[1];

  var _useIds = (0, _hooks.useIds)(id, "popover-trigger", "popover-content", "popover-header", "popover-body"),
      triggerId = _useIds[0],
      popoverId = _useIds[1],
      headerId = _useIds[2],
      bodyId = _useIds[3];

  var _usePopper = (0, _popper.usePopper)(_extends({}, popperProps, {
    enabled: isOpen || !!computePositionOnMount
  })),
      referenceRef = _usePopper.referenceRef,
      getArrowProps = _usePopper.getArrowProps,
      getPopperProps = _usePopper.getPopperProps,
      getArrowInnerProps = _usePopper.getArrowInnerProps,
      forceUpdate = _usePopper.forceUpdate;

  (0, _hooks.useFocusOnPointerDown)({
    enabled: isOpen,
    ref: triggerRef
  });
  (0, _hooks.useFocusOnHide)(popoverRef, {
    focusRef: triggerRef,
    visible: isOpen,
    shouldFocus: returnFocusOnClose && trigger === TRIGGER.click
  });
  (0, _hooks.useFocusOnShow)(popoverRef, {
    focusRef: initialFocusRef,
    visible: isOpen,
    shouldFocus: autoFocus && trigger === TRIGGER.click
  });
  var shouldRenderChildren = (0, _utils.determineLazyBehavior)({
    hasBeenSelected: hasBeenOpened.current,
    isLazy: isLazy,
    lazyBehavior: lazyBehavior,
    isSelected: isOpen
  });
  var getPopoverProps = (0, _react.useCallback)(function (props, _ref) {
    var _extends2;

    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var popoverProps = _extends({}, props, {
      style: _extends({}, props.style, (_extends2 = {
        transformOrigin: _popper.popperCSSVars.transformOrigin.varRef
      }, _extends2[_popper.popperCSSVars.arrowSize["var"]] = arrowSize ? (0, _utils.px)(arrowSize) : undefined, _extends2[_popper.popperCSSVars.arrowShadowColor["var"]] = arrowShadowColor, _extends2)),
      ref: (0, _reactUtils.mergeRefs)(popoverRef, _ref),
      children: shouldRenderChildren ? props.children : null,
      id: popoverId,
      tabIndex: -1,
      role: "dialog",
      onKeyDown: (0, _utils.callAllHandlers)(props.onKeyDown, function (event) {
        if (closeOnEsc && event.key === "Escape") {
          onClose();
        }
      }),
      onBlur: (0, _utils.callAllHandlers)(props.onBlur, function (event) {
        var relatedTarget = (0, _utils.getRelatedTarget)(event);
        var targetIsPopover = (0, _utils.contains)(popoverRef.current, relatedTarget);
        var targetIsTrigger = (0, _utils.contains)(triggerRef.current, relatedTarget);
        var isValidBlur = !targetIsPopover && !targetIsTrigger;

        if (isOpen && closeOnBlur && isValidBlur) {
          onClose();
        }
      }),
      "aria-labelledby": hasHeader ? headerId : undefined,
      "aria-describedby": hasBody ? bodyId : undefined
    });

    if (trigger === TRIGGER.hover) {
      popoverProps.role = "tooltip";
      popoverProps.onMouseEnter = (0, _utils.callAllHandlers)(props.onMouseEnter, function () {
        isHoveringRef.current = true;
      });
      popoverProps.onMouseLeave = (0, _utils.callAllHandlers)(props.onMouseLeave, function () {
        isHoveringRef.current = false;
        setTimeout(onClose, closeDelay);
      });
    }

    return popoverProps;
  }, [shouldRenderChildren, popoverId, hasHeader, headerId, hasBody, bodyId, trigger, closeOnEsc, onClose, isOpen, closeOnBlur, closeDelay, arrowShadowColor, arrowSize]);
  var getPopoverPositionerProps = (0, _react.useCallback)(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return getPopperProps(_extends({}, props, {
      style: _extends({
        visibility: isOpen ? "visible" : "hidden"
      }, props.style)
    }), forwardedRef);
  }, [isOpen, getPopperProps]);
  var openTimeout = (0, _react.useRef)();
  var closeTimeout = (0, _react.useRef)();
  var getTriggerProps = (0, _react.useCallback)(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends({}, props, {
      ref: (0, _reactUtils.mergeRefs)(triggerRef, _ref, referenceRef),
      id: triggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpen,
      "aria-controls": popoverId
    });

    if (trigger === TRIGGER.click) {
      triggerProps.onClick = (0, _utils.callAllHandlers)(props.onClick, onToggle);
    }

    if (trigger === TRIGGER.hover) {
      /**
       * Any content that shows on pointer hover should also show on keyboard focus.
       * Consider focus and blur to be the `hover` for keyboard users.
       *
       * @see https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
       */
      triggerProps.onFocus = (0, _utils.callAllHandlers)(props.onFocus, onOpen);
      triggerProps.onBlur = (0, _utils.callAllHandlers)(props.onBlur, onClose);
      /**
       * Any content that shows on hover or focus must be dismissible.
       * This case pressing `Escape` will dismiss the popover
       */

      triggerProps.onKeyDown = (0, _utils.callAllHandlers)(props.onKeyDown, function (event) {
        if (event.key === "Escape") {
          onClose();
        }
      });
      triggerProps.onMouseEnter = (0, _utils.callAllHandlers)(props.onMouseEnter, function () {
        isHoveringRef.current = true;
        openTimeout.current = window.setTimeout(onOpen, openDelay);
      });
      triggerProps.onMouseLeave = (0, _utils.callAllHandlers)(props.onMouseLeave, function () {
        isHoveringRef.current = false;

        if (openTimeout.current) {
          clearTimeout(openTimeout.current);
          openTimeout.current = undefined;
        }

        closeTimeout.current = window.setTimeout(function () {
          if (isHoveringRef.current === false) {
            onClose();
          }
        }, closeDelay);
      });
    }

    return triggerProps;
  }, [triggerId, isOpen, popoverId, trigger, referenceRef, onToggle, onOpen, onClose, openDelay, closeDelay]);
  (0, _react.useEffect)(function () {
    return function () {
      if (openTimeout.current) {
        clearTimeout(openTimeout.current);
      }

      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);
  var getHeaderProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      id: headerId,
      ref: (0, _reactUtils.mergeRefs)(ref, function (node) {
        setHasHeader(!!node);
      })
    });
  }, [headerId]);
  var getBodyProps = (0, _react.useCallback)(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      id: bodyId,
      ref: (0, _reactUtils.mergeRefs)(ref, function (node) {
        setHasBody(!!node);
      })
    });
  }, [bodyId]);
  return {
    forceUpdate: forceUpdate,
    isOpen: isOpen,
    onClose: onClose,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps,
    getPopoverPositionerProps: getPopoverPositionerProps,
    getPopoverProps: getPopoverProps,
    getTriggerProps: getTriggerProps,
    getHeaderProps: getHeaderProps,
    getBodyProps: getBodyProps
  };
}
//# sourceMappingURL=use-popover.js.map