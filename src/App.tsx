import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Footer from "./components/footer";

import Header from "./components/header";
import TableClient from "./components/tableClient";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    height: "100vh",
    minHeight: "100%",
  },
  footer: {},
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <div style={{ padding: "2rem" }}>
        <TableClient />
      </div>

      <Footer />
    </div>
  );
}
