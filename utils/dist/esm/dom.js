export function isElement(el) {
  return el != null && typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE;
}
export function isHTMLElement(el) {
  var _el$ownerDocument$def;

  if (!isElement(el)) {
    return false;
  }

  var win = (_el$ownerDocument$def = el.ownerDocument.defaultView) != null ? _el$ownerDocument$def : window;
  return el instanceof win.HTMLElement;
}
export function getOwnerWindow(node) {
  var _getOwnerDocument$def, _getOwnerDocument;

  return isElement(node) ? (_getOwnerDocument$def = (_getOwnerDocument = getOwnerDocument(node)) == null ? void 0 : _getOwnerDocument.defaultView) != null ? _getOwnerDocument$def : window : window;
}
export function getOwnerDocument(node) {
  var _node$ownerDocument;

  return isElement(node) ? (_node$ownerDocument = node.ownerDocument) != null ? _node$ownerDocument : document : document;
}
export function getEventWindow(event) {
  var _view;

  return (_view = event.view) != null ? _view : window;
}
export function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
export var isBrowser = canUseDOM();
export var dataAttr = condition => condition ? "" : undefined;
export var ariaAttr = condition => condition ? true : undefined;
export var cx = function cx() {
  for (var _len = arguments.length, classNames = new Array(_len), _key = 0; _key < _len; _key++) {
    classNames[_key] = arguments[_key];
  }

  return classNames.filter(Boolean).join(" ");
};
export function getActiveElement(node) {
  var doc = getOwnerDocument(node);
  return doc == null ? void 0 : doc.activeElement;
}
export function contains(parent, child) {
  if (!parent) return false;
  return parent === child || parent.contains(child);
}
export function addDomEvent(target, eventName, handler, options) {
  target.addEventListener(eventName, handler, options);
  return () => {
    target.removeEventListener(eventName, handler, options);
  };
}
/**
 * Get the normalized event key across all browsers
 * @param event keyboard event
 */

export function normalizeEventKey(event) {
  var {
    key,
    keyCode
  } = event;
  var isArrowKey = keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0;
  var eventKey = isArrowKey ? "Arrow" + key : key;
  return eventKey;
}
export function getRelatedTarget(event) {
  var _event$target, _event$relatedTarget;

  var target = (_event$target = event.target) != null ? _event$target : event.currentTarget;
  var activeElement = getActiveElement(target);
  return (_event$relatedTarget = event.relatedTarget) != null ? _event$relatedTarget : activeElement;
}
export function isRightClick(event) {
  return event.button !== 0;
}
//# sourceMappingURL=dom.js.map