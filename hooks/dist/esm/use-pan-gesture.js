import { noop, PanSession } from "@chakra-ui/utils";
import { useEffect, useRef } from "react";
import { usePointerEvent } from "./use-pointer-event";
import { useUnmountEffect } from "./use-unmount-effect";
export function usePanGesture(ref, props) {
  var {
    onPan,
    onPanStart,
    onPanEnd,
    onPanSessionStart,
    onPanSessionEnd,
    threshold
  } = props;
  var hasPanEvents = Boolean(onPan || onPanStart || onPanEnd || onPanSessionStart || onPanSessionEnd);
  var panSession = useRef(null);
  var handlers = {
    onSessionStart: onPanSessionStart,
    onSessionEnd: onPanSessionEnd,
    onStart: onPanStart,
    onMove: onPan,

    onEnd(event, info) {
      panSession.current = null;
      onPanEnd == null ? void 0 : onPanEnd(event, info);
    }

  };
  useEffect(() => {
    var _panSession$current;

    (_panSession$current = panSession.current) == null ? void 0 : _panSession$current.updateHandlers(handlers);
  });

  function onPointerDown(event) {
    panSession.current = new PanSession(event, handlers, threshold);
  }

  usePointerEvent(() => ref.current, "pointerdown", hasPanEvents ? onPointerDown : noop);
  useUnmountEffect(() => {
    var _panSession$current2;

    (_panSession$current2 = panSession.current) == null ? void 0 : _panSession$current2.end();
    panSession.current = null;
  });
}
//# sourceMappingURL=use-pan-gesture.js.map