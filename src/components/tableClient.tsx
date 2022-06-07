import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import api from "../services/api";
import {
  Box,
  Button,
  Modal,
  TablePagination,
  Typography,
} from "@material-ui/core";
import { makeStyles, mergeClasses } from "@material-ui/styles";
import ModalClients from "./modalClients";
import { Pagination } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  container: {
    "& .MuiButtonBase-root-MuiPaginationItem-root": {
      color: "#fff",
      fontSize: "1rem",
    },
  },
}));

interface Clients {
  guid: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  note: string;
  isActive: boolean;
}

export default function TableClient() {
  const initialValue = {
    guid: uuidv4(),
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    isActive: true,
  };
  const classes = useStyles();

  const [dataClients, setDataClients] = useState({});
  const [clients, setClients] = useState<Clients[]>([]);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialValue);

  const handleClose = () => setOpen(false);

  const [page, setPage] = useState(0);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    api.get("/clients").then((response) => {
      setClients(response.data);
    });
  }, []);
  console.log(clients);

  async function createClient() {
    const body = {
      name: dataClients.name,
    };
    await api.post("/clients", values).then((response) => {
      setClients(response.data);
    });
  }

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          marginBottom: "1rem",
        }}
      >
        <Button
          style={{ width: "30%", border: "1px solid #0327b7e7", color: "#fff" }}
          variant="outlined"
          onClick={handleOpen}
        >
          Criar Novo Cliente
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={client.guid}>
                <TableCell component="th" scope="row">
                  {client.name}
                </TableCell>
                <TableCell>{client.company}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>
                  {client.isActive === true ? "Ativo" : "Inativo"}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <button style={{ padding: "0.5rem", background: "none" }}>
                    <BsTrash size="1rem" />
                  </button>
                  <button
                    onClick={handleOpen}
                    style={{ padding: "0.5rem", background: "none" }}
                  >
                    <BiEditAlt size="1rem" />
                  </button>{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.container} style={{ textAlign: "end" }}>
        <Pagination
          variant="outlined"
          color="standard"
          count={clients.length}
          page={page}
          onChange={handleChange}
        />
      </div>

      <ModalClients
        open={open}
        onClose={handleClose}
        form={dataClients}
        setForm={setDataClients}
        createClient={createClient}
      />
    </>
  );
}
