import { Typography } from "@mui/material"
import React from "react"
import styled from "styled-components"
import theme from "../Theme"

const ColoredText = styled.span<{ color: string }>`
    color: ${props => props.color};
`

export default function PriceDifference({ difference, invert, hideBraces, small }: { difference: number, invert?: boolean, hideBraces?: boolean, small?: boolean }) {
    const getColor = () => {
        if (difference > 0 && !invert) return theme.palette.success.main
        if (difference < 0 && !invert) return theme.palette.error.main
        if (difference > 0 && invert) return theme.palette.error.main
        if (difference < 0 && invert) return theme.palette.success.main
        return theme.palette.grey[500]
    }
    const color = getColor()
    const sign = invert ? "+" : "-"

    const differenceString = <>
        {!hideBraces && "("}
        {difference !== 0 ? `${sign}${Math.abs(difference)}` : 0}
        {!hideBraces && ")"}
    </>
    if (small) return <Typography variant="caption" color={color}>
        {differenceString}
    </Typography>
    return <ColoredText color={color}>
        {differenceString}
    </ColoredText>

}
