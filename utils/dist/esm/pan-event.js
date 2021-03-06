function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is a modified version of `PanSession` from `framer-motion`.
 *
 * Credit goes to `framer-motion` of this useful utilities.
 * License can be found here: https://github.com/framer/motion
 */
import sync, { cancelSync, getFrameData } from "framesync";
import { getEventWindow } from "./dom";
import { distance, noop, pipe } from "./function";
import { addPointerEvent, extractEventInfo, isMouseEvent, isMultiTouchEvent } from "./pointer-event";
/**
 * The event information passed to pan event handlers like `onPan`, `onPanStart`.
 *
 * It contains information about the current state of the tap gesture such as its
 * `point`, `delta`, and `offset`
 */

/**
 * @internal
 *
 * A Pan Session is recognized when the pointer is down
 * and moved in the allowed direction.
 */
export class PanSession {
  /**
   * We use this to keep track of the `x` and `y` pan session history
   * as the pan event happens. It helps to calculate the `offset` and `delta`
   */
  // The pointer event that started the pan session
  // The current pointer event for the pan session
  // The current pointer event info for the pan session

  /**
   * Minimal pan distance required before recognizing the pan.
   * @default "3px"
   */
  constructor(_event, handlers, threshold) {
    _defineProperty(this, "history", []);

    _defineProperty(this, "startEvent", null);

    _defineProperty(this, "lastEvent", null);

    _defineProperty(this, "lastEventInfo", null);

    _defineProperty(this, "handlers", {});

    _defineProperty(this, "removeListeners", noop);

    _defineProperty(this, "threshold", 3);

    _defineProperty(this, "win", void 0);

    _defineProperty(this, "updatePoint", () => {
      if (!(this.lastEvent && this.lastEventInfo)) return;
      var info = getPanInfo(this.lastEventInfo, this.history);
      var isPanStarted = this.startEvent !== null;
      var isDistancePastThreshold = distance(info.offset, {
        x: 0,
        y: 0
      }) >= this.threshold;
      if (!isPanStarted && !isDistancePastThreshold) return;
      var {
        timestamp
      } = getFrameData();
      this.history.push(_extends({}, info.point, {
        timestamp
      }));
      var {
        onStart,
        onMove
      } = this.handlers;

      if (!isPanStarted) {
        onStart == null ? void 0 : onStart(this.lastEvent, info);
        this.startEvent = this.lastEvent;
      }

      onMove == null ? void 0 : onMove(this.lastEvent, info);
    });

    _defineProperty(this, "onPointerMove", (event, info) => {
      this.lastEvent = event;
      this.lastEventInfo = info; // Because Safari doesn't trigger mouseup events when it's above a `<select>`

      if (isMouseEvent(event) && event.buttons === 0) {
        this.onPointerUp(event, info);
        return;
      } // Throttle mouse move event to once per frame


      sync.update(this.updatePoint, true);
    });

    _defineProperty(this, "onPointerUp", (event, info) => {
      // notify pan session ended
      var panInfo = getPanInfo(info, this.history);
      var {
        onEnd,
        onSessionEnd
      } = this.handlers;
      onSessionEnd == null ? void 0 : onSessionEnd(event, panInfo);
      this.end(); // if panning never started, no need to call `onEnd`
      // panning requires a pointermove of at least 3px

      if (!onEnd || !this.startEvent) return;
      onEnd == null ? void 0 : onEnd(event, panInfo);
    });

    this.win = getEventWindow(_event); // If we have more than one touch, don't start detecting this gesture

    if (isMultiTouchEvent(_event)) return;
    this.handlers = handlers;

    if (threshold) {
      this.threshold = threshold;
    } // stop default browser behavior


    _event.stopPropagation();

    _event.preventDefault(); // get and save the `pointerdown` event info in history
    // we'll use it to compute the `offset`


    var _info = extractEventInfo(_event);

    var {
      timestamp: _timestamp
    } = getFrameData();
    this.history = [_extends({}, _info.point, {
      timestamp: _timestamp
    })]; // notify pan session start

    var {
      onSessionStart
    } = handlers;
    onSessionStart == null ? void 0 : onSessionStart(_event, getPanInfo(_info, this.history)); // attach event listeners and return a single function to remove them all

    this.removeListeners = pipe(addPointerEvent(this.win, "pointermove", this.onPointerMove), addPointerEvent(this.win, "pointerup", this.onPointerUp), addPointerEvent(this.win, "pointercancel", this.onPointerUp));
  }

  updateHandlers(handlers) {
    this.handlers = handlers;
  }

  end() {
    var _this$removeListeners;

    (_this$removeListeners = this.removeListeners) == null ? void 0 : _this$removeListeners.call(this);
    cancelSync.update(this.updatePoint);
  }

}

function subtractPoint(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}

function startPanPoint(history) {
  return history[0];
}

function lastPanPoint(history) {
  return history[history.length - 1];
}

function getPanInfo(info, history) {
  return {
    point: info.point,
    delta: subtractPoint(info.point, lastPanPoint(history)),
    offset: subtractPoint(info.point, startPanPoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}

function lastDevicePoint(history) {
  return history[history.length - 1];
}

var toMilliseconds = seconds => seconds * 1000;

function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return {
      x: 0,
      y: 0
    };
  }

  var i = history.length - 1;
  var timestampedPoint = null;
  var lastPoint = lastDevicePoint(history);

  while (i >= 0) {
    timestampedPoint = history[i];

    if (lastPoint.timestamp - timestampedPoint.timestamp > toMilliseconds(timeDelta)) {
      break;
    }

    i--;
  }

  if (!timestampedPoint) {
    return {
      x: 0,
      y: 0
    };
  }

  var time = (lastPoint.timestamp - timestampedPoint.timestamp) / 1000;

  if (time === 0) {
    return {
      x: 0,
      y: 0
    };
  }

  var currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };

  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }

  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }

  return currentVelocity;
}
//# sourceMappingURL=pan-event.js.map