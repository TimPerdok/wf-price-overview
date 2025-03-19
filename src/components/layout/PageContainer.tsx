import { styled } from "styled-components";
import * as React from "react";

interface Props {
  children: React.ReactNode;
}

const Container = styled.div`
    min-width: 500px;
    width: 100%;
    max-width: 100vw;
    padding: 4rem 2rem;
  `;

export default function PageContainer({ children }: Props) {
  return <Container>{children}</Container>;
}
