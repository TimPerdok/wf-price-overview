import { styled } from "styled-components";
import * as React from "react";

export type FlexProps = {
  $alignVertical?:
    | "top"
    | "center"
    | "bottom"
    | "space-between"
    | "space-around";
  $alignHorizontal?:
    | "start"
    | "center"
    | "end"
    | "space-between"
    | "space-around";
  children?: React.ReactNode;
  $fullWidth?: boolean;
  $gapX?: string;
  $gapY?: string;
};
const FlexRowStyled = styled.div<FlexProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.$alignHorizontal};
  align-items: ${(props) => props.$alignVertical};
  width: ${(props) => props.$fullWidth ? "100%" : "auto"};
  gap: ${(props) => props.$gapY ? props.$gapY : "0px"} ${(props) =>
  props.$gapX ? props.$gapX : "0px"};
`;

export function FlexRow(props: FlexProps) {
  return <FlexRowStyled {...props}></FlexRowStyled>;
}

const FlexColumnStyled = styled.div<FlexProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.$alignVertical};
  align-items: ${(props) => props.$alignHorizontal};
  width: ${(props) => props.$fullWidth ? "100%" : "auto"};
  gap: ${(props) => props.$gapY ? props.$gapY : "0px"} ${(props) => props.$gapX ? props.$gapX : "0px"};
`;

export function FlexColumn(props: FlexProps) {
  return <FlexColumnStyled {...props}></FlexColumnStyled>;
}
