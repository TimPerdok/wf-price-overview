import { styled } from "styled-components";
import * as React from "react";

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
    width: 100%;
    max-width: 100vw;
    padding: 2rem;
  `;

export default function PageContainer({ children }: Props) {
  return <Container>{children}</Container>;
}
