"use strict";

exports.__esModule = true;
exports.createStandaloneToast = createStandaloneToast;
exports.useToast = useToast;
exports["default"] = exports.defaultStandaloneParam = void 0;

var _alert = require("@chakra-ui/alert");

var _closeButton = require("@chakra-ui/close-button");

var _system = require("@chakra-ui/system");

var _theme = _interopRequireDefault(require("@chakra-ui/theme"));

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _toast = require("./toast.class");

var _toast2 = require("./toast.placement");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Toast = function Toast(props) {
  var status = props.status,
      variant = props.variant,
      id = props.id,
      title = props.title,
      isClosable = props.isClosable,
      onClose = props.onClose,
      description = props.description;
  var alertTitleId = typeof id !== "undefined" ? "toast-" + id + "-title" : undefined;
  return /*#__PURE__*/React.createElement(_alert.Alert, {
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
  }, /*#__PURE__*/React.createElement(_alert.AlertIcon, null), /*#__PURE__*/React.createElement(_system.chakra.div, {
    flex: "1",
    maxWidth: "100%"
  }, title && /*#__PURE__*/React.createElement(_alert.AlertTitle, {
    id: alertTitleId
  }, title), description && /*#__PURE__*/React.createElement(_alert.AlertDescription, {
    display: "block"
  }, description)), isClosable && /*#__PURE__*/React.createElement(_closeButton.CloseButton, {
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
var defaultStandaloneParam = {
  theme: _theme["default"],
  colorMode: "light",
  toggleColorMode: _utils.noop,
  setColorMode: _utils.noop,
  defaultOptions: defaults
};
/**
 * Create a toast from outside of React Components
 */

exports.defaultStandaloneParam = defaultStandaloneParam;

function createStandaloneToast(_temp) {
  var _ref = _temp === void 0 ? defaultStandaloneParam : _temp,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? defaultStandaloneParam.theme : _ref$theme,
      _ref$colorMode = _ref.colorMode,
      colorMode = _ref$colorMode === void 0 ? defaultStandaloneParam.colorMode : _ref$colorMode,
      _ref$toggleColorMode = _ref.toggleColorMode,
      toggleColorMode = _ref$toggleColorMode === void 0 ? defaultStandaloneParam.toggleColorMode : _ref$toggleColorMode,
      _ref$setColorMode = _ref.setColorMode,
      setColorMode = _ref$setColorMode === void 0 ? defaultStandaloneParam.setColorMode : _ref$setColorMode,
      _ref$defaultOptions = _ref.defaultOptions,
      defaultOptions = _ref$defaultOptions === void 0 ? defaultStandaloneParam.defaultOptions : _ref$defaultOptions;

  var renderWithProviders = function renderWithProviders(props, options) {
    return /*#__PURE__*/React.createElement(_system.ThemeProvider, {
      theme: theme
    }, /*#__PURE__*/React.createElement(_system.ColorModeContext.Provider, {
      value: {
        colorMode: colorMode,
        setColorMode: setColorMode,
        toggleColorMode: toggleColorMode
      }
    }, (0, _utils.isFunction)(options.render) ? options.render(props) : /*#__PURE__*/React.createElement(Toast, _extends({}, props, options))));
  };

  var toastImpl = function toastImpl(options) {
    var opts = _extends({}, defaultOptions, options);

    opts.position = (0, _toast2.getToastPlacement)(opts.position, theme.direction);

    var Message = function Message(props) {
      return renderWithProviders(props, opts);
    };

    return _toast.toast.notify(Message, opts);
  };

  toastImpl.close = _toast.toast.close;
  toastImpl.closeAll = _toast.toast.closeAll; // toasts can only be updated if they have a valid id

  toastImpl.update = function (id, options) {
    if (!id) return;

    var opts = _extends({}, defaultOptions, options);

    opts.position = (0, _toast2.getToastPlacement)(opts.position, theme.direction);

    _toast.toast.update(id, _extends({}, opts, {
      message: function message(props) {
        return renderWithProviders(props, opts);
      }
    }));
  };

  toastImpl.isActive = _toast.toast.isActive;
  return toastImpl;
}
/**
 * React hook used to create a function that can be used
 * to show toasts in an application.
 */


function useToast(options) {
  var _useChakra = (0, _system.useChakra)(),
      theme = _useChakra.theme,
      setColorMode = _useChakra.setColorMode,
      toggleColorMode = _useChakra.toggleColorMode,
      colorMode = _useChakra.colorMode;

  return React.useMemo(function () {
    return createStandaloneToast({
      theme: theme,
      colorMode: colorMode,
      setColorMode: setColorMode,
      toggleColorMode: toggleColorMode,
      defaultOptions: options
    });
  }, [theme, setColorMode, toggleColorMode, colorMode, options]);
}

var _default = useToast;
exports["default"] = _default;
//# sourceMappingURL=use-toast.js.map