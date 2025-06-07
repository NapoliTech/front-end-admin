import React, { useState } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";

const FormClienteNaoCadastrado = ({ onSubmit, onBack }) => {
  const [form, setForm] = useState({
    nome: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nome Completo"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Rua"
            name="rua"
            value={form.rua}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Número"
            name="numero"
            value={form.numero}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Bairro"
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Complemento"
            name="complemento"
            value={form.complemento}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="CEP"
            name="cep"
            value={form.cep}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Cidade"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <TextField
            label="Estado"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
        <Button onClick={onBack}>Voltar</Button>
        <Button type="submit" variant="contained" color="primary">
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};

export default FormClienteNaoCadastrado;