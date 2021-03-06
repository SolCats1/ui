"use strict";

exports.__esModule = true;
exports.slideTransition = slideTransition;
exports.withDelay = exports.TransitionDefaults = exports.TransitionVariants = exports.TransitionEasings = void 0;

var _utils = require("@chakra-ui/utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var TransitionEasings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1]
};
exports.TransitionEasings = TransitionEasings;
var TransitionVariants = {
  scale: {
    enter: {
      scale: 1
    },
    exit: {
      scale: 0.95
    }
  },
  fade: {
    enter: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  },
  pushLeft: {
    enter: {
      x: "100%"
    },
    exit: {
      x: "-30%"
    }
  },
  pushRight: {
    enter: {
      x: "-100%"
    },
    exit: {
      x: "30%"
    }
  },
  pushUp: {
    enter: {
      y: "100%"
    },
    exit: {
      y: "-30%"
    }
  },
  pushDown: {
    enter: {
      y: "-100%"
    },
    exit: {
      y: "30%"
    }
  },
  slideLeft: {
    position: {
      left: 0,
      top: 0,
      bottom: 0,
      width: "100%"
    },
    enter: {
      x: 0,
      y: 0
    },
    exit: {
      x: "-100%",
      y: 0
    }
  },
  slideRight: {
    position: {
      right: 0,
      top: 0,
      bottom: 0,
      width: "100%"
    },
    enter: {
      x: 0,
      y: 0
    },
    exit: {
      x: "100%",
      y: 0
    }
  },
  slideUp: {
    position: {
      top: 0,
      left: 0,
      right: 0,
      maxWidth: "100vw"
    },
    enter: {
      x: 0,
      y: 0
    },
    exit: {
      x: 0,
      y: "-100%"
    }
  },
  slideDown: {
    position: {
      bottom: 0,
      left: 0,
      right: 0,
      maxWidth: "100vw"
    },
    enter: {
      x: 0,
      y: 0
    },
    exit: {
      x: 0,
      y: "100%"
    }
  }
};
exports.TransitionVariants = TransitionVariants;

function slideTransition(options) {
  var _options$direction;

  var side = (_options$direction = options == null ? void 0 : options.direction) != null ? _options$direction : "right";

  switch (side) {
    case "right":
      return TransitionVariants.slideRight;

    case "left":
      return TransitionVariants.slideLeft;

    case "bottom":
      return TransitionVariants.slideDown;

    case "top":
      return TransitionVariants.slideUp;

    default:
      return TransitionVariants.slideRight;
  }
}

var TransitionDefaults = {
  enter: {
    duration: 0.2,
    ease: TransitionEasings.easeOut
  },
  exit: {
    duration: 0.1,
    ease: TransitionEasings.easeIn
  }
};
exports.TransitionDefaults = TransitionDefaults;
var withDelay = {
  enter: function enter(transition, delay) {
    return _extends({}, transition, {
      delay: (0, _utils.isNumber)(delay) ? delay : delay == null ? void 0 : delay["enter"]
    });
  },
  exit: function exit(transition, delay) {
    return _extends({}, transition, {
      delay: (0, _utils.isNumber)(delay) ? delay : delay == null ? void 0 : delay["exit"]
    });
  }
};
exports.withDelay = withDelay;
//# sourceMappingURL=transition-utils.js.map