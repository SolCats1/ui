"use strict";

exports.__esModule = true;
exports.AlertDialog = AlertDialog;
exports.AlertDialogOverlay = exports.AlertDialogHeader = exports.AlertDialogFooter = exports.AlertDialogCloseButton = exports.AlertDialogBody = exports.AlertDialogContent = void 0;

var _system = require("@chakra-ui/system");

var React = _interopRequireWildcard(require("react"));

var _modal = require("./modal");

exports.AlertDialogBody = _modal.ModalBody;
exports.AlertDialogCloseButton = _modal.ModalCloseButton;
exports.AlertDialogFooter = _modal.ModalFooter;
exports.AlertDialogHeader = _modal.ModalHeader;
exports.AlertDialogOverlay = _modal.ModalOverlay;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function AlertDialog(props) {
  var leastDestructiveRef = props.leastDestructiveRef,
      rest = _objectWithoutPropertiesLoose(props, ["leastDestructiveRef"]);

  return /*#__PURE__*/React.createElement(_modal.Modal, _extends({}, rest, {
    initialFocusRef: leastDestructiveRef
  }));
}

var AlertDialogContent = /*#__PURE__*/(0, _system.forwardRef)(function (props, ref) {
  return /*#__PURE__*/React.createElement(_modal.ModalContent, _extends({
    ref: ref,
    role: "alertdialog"
  }, props));
});
exports.AlertDialogContent = AlertDialogContent;
//# sourceMappingURL=alert-dialog.js.map