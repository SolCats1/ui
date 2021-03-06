"use strict";

exports.__esModule = true;
exports.innerArrow = exports.positionArrow = exports.transformOrigin = exports.matchWidth = void 0;

var _utils = require("./utils");

/* -------------------------------------------------------------------------------------------------
 The match width modifier sets the popper width to match the reference.
 It us useful for custom selects, autocomplete, etc.
* -----------------------------------------------------------------------------------------------*/
var matchWidth = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: function fn(_ref) {
    var state = _ref.state;
    state.styles.popper.width = state.rects.reference.width + "px";
  },
  effect: function effect(_ref2) {
    var state = _ref2.state;
    return function () {
      var reference = state.elements.reference;
      state.elements.popper.style.width = reference.offsetWidth + "px";
    };
  }
};
/* -------------------------------------------------------------------------------------------------
  The transform origin modifier sets the css `transformOrigin` value of the popper
  based on the dynamic placement state of the popper.
  
  Useful when we need to animate/transition the popper.
* -----------------------------------------------------------------------------------------------*/

exports.matchWidth = matchWidth;
var transformOrigin = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: function fn(_ref3) {
    var state = _ref3.state;
    setTransformOrigin(state);
  },
  effect: function effect(_ref4) {
    var state = _ref4.state;
    return function () {
      setTransformOrigin(state);
    };
  }
};
exports.transformOrigin = transformOrigin;

var setTransformOrigin = function setTransformOrigin(state) {
  state.elements.popper.style.setProperty(_utils.cssVars.transformOrigin["var"], (0, _utils.toTransformOrigin)(state.placement));
};
/* -------------------------------------------------------------------------------------------------
  The position arrow modifier adds width, height and overrides the `top/left/right/bottom`
  styles generated by popper.js to properly position the arrow
* -----------------------------------------------------------------------------------------------*/


var positionArrow = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: function fn(_ref5) {
    var state = _ref5.state;
    setArrowStyles(state);
  }
};
exports.positionArrow = positionArrow;

var setArrowStyles = function setArrowStyles(state) {
  var _state$elements;

  if (!state.placement) return;
  var overrides = getArrowStyle(state.placement);

  if ((_state$elements = state.elements) != null && _state$elements.arrow && overrides) {
    var _Object$assign, _vars;

    Object.assign(state.elements.arrow.style, (_Object$assign = {}, _Object$assign[overrides.property] = overrides.value, _Object$assign.width = _utils.cssVars.arrowSize.varRef, _Object$assign.height = _utils.cssVars.arrowSize.varRef, _Object$assign.zIndex = -1, _Object$assign));
    var vars = (_vars = {}, _vars[_utils.cssVars.arrowSizeHalf["var"]] = "calc(" + _utils.cssVars.arrowSize.varRef + " / 2)", _vars[_utils.cssVars.arrowOffset["var"]] = "calc(" + _utils.cssVars.arrowSizeHalf.varRef + " * -1)", _vars);

    for (var property in vars) {
      state.elements.arrow.style.setProperty(property, vars[property]);
    }
  }
};

var getArrowStyle = function getArrowStyle(placement) {
  if (placement.startsWith("top")) {
    return {
      property: "bottom",
      value: _utils.cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("bottom")) {
    return {
      property: "top",
      value: _utils.cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("left")) {
    return {
      property: "right",
      value: _utils.cssVars.arrowOffset.varRef
    };
  }

  if (placement.startsWith("right")) {
    return {
      property: "left",
      value: _utils.cssVars.arrowOffset.varRef
    };
  }
};
/* -------------------------------------------------------------------------------------------------
  The inner arrow modifier, sets the placement styles for the inner arrow that forms
  the popper arrow tip.
* -----------------------------------------------------------------------------------------------*/


var innerArrow = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: function fn(_ref6) {
    var state = _ref6.state;
    setInnerArrowStyles(state);
  },
  effect: function effect(_ref7) {
    var state = _ref7.state;
    return function () {
      setInnerArrowStyles(state);
    };
  }
};
exports.innerArrow = innerArrow;

var setInnerArrowStyles = function setInnerArrowStyles(state) {
  if (!state.elements.arrow) return;
  var inner = state.elements.arrow.querySelector("[data-popper-arrow-inner]");
  if (!inner) return;
  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: _utils.cssVars.arrowBg.varRef,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: (0, _utils.getBoxShadow)(state.placement)
  });
};
//# sourceMappingURL=modifiers.js.map