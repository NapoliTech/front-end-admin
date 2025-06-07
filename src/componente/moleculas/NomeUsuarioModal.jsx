import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const NomeUsuarioModal = ({ open, onClose, onConfirm }) => {
  const [nome, setNome] = useState("");

  // Limpa o campo ao abrir/fechar o modal
  useEffect(() => {
    if (!open) setNome("");
  }, [open]);

  const handleConfirm = () => {
    if (nome.trim()) {
      onConfirm(nome.trim());
      setNome("");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          minWidth: 300,
        }}
      >
        <Typography variant="h6" mb={2}>
          Informe seu nome para retirada na loja
        </Typography>
        <TextField
          label="Nome"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          autoFocus
        />
        <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={!nome.trim()}
          >
            Confirmar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NomeUsuarioModal;
