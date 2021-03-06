import { mode } from "@chakra-ui/theme-tools";

var baseStyle = props => {
  return {
    bg: mode("gray.100", "whiteAlpha")(props),
    borderRadius: "md",
    borderWidth: "1px",
    borderBottomWidth: "3px",
    fontSize: "0.8em",
    fontWeight: "bold",
    lineHeight: "normal",
    px: "0.4em",
    whiteSpace: "nowrap"
  };
};

export default {
  baseStyle
};
//# sourceMappingURL=kbd.js.map