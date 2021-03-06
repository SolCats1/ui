function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useDisclosure, useFocusOnHide, useFocusOnPointerDown, useFocusOnShow, useIds } from "@chakra-ui/hooks";
import { popperCSSVars, usePopper } from "@chakra-ui/popper";
import { mergeRefs } from "@chakra-ui/react-utils";
import { callAllHandlers, contains, determineLazyBehavior, getRelatedTarget, px } from "@chakra-ui/utils";
import { useCallback, useEffect, useRef, useState } from "react";
var TRIGGER = {
  click: "click",
  hover: "hover"
};

/**
 * @internal
 */
export function usePopover(props) {
  if (props === void 0) {
    props = {};
  }

  var {
    closeOnBlur = true,
    closeOnEsc = true,
    initialFocusRef,
    id,
    returnFocusOnClose = true,
    autoFocus = true,
    arrowSize,
    arrowShadowColor,
    trigger = TRIGGER.click,
    openDelay = 200,
    closeDelay = 200,
    isLazy,
    lazyBehavior = "unmount",
    computePositionOnMount
  } = props,
      popperProps = _objectWithoutPropertiesLoose(props, ["closeOnBlur", "closeOnEsc", "initialFocusRef", "id", "returnFocusOnClose", "autoFocus", "arrowSize", "arrowShadowColor", "trigger", "openDelay", "closeDelay", "isLazy", "lazyBehavior", "computePositionOnMount"]);

  var {
    isOpen,
    onClose,
    onOpen,
    onToggle
  } = useDisclosure(props);
  var triggerRef = useRef(null);
  var popoverRef = useRef(null);
  var isHoveringRef = useRef(false);
  var hasBeenOpened = useRef(false);

  if (isOpen) {
    hasBeenOpened.current = true;
  }

  var [hasHeader, setHasHeader] = useState(false);
  var [hasBody, setHasBody] = useState(false);
  var [triggerId, popoverId, headerId, bodyId] = useIds(id, "popover-trigger", "popover-content", "popover-header", "popover-body");
  var {
    referenceRef,
    getArrowProps,
    getPopperProps,
    getArrowInnerProps,
    forceUpdate
  } = usePopper(_extends({}, popperProps, {
    enabled: isOpen || !!computePositionOnMount
  }));
  useFocusOnPointerDown({
    enabled: isOpen,
    ref: triggerRef
  });
  useFocusOnHide(popoverRef, {
    focusRef: triggerRef,
    visible: isOpen,
    shouldFocus: returnFocusOnClose && trigger === TRIGGER.click
  });
  useFocusOnShow(popoverRef, {
    focusRef: initialFocusRef,
    visible: isOpen,
    shouldFocus: autoFocus && trigger === TRIGGER.click
  });
  var shouldRenderChildren = determineLazyBehavior({
    hasBeenSelected: hasBeenOpened.current,
    isLazy,
    lazyBehavior,
    isSelected: isOpen
  });
  var getPopoverProps = useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var popoverProps = _extends({}, props, {
      style: _extends({}, props.style, {
        transformOrigin: popperCSSVars.transformOrigin.varRef,
        [popperCSSVars.arrowSize.var]: arrowSize ? px(arrowSize) : undefined,
        [popperCSSVars.arrowShadowColor.var]: arrowShadowColor
      }),
      ref: mergeRefs(popoverRef, _ref),
      children: shouldRenderChildren ? props.children : null,
      id: popoverId,
      tabIndex: -1,
      role: "dialog",
      onKeyDown: callAllHandlers(props.onKeyDown, event => {
        if (closeOnEsc && event.key === "Escape") {
          onClose();
        }
      }),
      onBlur: callAllHandlers(props.onBlur, event => {
        var relatedTarget = getRelatedTarget(event);
        var targetIsPopover = contains(popoverRef.current, relatedTarget);
        var targetIsTrigger = contains(triggerRef.current, relatedTarget);
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
      popoverProps.onMouseEnter = callAllHandlers(props.onMouseEnter, () => {
        isHoveringRef.current = true;
      });
      popoverProps.onMouseLeave = callAllHandlers(props.onMouseLeave, () => {
        isHoveringRef.current = false;
        setTimeout(onClose, closeDelay);
      });
    }

    return popoverProps;
  }, [shouldRenderChildren, popoverId, hasHeader, headerId, hasBody, bodyId, trigger, closeOnEsc, onClose, isOpen, closeOnBlur, closeDelay, arrowShadowColor, arrowSize]);
  var getPopoverPositionerProps = useCallback(function (props, forwardedRef) {
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
  var openTimeout = useRef();
  var closeTimeout = useRef();
  var getTriggerProps = useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends({}, props, {
      ref: mergeRefs(triggerRef, _ref, referenceRef),
      id: triggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpen,
      "aria-controls": popoverId
    });

    if (trigger === TRIGGER.click) {
      triggerProps.onClick = callAllHandlers(props.onClick, onToggle);
    }

    if (trigger === TRIGGER.hover) {
      /**
       * Any content that shows on pointer hover should also show on keyboard focus.
       * Consider focus and blur to be the `hover` for keyboard users.
       *
       * @see https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
       */
      triggerProps.onFocus = callAllHandlers(props.onFocus, onOpen);
      triggerProps.onBlur = callAllHandlers(props.onBlur, onClose);
      /**
       * Any content that shows on hover or focus must be dismissible.
       * This case pressing `Escape` will dismiss the popover
       */

      triggerProps.onKeyDown = callAllHandlers(props.onKeyDown, event => {
        if (event.key === "Escape") {
          onClose();
        }
      });
      triggerProps.onMouseEnter = callAllHandlers(props.onMouseEnter, () => {
        isHoveringRef.current = true;
        openTimeout.current = window.setTimeout(onOpen, openDelay);
      });
      triggerProps.onMouseLeave = callAllHandlers(props.onMouseLeave, () => {
        isHoveringRef.current = false;

        if (openTimeout.current) {
          clearTimeout(openTimeout.current);
          openTimeout.current = undefined;
        }

        closeTimeout.current = window.setTimeout(() => {
          if (isHoveringRef.current === false) {
            onClose();
          }
        }, closeDelay);
      });
    }

    return triggerProps;
  }, [triggerId, isOpen, popoverId, trigger, referenceRef, onToggle, onOpen, onClose, openDelay, closeDelay]);
  useEffect(() => {
    return () => {
      if (openTimeout.current) {
        clearTimeout(openTimeout.current);
      }

      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);
  var getHeaderProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      id: headerId,
      ref: mergeRefs(ref, node => {
        setHasHeader(!!node);
      })
    });
  }, [headerId]);
  var getBodyProps = useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      id: bodyId,
      ref: mergeRefs(ref, node => {
        setHasBody(!!node);
      })
    });
  }, [bodyId]);
  return {
    forceUpdate,
    isOpen,
    onClose,
    getArrowProps,
    getArrowInnerProps,
    getPopoverPositionerProps,
    getPopoverProps,
    getTriggerProps,
    getHeaderProps,
    getBodyProps
  };
}
//# sourceMappingURL=use-popover.js.map