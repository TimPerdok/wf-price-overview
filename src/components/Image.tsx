import { Box, BoxProps } from "@mui/material";
import React from "react";
import theme from "../Theme";

export default function Image(props: BoxProps<"img">) {
    return <>
        <Box
            {...props}
            component="img"
        />
    </>
}

export function ItemImage(props: { item: { thumb?: string | null } } & BoxProps<"img">) {
    return <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
        boxShadow: 6,
        padding: "1rem",
        aspectRatio: 1,
        backgroundColor: theme.palette.background.default,
    }}>
        <Image
            {...props}
            sx={{
                objectFit: "contain",
                height: "100%",
                width: "100%",
                ...props.sx,
            }}
            src={props.item.thumb ? `https://warframe.market/static/assets/${props.item.thumb}` : ""} />
    </Box>

}