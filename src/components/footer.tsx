import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";

const useStyles = makeStyles((theme) => ({
  container: {
    color: "rgb(102, 178, 255)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    height: "7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  content: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    textDecoration: "none",
    width: "50px",
    height: "50px",
    color: "#fff",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "5px 5px 10px #00000080, -5px -5px 10px #18191f",
    display: "flex",
    margin: "0.5rem",
    fontSize: "1.5rem",

    " &:focus": {
      animation: "$shadow .15s ease-in-out ",
    },
  },

  "@keyframes shadow": {
    "0%": {
      boxShadow: " inset 5px 5px 10px #00000080, inset -5px -5px 10px #18191f",
    },
    "100%": {
      boxShadow: "none",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Typography>Contato</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <span style={{ marginRight: "1rem" }}>(xx) x.xxxx-xxxx</span>{" "}
          <span>fulanodetal@teste.com.br</span>
        </div>
      </div>
      <div className={classes.content}>
        <Typography>Nossas Redes Sociais!</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a className={classes.icon} href="#">
            {" "}
            <i>
              <IoLogoInstagram />
            </i>
          </a>
          <a className={classes.icon} href="#">
            <i>
              <RiFacebookCircleLine />
            </i>
          </a>
          <a className={classes.icon} href="#">
            {" "}
            <i>
              <FaWhatsapp />
            </i>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
