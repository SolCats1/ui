function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { useDisclosure, useEventListener, useId } from "@chakra-ui/hooks";
import { popperCSSVars, usePopper } from "@chakra-ui/popper";
import { mergeRefs } from "@chakra-ui/react-utils";
import { callAllHandlers, px } from "@chakra-ui/utils";
import * as React from "react";
export function useTooltip(props) {
  if (props === void 0) {
    props = {};
  }

  var {
    openDelay = 0,
    closeDelay = 0,
    closeOnClick = true,
    closeOnMouseDown,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    placement,
    id,
    isOpen: isOpenProp,
    defaultIsOpen,
    arrowSize = 10,
    arrowShadowColor,
    arrowPadding,
    modifiers,
    isDisabled,
    gutter,
    offset,
    direction
  } = props,
      htmlProps = _objectWithoutPropertiesLoose(props, ["openDelay", "closeDelay", "closeOnClick", "closeOnMouseDown", "onOpen", "onClose", "placement", "id", "isOpen", "defaultIsOpen", "arrowSize", "arrowShadowColor", "arrowPadding", "modifiers", "isDisabled", "gutter", "offset", "direction"]);

  var {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp
  });
  var {
    referenceRef,
    getPopperProps,
    getArrowInnerProps,
    getArrowProps
  } = usePopper({
    enabled: isOpen,
    placement,
    arrowPadding,
    modifiers,
    gutter,
    offset,
    direction
  });
  var tooltipId = useId(id, "tooltip");
  var ref = React.useRef(null);
  var enterTimeout = React.useRef();
  var exitTimeout = React.useRef();
  var openWithDelay = React.useCallback(() => {
    if (!isDisabled) {
      enterTimeout.current = window.setTimeout(onOpen, openDelay);
    }
  }, [isDisabled, onOpen, openDelay]);
  var closeWithDelay = React.useCallback(() => {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }

    exitTimeout.current = window.setTimeout(onClose, closeDelay);
  }, [closeDelay, onClose]);
  var onClick = React.useCallback(() => {
    if (closeOnClick) {
      closeWithDelay();
    }
  }, [closeOnClick, closeWithDelay]);
  var onMouseDown = React.useCallback(() => {
    if (closeOnMouseDown) {
      closeWithDelay();
    }
  }, [closeOnMouseDown, closeWithDelay]);

  var onKeyDown = event => {
    if (isOpen && event.key === "Escape") {
      closeWithDelay();
    }
  };

  useEventListener("keydown", onKeyDown);
  React.useEffect(() => () => {
    clearTimeout(enterTimeout.current);
    clearTimeout(exitTimeout.current);
  }, []);
  /**
   * This allows for catching mouseleave events when the tooltip
   * trigger is disabled. There's currently a known issue in
   * React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */

  useEventListener("mouseleave", closeWithDelay, () => ref.current);
  var getTriggerProps = React.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends({}, props, {
      ref: mergeRefs(ref, _ref, referenceRef),
      onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
      onClick: callAllHandlers(props.onClick, onClick),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props.onFocus, openWithDelay),
      onBlur: callAllHandlers(props.onBlur, closeWithDelay),
      "aria-describedby": isOpen ? tooltipId : undefined
    });

    return triggerProps;
  }, [openWithDelay, closeWithDelay, onMouseDown, isOpen, tooltipId, onClick, referenceRef]);
  var getTooltipPositionerProps = React.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return getPopperProps(_extends({}, props, {
      style: _extends({}, props.style, {
        [popperCSSVars.arrowSize.var]: arrowSize ? px(arrowSize) : undefined,
        [popperCSSVars.arrowShadowColor.var]: arrowShadowColor
      })
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
        transformOrigin: popperCSSVars.transformOrigin.varRef
      })
    });

    return tooltipProps;
  }, [htmlProps, tooltipId]);
  return {
    isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps,
    getTooltipProps,
    getTooltipPositionerProps,
    getArrowProps,
    getArrowInnerProps
  };
}
//# sourceMappingURL=use-tooltip.js.map