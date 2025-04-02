import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: "Roboto, sans-serif",
    },
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
            main: "rgb(34, 34, 34)",
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
        MuiCardContent: {
            styleOverrides: {
                root: {
                    "&:last-child": {
                        paddingBottom: "1rem"
                    }
                }
            }
        }
    },
});

export default theme;