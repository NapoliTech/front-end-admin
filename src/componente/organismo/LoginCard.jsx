import React, { useState } from "react";
import { Container, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../moleculas/LoginHeader";
import LoginFooter from "../moleculas/LoginFooter";
import LoginForm from "../moleculas/LoginForm";
import { useAuth } from "../../hooks/useAuth";

const LoginCard = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleSubmit = async (data) => {
    console.log("Dados enviados:", data); // Adicione esta linha
    try {
      await login(data);
      setSeverity("success");
      setSnackbarMessage("Login realizado com sucesso!");
      setOpenSnackbar(true);

      // Redirecionar após login bem-sucedido
      setTimeout(() => {
        navigate("/Atendimento");
      }, 1000);
    } catch (err) {
      console.log(err);
      setSeverity("error");
      setSnackbarMessage(
        error || "Falha na autenticação. Verifique suas credenciais."
      );
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LoginHeader />
        <LoginForm onSubmit={handleSubmit} isLoading={loading} />
        <LoginFooter />
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginCard;
