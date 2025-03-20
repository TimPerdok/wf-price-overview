import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "rgb(134, 203, 146)",
        },
        text: {
            primary: "#fff",
            secondary: "#fff",
        },
        background: {
            default: "rgb(25, 25, 25)",
            paper: "rgb(25, 25, 25)",
        },
        secondary: {
            main: "#e45456",
        },
    },
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    borderRadius: "8px"
                },
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "transparent",
                },
            },
        },
    },
});

export default theme;