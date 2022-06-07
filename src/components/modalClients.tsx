import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
    overflow: "hidden",
    padding: "2rem",
  },
}));

interface Props {
  open: boolean;
  onClose: () => void;
  form: any;
  setForm: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  createClient: () => void;
}

const ModalClients = ({
  open,
  onClose,
  form,
  setForm,
  createClient,
}: Props) => {
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setForm({ ...form, [event.target?.name]: event.target?.value });
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper elevation={3} className={classes.container}>
        <Typography
          style={{ textAlign: "center" }}
          id="modal-modal-title"
          variant="h4"
          component="h2"
        >
          Dados do Cliente
        </Typography>
        <Divider />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                name="name"
                required
                label="Nome"
                variant="outlined"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="company"
                required
                label="Empresa"
                variant="outlined"
                value={form.company}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <TextField
                name="phone"
                required
                label="Telefone"
                variant="outlined"
                value={form.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                required
                label="E-mail"
                variant="outlined"
                value={form.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                name="address"
                required
                label="Endereço"
                variant="outlined"
                value={form.address}
                onChange={handleChange}
                style={{
                  width: "100%",
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <textarea
                name="note"
                placeholder="Notas"
                value={form.note}
                onChange={handleChange}
                rows={6}
                style={{
                  resize: "none",
                  width: "100%",
                  border: "1px solid #7e7c7c",
                }}
              ></textarea>
            </Grid>
          </Grid>
          <div style={{ width: "100%", marginTop: "2rem" }}>
            <Button
              style={{ width: "48%", border: "1px solid #03b70979" }}
              variant="outlined"
              onClick={createClient}
            >
              Salvar
            </Button>
            <Button
              style={{
                width: "48%",
                marginLeft: "1rem",
                border: "1px solid #b7030379",
              }}
              variant="outlined"
              onClick={() => onClose()}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};
export default ModalClients;
