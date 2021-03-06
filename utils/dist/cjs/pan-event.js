"use strict";

exports.__esModule = true;
exports.PanSession = void 0;

var _framesync = _interopRequireWildcard(require("framesync"));

var _dom = require("./dom");

var _function = require("./function");

var _pointerEvent = require("./pointer-event");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @internal
 *
 * A Pan Session is recognized when the pointer is down
 * and moved in the allowed direction.
 */
var PanSession = /*#__PURE__*/function () {
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
  function PanSession(_event, handlers, threshold) {
    var _this = this;

    _defineProperty(this, "history", []);

    _defineProperty(this, "startEvent", null);

    _defineProperty(this, "lastEvent", null);

    _defineProperty(this, "lastEventInfo", null);

    _defineProperty(this, "handlers", {});

    _defineProperty(this, "removeListeners", _function.noop);

    _defineProperty(this, "threshold", 3);

    _defineProperty(this, "win", void 0);

    _defineProperty(this, "updatePoint", function () {
      if (!(_this.lastEvent && _this.lastEventInfo)) return;
      var info = getPanInfo(_this.lastEventInfo, _this.history);
      var isPanStarted = _this.startEvent !== null;

      var isDistancePastThreshold = (0, _function.distance)(info.offset, {
        x: 0,
        y: 0
      }) >= _this.threshold;

      if (!isPanStarted && !isDistancePastThreshold) return;

      var _getFrameData = (0, _framesync.getFrameData)(),
          timestamp = _getFrameData.timestamp;

      _this.history.push(_extends({}, info.point, {
        timestamp: timestamp
      }));

      var _this$handlers = _this.handlers,
          onStart = _this$handlers.onStart,
          onMove = _this$handlers.onMove;

      if (!isPanStarted) {
        onStart == null ? void 0 : onStart(_this.lastEvent, info);
        _this.startEvent = _this.lastEvent;
      }

      onMove == null ? void 0 : onMove(_this.lastEvent, info);
    });

    _defineProperty(this, "onPointerMove", function (event, info) {
      _this.lastEvent = event;
      _this.lastEventInfo = info; // Because Safari doesn't trigger mouseup events when it's above a `<select>`

      if ((0, _pointerEvent.isMouseEvent)(event) && event.buttons === 0) {
        _this.onPointerUp(event, info);

        return;
      } // Throttle mouse move event to once per frame


      _framesync["default"].update(_this.updatePoint, true);
    });

    _defineProperty(this, "onPointerUp", function (event, info) {
      // notify pan session ended
      var panInfo = getPanInfo(info, _this.history);
      var _this$handlers2 = _this.handlers,
          onEnd = _this$handlers2.onEnd,
          onSessionEnd = _this$handlers2.onSessionEnd;
      onSessionEnd == null ? void 0 : onSessionEnd(event, panInfo);

      _this.end(); // if panning never started, no need to call `onEnd`
      // panning requires a pointermove of at least 3px


      if (!onEnd || !_this.startEvent) return;
      onEnd == null ? void 0 : onEnd(event, panInfo);
    });

    this.win = (0, _dom.getEventWindow)(_event); // If we have more than one touch, don't start detecting this gesture

    if ((0, _pointerEvent.isMultiTouchEvent)(_event)) return;
    this.handlers = handlers;

    if (threshold) {
      this.threshold = threshold;
    } // stop default browser behavior


    _event.stopPropagation();

    _event.preventDefault(); // get and save the `pointerdown` event info in history
    // we'll use it to compute the `offset`


    var _info = (0, _pointerEvent.extractEventInfo)(_event);

    var _getFrameData2 = (0, _framesync.getFrameData)(),
        _timestamp = _getFrameData2.timestamp;

    this.history = [_extends({}, _info.point, {
      timestamp: _timestamp
    })]; // notify pan session start

    var onSessionStart = handlers.onSessionStart;
    onSessionStart == null ? void 0 : onSessionStart(_event, getPanInfo(_info, this.history)); // attach event listeners and return a single function to remove them all

    this.removeListeners = (0, _function.pipe)((0, _pointerEvent.addPointerEvent)(this.win, "pointermove", this.onPointerMove), (0, _pointerEvent.addPointerEvent)(this.win, "pointerup", this.onPointerUp), (0, _pointerEvent.addPointerEvent)(this.win, "pointercancel", this.onPointerUp));
  }

  var _proto = PanSession.prototype;

  _proto.updateHandlers = function updateHandlers(handlers) {
    this.handlers = handlers;
  };

  _proto.end = function end() {
    var _this$removeListeners;

    (_this$removeListeners = this.removeListeners) == null ? void 0 : _this$removeListeners.call(this);

    _framesync.cancelSync.update(this.updatePoint);
  };

  return PanSession;
}();

exports.PanSession = PanSession;

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

var toMilliseconds = function toMilliseconds(seconds) {
  return seconds * 1000;
};

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