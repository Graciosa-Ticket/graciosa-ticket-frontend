import React, { CSSProperties, ForwardedRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { FaAngleDown } from "react-icons/fa";
import { SelectItemProps, SelectProps } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItemContainer,
  SelectItemText,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "./styles";

interface SelectComponentProps extends SelectProps {
  triggerStyle: CSSProperties;
}

export const Select = React.forwardRef(
  (
    { children, triggerStyle, ...props }: SelectComponentProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <SelectRoot {...props}>
        <SelectTrigger ref={forwardedRef} style={triggerStyle}>
          <SelectValue />
          <SelectPrimitive.Icon>
            <FaAngleDown />
          </SelectPrimitive.Icon>
        </SelectTrigger>
        <SelectPrimitive.Portal>
          <SelectContent>
            <SelectViewport>{children}</SelectViewport>
          </SelectContent>
        </SelectPrimitive.Portal>
      </SelectRoot>
    );
  }
);

export const SelectItem = React.forwardRef(
  (
    { children, ...props }: SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <SelectItemContainer {...props} ref={forwardedRef}>
        <SelectItemText>{children}</SelectItemText>
      </SelectItemContainer>
    );
  }
);
