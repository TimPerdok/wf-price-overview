import { styled } from "styled-components";
import * as React from "react";
import { FlexColumn, FlexRow } from "./Flex.tsx";

interface FullScreenProps {
  children: React.ReactNode;
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  `;

export default function FullScreen({ children }: FullScreenProps) {
  return (
    <Container>
      <FlexColumn alignHorizontal="center">
        {children}
      </FlexColumn>
    </Container>
  );
}
