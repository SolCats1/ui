"use strict";

exports.__esModule = true;
exports.usePanGesture = usePanGesture;

var _utils = require("@chakra-ui/utils");

var _react = require("react");

var _usePointerEvent = require("./use-pointer-event");

var _useUnmountEffect = require("./use-unmount-effect");

function usePanGesture(ref, props) {
  var onPan = props.onPan,
      onPanStart = props.onPanStart,
      onPanEnd = props.onPanEnd,
      onPanSessionStart = props.onPanSessionStart,
      onPanSessionEnd = props.onPanSessionEnd,
      threshold = props.threshold;
  var hasPanEvents = Boolean(onPan || onPanStart || onPanEnd || onPanSessionStart || onPanSessionEnd);
  var panSession = (0, _react.useRef)(null);
  var handlers = {
    onSessionStart: onPanSessionStart,
    onSessionEnd: onPanSessionEnd,
    onStart: onPanStart,
    onMove: onPan,
    onEnd: function onEnd(event, info) {
      panSession.current = null;
      onPanEnd == null ? void 0 : onPanEnd(event, info);
    }
  };
  (0, _react.useEffect)(function () {
    var _panSession$current;

    (_panSession$current = panSession.current) == null ? void 0 : _panSession$current.updateHandlers(handlers);
  });

  function onPointerDown(event) {
    panSession.current = new _utils.PanSession(event, handlers, threshold);
  }

  (0, _usePointerEvent.usePointerEvent)(function () {
    return ref.current;
  }, "pointerdown", hasPanEvents ? onPointerDown : _utils.noop);
  (0, _useUnmountEffect.useUnmountEffect)(function () {
    var _panSession$current2;

    (_panSession$current2 = panSession.current) == null ? void 0 : _panSession$current2.end();
    panSession.current = null;
  });
}
//# sourceMappingURL=use-pan-gesture.js.map