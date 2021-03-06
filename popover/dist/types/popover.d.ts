import { CloseButtonProps } from "@chakra-ui/close-button";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { HTMLChakraProps, ThemingProps } from "@chakra-ui/system";
import * as React from "react";
import { usePopoverContext } from "./popover-context";
import { PopoverTransitionProps } from "./popover-transition";
import { UsePopoverProps } from "./use-popover";
export { usePopoverContext };
export interface PopoverProps extends UsePopoverProps, ThemingProps<"Popover"> {
    /**
     * The content of the popover. It is usually the `PopoverTrigger`,
     * and `PopoverContent`
     */
    children?: MaybeRenderProp<{
        isOpen: boolean;
        onClose: () => void;
        forceUpdate: (() => void) | undefined;
    }>;
}
/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
export declare const Popover: React.FC<PopoverProps>;
/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */
export declare const PopoverTrigger: React.FC;
export interface PopoverContentProps extends PopoverTransitionProps {
    rootProps?: HTMLChakraProps<"div">;
}
export declare const PopoverContent: import("@chakra-ui/system").ComponentWithAs<"section", PopoverContentProps>;
export interface PopoverHeaderProps extends HTMLChakraProps<"header"> {
}
/**
 * PopoverHeader is the accessible header or label
 * for the popover's content and it is first announced by screenreaders.
 */
export declare const PopoverHeader: import("@chakra-ui/system").ComponentWithAs<"header", PopoverHeaderProps>;
export interface PopoverBodyProps extends HTMLChakraProps<"div"> {
}
/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
export declare const PopoverBody: import("@chakra-ui/system").ComponentWithAs<"div", PopoverBodyProps>;
export interface PopoverFooterProps extends HTMLChakraProps<"footer"> {
}
export declare const PopoverFooter: React.FC<PopoverFooterProps>;
export declare type PopoverCloseButtonProps = CloseButtonProps;
export declare const PopoverCloseButton: React.FC<CloseButtonProps>;
export interface PopoverArrowProps extends HTMLChakraProps<"div"> {
}
export declare const PopoverArrow: React.FC<PopoverArrowProps>;
//# sourceMappingURL=popover.d.ts.map