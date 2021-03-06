import { ResponsiveValue, SystemProps, HTMLChakraProps } from "@chakra-ui/system";
import { BoxProps } from "./box";
export interface GridProps extends HTMLChakraProps<"div">, GridOptions {
}
/**
 * React component used to create grid layouts.
 *
 * It renders a `div` with `display: grid` and
 * comes with helpful style shorthand.
 *
 * @see Docs https://chakra-ui.com/grid
 */
export declare const Grid: import("@chakra-ui/system").ComponentWithAs<"div", GridProps>;
export interface GridOptions {
    /**
     * Short hand prop for `gridTemplateColumns`
     * @type SystemProps["gridTemplateColumns"]
     */
    templateColumns?: SystemProps["gridTemplateColumns"];
    /**
     * Short hand prop for `gridGap`
     * @type SystemProps["gridGap"]
     */
    gap?: SystemProps["gridGap"];
    /**
     * Short hand prop for `gridRowGap`
     * @type SystemProps["gridRowGap"]
     */
    rowGap?: SystemProps["gridRowGap"];
    /**
     * Short hand prop for `gridColumnGap`
     * @type SystemProps["gridColumnGap"]
     */
    columnGap?: SystemProps["gridColumnGap"];
    /**
     * Short hand prop for `gridAutoFlow`
     * @type SystemProps["gridAutoFlow"]
     */
    autoFlow?: SystemProps["gridAutoFlow"];
    /**
     * Short hand prop for `gridAutoRows`
     * @type SystemProps["gridAutoRows"]
     */
    autoRows?: SystemProps["gridAutoRows"];
    /**
     * Short hand prop for `gridAutoColumns`
     * @type SystemProps["gridAutoColumns"]
     */
    autoColumns?: SystemProps["gridAutoColumns"];
    /**
     * Short hand prop for `gridTemplateRows`
     * @type SystemProps["gridTemplateRows"]
     */
    templateRows?: SystemProps["gridTemplateRows"];
    /**
     * Short hand prop for `gridTemplateAreas`
     * @type SystemProps["gridTemplateAreas"]
     */
    templateAreas?: SystemProps["gridTemplateAreas"];
    /**
     * Short hand prop for `gridArea`
     * @type SystemProps["gridArea"]
     */
    area?: SystemProps["gridArea"];
    /**
     * Short hand prop for `gridColumn`
     * @type SystemProps["gridColumn"]
     */
    column?: SystemProps["gridColumn"];
    /**
     * Short hand prop for `gridRow`
     * @type SystemProps["gridRow"]
     */
    row?: SystemProps["gridRow"];
}
export interface GridItemProps extends BoxProps {
    /**
     * The number of columns the grid item should `span`.
     * @type ResponsiveValue<number | "auto">
     */
    colSpan?: ResponsiveValue<number | "auto">;
    /**
     * The column number the grid item should start.
     * @type ResponsiveValue<number | "auto">
     */
    colStart?: ResponsiveValue<number | "auto">;
    /**
     * @type ResponsiveValue<number | "auto">
     */
    colEnd?: ResponsiveValue<number | "auto">;
    /**
     * @type ResponsiveValue<number | "auto">
     */
    rowStart?: ResponsiveValue<number | "auto">;
    /**
     * @type ResponsiveValue<number | "auto">
     */
    rowEnd?: ResponsiveValue<number | "auto">;
    /**
     * @type ResponsiveValue<number | "auto">
     */
    rowSpan?: ResponsiveValue<number | "auto">;
}
export declare const GridItem: import("@chakra-ui/system").ComponentWithAs<"div", GridItemProps>;
//# sourceMappingURL=grid.d.ts.map