import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Logo from "../assets/logo.png";
const useStyles = makeStyles((theme) => ({
  field: {
    "& .container": {
      width: "100%",
      margin: "8px 0px",
    },
    "& .MuiFormControl-root": {
      fontWeight: "400",
      "& fieldset": {
        borderColor: "#cfcfcf !important",
      },
    },
    "& .MuiOutlinedInput-input": {
      padding: "12px",
    },
    "& .MuiInputBase-root": {
      fontWeight: "400",
    },
  },
  fieldText: {
    position: "relative",
    width: "30%",
    borderRadius: "50%",
    "& .container": {
      width: "100%",
      margin: "8px 0px",
    },
    "& .MuiFormControl-root": {
      width: "100%",
      fontSize: "14px",

      fontWeight: "400",
      "& fieldset": {
        borderColor: "#cfcfcf !important",
      },
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#FFF",
      padding: "12px",
      fontSize: "14px",

      fontWeight: "400",
    },
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.38) !important",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        backgroundColor: "#052a51",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <img src={Logo} alt="logo da empresa" />
      <div className={classes.fieldText}>
        <TextField
          label=""
          placeholder="Busque por Nome Vendedor"
          variant="filled"
          // value={value}
          // onChange={(event) => setSearch(event.target.value)}
          // onKeyPress={(event) => event.key === 'Enter' ? handleChangeSearch(event) : {}}
        />
        <div
          style={{
            position: "absolute",
            right: "14px",
            top: "5px",
            backgroundColor: "#FFF",
          }}
        >
          <svg
            width="1.8rem"
            height="1.8rem"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 13.9997L11.0093 11.0037L14 13.9997ZM12.6667 6.99967C12.6667 8.50257 12.0696 9.94391 11.0069 11.0066C9.94423 12.0693 8.50289 12.6663 7 12.6663C5.4971 12.6663 4.05576 12.0693 2.99306 11.0066C1.93035 9.94391 1.33333 8.50257 1.33333 6.99967C1.33333 5.49678 1.93035 4.05544 2.99306 2.99274C4.05576 1.93003 5.4971 1.33301 7 1.33301C8.50289 1.33301 9.94423 1.93003 11.0069 2.99274C12.0696 4.05544 12.6667 5.49678 12.6667 6.99967V6.99967Z"
              stroke="#BFBFBF"
              stroke-width="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default Header;
