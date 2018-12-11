import { createMuiTheme } from "@material-ui/core/styles";

export const casinoTheme = createMuiTheme({
  palette: {
    primary: { main: "#f44336" },
    secondary: { main: "#ff3d00" }
  },
  typography: {
    useNextVariants: true
  }
});
