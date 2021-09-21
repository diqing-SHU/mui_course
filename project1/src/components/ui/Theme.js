import { createTheme } from '@material-ui/core/styles';

const arcBlue = "#0B72B9"
const arcOrange = "#FFBA60"

export default createTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`,
    },
    primary: {
      main: `${arcBlue}`
    },
    secondary: {
      main: `${arcOrange}`
    }
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      fontWeight: 700,
      textTransform: "none",
      fontSize: "1rem",
    },
    estimate: {
      fontFamily: "Pacifico",
      fontWeight: "1rem",
      textTransform: "none",
      color: "white"
    }
  }
});