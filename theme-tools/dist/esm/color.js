import { TinyColor, readability, isReadable, random } from "@ctrl/tinycolor";
import { memoizedGet as get, isEmptyObject } from "@chakra-ui/utils";
/**
 * Get the color raw value from theme
 * @param theme - the theme object
 * @param color - the color path ("green.200")
 * @param fallback - the fallback color
 */

export var getColor = (theme, color, fallback) => {
  var hex = get(theme, "colors." + color, color);
  var {
    isValid
  } = new TinyColor(hex);
  return isValid ? hex : fallback;
};
/**
 * Determines if the tone of given color is "light" or "dark"
 * @param color - the color in hex, rgb, or hsl
 */

export var tone = color => theme => {
  var hex = getColor(theme, color);
  var isDark = new TinyColor(hex).isDark();
  return isDark ? "dark" : "light";
};
/**
 * Determines if a color tone is "dark"
 * @param color - the color in hex, rgb, or hsl
 */

export var isDark = color => theme => tone(color)(theme) === "dark";
/**
 * Determines if a color tone is "light"
 * @param color - the color in hex, rgb, or hsl
 */

export var isLight = color => theme => tone(color)(theme) === "light";
/**
 * Make a color transparent
 * @param color - the color in hex, rgb, or hsl
 * @param opacity - the amount of opacity the color should have (0-1)
 */

export var transparentize = (color, opacity) => theme => {
  var raw = getColor(theme, color);
  return new TinyColor(raw).setAlpha(opacity).toRgbString();
};
/**
 * Add white to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount white to add (0-100)
 */

export var whiten = (color, amount) => theme => {
  var raw = getColor(theme, color);
  return new TinyColor(raw).mix("#fff", amount).toHexString();
};
/**
 * Add black to a color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount black to add (0-100)
 */

export var blacken = (color, amount) => theme => {
  var raw = getColor(theme, color);
  return new TinyColor(raw).mix("#000", amount).toHexString();
};
/**
 * Darken a specified color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount to darken (0-100)
 */

export var darken = (color, amount) => theme => {
  var raw = getColor(theme, color);
  return new TinyColor(raw).darken(amount).toHexString();
};
/**
 * Lighten a specified color
 * @param color - the color in hex, rgb, or hsl
 * @param amount - the amount to lighten (0-100)
 */

export var lighten = (color, amount) => theme => new TinyColor(getColor(theme, color)).lighten(amount).toHexString();
/**
 * Checks the contract ratio of between 2 colors,
 * based on the Web Content Accessibility Guidelines (Version 2.0).
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */

export var contrast = (fg, bg) => theme => readability(getColor(theme, bg), getColor(theme, fg));
/**
 * Checks if a color meets the Web Content Accessibility
 * Guidelines (Version 2.0) for constract ratio.
 *
 * @param fg - the foreground or text color
 * @param bg - the background color
 */

export var isAccessible = (textColor, bgColor, options) => theme => isReadable(getColor(theme, bgColor), getColor(theme, textColor), options);
export var complementary = color => theme => new TinyColor(getColor(theme, color)).complement().toHexString();
export function generateStripe(size, color) {
  if (size === void 0) {
    size = "1rem";
  }

  if (color === void 0) {
    color = "rgba(255, 255, 255, 0.15)";
  }

  return {
    backgroundImage: "linear-gradient(\n    45deg,\n    " + color + " 25%,\n    transparent 25%,\n    transparent 50%,\n    " + color + " 50%,\n    " + color + " 75%,\n    transparent 75%,\n    transparent\n  )",
    backgroundSize: size + " " + size
  };
}
export function randomColor(opts) {
  var fallback = random().toHexString();

  if (!opts || isEmptyObject(opts)) {
    return fallback;
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }

  return fallback;
}

function randomColorFromString(str) {
  var hash = 0;
  if (str.length === 0) return hash.toString();

  for (var i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  var color = "#";

  for (var j = 0; j < 3; j += 1) {
    var value = hash >> j * 8 & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }

  return color;
}

function randomColorFromList(str, list) {
  var index = 0;
  if (str.length === 0) return list[0];

  for (var i = 0; i < str.length; i += 1) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index = index & index;
  }

  index = (index % list.length + list.length) % list.length;
  return list[index];
}

function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}
//# sourceMappingURL=color.js.map