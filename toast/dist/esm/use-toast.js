function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import { chakra, ColorModeContext, ThemeProvider, useChakra } from "@chakra-ui/system";
import defaultTheme from "@chakra-ui/theme";
import { isFunction, noop } from "@chakra-ui/utils";
import * as React from "react";
import { toast } from "./toast.class";
import { getToastPlacement } from "./toast.placement";

var Toast = props => {
  var {
    status,
    variant,
    id,
    title,
    isClosable,
    onClose,
    description
  } = props;
  var alertTitleId = typeof id !== "undefined" ? "toast-" + id + "-title" : undefined;
  return /*#__PURE__*/React.createElement(Alert, {
    status: status,
    variant: variant,
    id: id,
    alignItems: "start",
    borderRadius: "md",
    boxShadow: "lg",
    paddingEnd: 8,
    textAlign: "start",
    width: "auto",
    "aria-labelledby": alertTitleId
  }, /*#__PURE__*/React.createElement(AlertIcon, null), /*#__PURE__*/React.createElement(chakra.div, {
    flex: "1",
    maxWidth: "100%"
  }, title && /*#__PURE__*/React.createElement(AlertTitle, {
    id: alertTitleId
  }, title), description && /*#__PURE__*/React.createElement(AlertDescription, {
    display: "block"
  }, description)), isClosable && /*#__PURE__*/React.createElement(CloseButton, {
    size: "sm",
    onClick: onClose,
    position: "absolute",
    insetEnd: 1,
    top: 1
  }));
};

var defaults = {
  duration: 5000,
  position: "bottom",
  variant: "solid"
};
export var defaultStandaloneParam = {
  theme: defaultTheme,
  colorMode: "light",
  toggleColorMode: noop,
  setColorMode: noop,
  defaultOptions: defaults
};
/**
 * Create a toast from outside of React Components
 */

export function createStandaloneToast(_temp) {
  var {
    theme = defaultStandaloneParam.theme,
    colorMode = defaultStandaloneParam.colorMode,
    toggleColorMode = defaultStandaloneParam.toggleColorMode,
    setColorMode = defaultStandaloneParam.setColorMode,
    defaultOptions = defaultStandaloneParam.defaultOptions
  } = _temp === void 0 ? defaultStandaloneParam : _temp;

  var renderWithProviders = (props, options) => /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(ColorModeContext.Provider, {
    value: {
      colorMode,
      setColorMode,
      toggleColorMode
    }
  }, isFunction(options.render) ? options.render(props) : /*#__PURE__*/React.createElement(Toast, _extends({}, props, options))));

  var toastImpl = options => {
    var opts = _extends({}, defaultOptions, options);

    opts.position = getToastPlacement(opts.position, theme.direction);

    var Message = props => renderWithProviders(props, opts);

    return toast.notify(Message, opts);
  };

  toastImpl.close = toast.close;
  toastImpl.closeAll = toast.closeAll; // toasts can only be updated if they have a valid id

  toastImpl.update = (id, options) => {
    if (!id) return;

    var opts = _extends({}, defaultOptions, options);

    opts.position = getToastPlacement(opts.position, theme.direction);
    toast.update(id, _extends({}, opts, {
      message: props => renderWithProviders(props, opts)
    }));
  };

  toastImpl.isActive = toast.isActive;
  return toastImpl;
}
/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */

export function useToast(options) {
  var {
    theme,
    setColorMode,
    toggleColorMode,
    colorMode
  } = useChakra();
  return React.useMemo(() => {
    return createStandaloneToast({
      theme,
      colorMode,
      setColorMode,
      toggleColorMode,
      defaultOptions: options
    });
  }, [theme, setColorMode, toggleColorMode, colorMode, options]);
}
export default useToast;
//# sourceMappingURL=use-toast.js.map