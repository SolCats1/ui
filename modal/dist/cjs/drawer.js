"use strict";

exports.__esModule = true;
exports.Drawer = Drawer;
exports.DrawerOverlay = exports.DrawerHeader = exports.DrawerFooter = exports.DrawerCloseButton = exports.DrawerBody = exports.DrawerContent = void 0;

var _reactUtils = require("@chakra-ui/react-utils");

var _system = require("@chakra-ui/system");

var _transition = require("@chakra-ui/transition");

var _utils = require("@chakra-ui/utils");

var React = _interopRequireWildcard(require("react"));

var _modal = require("./modal");

exports.DrawerBody = _modal.ModalBody;
exports.DrawerCloseButton = _modal.ModalCloseButton;
exports.DrawerFooter = _modal.ModalFooter;
exports.DrawerHeader = _modal.ModalHeader;
exports.DrawerOverlay = _modal.ModalOverlay;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _createContext = (0, _reactUtils.createContext)(),
    DrawerContextProvider = _createContext[0],
    useDrawerContext = _createContext[1];

var placementMap = {
  start: {
    ltr: "left",
    rtl: "right"
  },
  end: {
    ltr: "right",
    rtl: "left"
  }
};

function getDrawerPlacement(placement, dir) {
  var _placementMap$placeme, _placementMap$placeme2;

  if (!placement) return;
  return (_placementMap$placeme = (_placementMap$placeme2 = placementMap[placement]) == null ? void 0 : _placementMap$placeme2[dir]) != null ? _placementMap$placeme : placement;
}

function Drawer(props) {
  var _theme$components;

  var isOpen = props.isOpen,
      onClose = props.onClose,
      _props$placement = props.placement,
      placementProp = _props$placement === void 0 ? "right" : _props$placement,
      children = props.children,
      rest = _objectWithoutPropertiesLoose(props, ["isOpen", "onClose", "placement", "children"]);

  var theme = (0, _system.useTheme)();
  var drawerStyleConfig = (_theme$components = theme.components) == null ? void 0 : _theme$components.Drawer;
  var placement = getDrawerPlacement(placementProp, theme.direction);
  return /*#__PURE__*/React.createElement(DrawerContextProvider, {
    value: {
      placement: placement
    }
  }, /*#__PURE__*/React.createElement(_modal.Modal, _extends({
    isOpen: isOpen,
    onClose: onClose,
    styleConfig: drawerStyleConfig
  }, rest), children));
}

var StyledSlide = (0, _system.chakra)(_transition.Slide);

/**
 * ModalContent is used to group modal's content. It has all the
 * necessary `aria-*` properties to indicate that it is a modal
 */
var DrawerContent = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  var className = props.className,
      children = props.children,
      rest = _objectWithoutPropertiesLoose(props, ["className", "children"]);

  var _useModalContext = (0, _modal.useModalContext)(),
      getDialogProps = _useModalContext.getDialogProps,
      getDialogContainerProps = _useModalContext.getDialogContainerProps,
      isOpen = _useModalContext.isOpen;

  var dialogProps = getDialogProps(rest, ref);
  var containerProps = getDialogContainerProps();

  var _className = (0, _utils.cx)("chakra-modal__content", className);

  var styles = (0, _system.useStyles)();

  var dialogStyles = _extends({
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    outline: 0
  }, styles.dialog);

  var dialogContainerStyles = _extends({
    display: "flex",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0
  }, styles.dialogContainer);

  var _useDrawerContext = useDrawerContext(),
      placement = _useDrawerContext.placement;

  return /*#__PURE__*/React.createElement(_system.chakra.div, _extends({}, containerProps, {
    className: "chakra-modal__content-container",
    __css: dialogContainerStyles
  }), /*#__PURE__*/React.createElement(_modal.ModalFocusScope, null, /*#__PURE__*/React.createElement(StyledSlide, _extends({
    direction: placement,
    "in": isOpen,
    className: _className
  }, dialogProps, {
    __css: dialogStyles
  }), children)));
});
exports.DrawerContent = DrawerContent;

if (_utils.__DEV__) {
  DrawerContent.displayName = "DrawerContent";
}
//# sourceMappingURL=drawer.js.map