import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Person, Phone, Home, Email, Send } from "@mui/icons-material";

const NovoEnderecoForm = ({
  onSubmit,
  initialData = {},
  isConfirmMode = false,
}) => {
  const [formData, setFormData] = useState({
    nome: initialData.nome || "",
    telefone: initialData.telefone || "",
    email: initialData.email || "",
    endereco: initialData.endereco || "",
    complemento: initialData.complemento || "",
    salvarDados: initialData.salvarDados || false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "salvarDados" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Erro ao processar formulário:", error);
      setError(
        "Ocorreu um erro ao processar o formulário. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.nome && formData.telefone && formData.endereco;
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nome Completo"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <Person sx={{ mr: 1, color: "text.secondary" }} />
              ),
            }}
            disabled={isConfirmMode}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&.Mui-focused fieldset": {
                  borderWidth: 2,
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="(00) 00000-0000"
            InputProps={{
              startAdornment: <Phone sx={{ mr: 1, color: "text.secondary" }} />,
            }}
            disabled={isConfirmMode}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&.Mui-focused fieldset": {
                  borderWidth: 2,
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: "text.secondary" }} />,
            }}
            disabled={isConfirmMode}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&.Mui-focused fieldset": {
                  borderWidth: 2,
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Endereço"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="Rua, número, bairro, cidade"
            InputProps={{
              startAdornment: <Home sx={{ mr: 1, color: "text.secondary" }} />,
            }}
            disabled={isConfirmMode}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&.Mui-focused fieldset": {
                  borderWidth: 2,
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
            variant="outlined"
            placeholder="Apartamento, bloco, referência, etc."
            disabled={isConfirmMode}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&.Mui-focused fieldset": {
                  borderWidth: 2,
                  borderColor: "primary.main",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "primary.main",
              },
            }}
          />
        </Grid>
        {!isConfirmMode && (
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.salvarDados}
                  onChange={handleChange}
                  name="salvarDados"
                  color="primary"
                />
              }
              label="Salvar meus dados para próximos pedidos"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isFormValid() || loading}
              endIcon={loading ? <CircularProgress size={20} /> : <Send />}
              sx={{
                minWidth: 150,
                borderRadius: 2,
                py: 1,
                px: 3,
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              {loading
                ? "Enviando..."
                : isConfirmMode
                ? "Confirmar Dados"
                : "Continuar"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default NovoEnderecoForm;
