import { Link } from "@mui/material";
import React from "react";
import useNavigator from "../hooks/useNavigator";
import styled from "styled-components";

const StyledLink = styled(Link)`
    cursor: pointer;
`

export default function InternalLink({ children, to }: { children: React.ReactNode, to: string }) {
    const { navigateTo } = useNavigator();
    return <StyledLink onClick={() => navigateTo(to)}>
        {children}
    </StyledLink>
}