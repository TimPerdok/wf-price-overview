import { Typography } from "@mui/material"
import React from "react"
import theme from "../Theme"

export default function PriceDifference({ difference, invert }: { difference: number, invert?: boolean }) {
    const color = difference > 0 && !invert ? theme.palette.success.main : theme.palette.error.main
    const sign = invert ? "+" : "-"
    return <Typography variant="caption" sx={{ color, verticalAlign: "middle" }}>
        {`(${sign}${Math.abs(difference)})`}
    </Typography>
}
