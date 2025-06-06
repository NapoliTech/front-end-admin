import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  Chip,
  Paper,
} from "@mui/material";
import {
  Email,
  Search,
  PersonAdd,
  Person,
  Phone,
  Home,
  Badge,
  CheckCircle,
  LocationCity,
  Info,
} from "@mui/icons-material";
import { usuarioService } from "../../services/usuarioService";

const BuscarUsuarioForm = ({ onUsuarioEncontrado, onSwitchToNovoUsuario }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(null);

  const handleBuscarUsuario = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, informe um email para buscar");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Usar o serviço existente para buscar o usuário
      const response = await usuarioService.buscarUsuario(email);

      console.log("Resposta completa:", response); // Para debug

      // Acessar o objeto usuario dentro da resposta
      const usuario = response;

      if (usuario) {
        console.log("Dados do usuário extraídos:", usuario);
        setUsuarioEncontrado(usuario);
      } else {
        setError("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setError(
        "Ocorreu um erro ao buscar o usuário. Por favor, tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarUsuario = () => {
    console.log(usuarioEncontrado);
    // Mapear os dados do usuário para o formato esperado pelo componente pai
    const usuarioFormatado = {
      id: usuarioEncontrado.usuario.idUsuario,
      nome: usuarioEncontrado.usuario.nome,
      email: usuarioEncontrado.usuario.email,
      telefone: usuarioEncontrado.usuario.telefone,
      endereco: {
        logradouro: usuarioEncontrado.endereco
          ? `${usuarioEncontrado.endereco.rua}, ${usuarioEncontrado.endereco.numero} - ${usuarioEncontrado.endereco.bairro}`
          : "",
        complemento: usuarioEncontrado.endereco
          ? usuarioEncontrado.endereco.complemento
          : "",
        cidade: usuarioEncontrado.endereco
          ? usuarioEncontrado.endereco.cidade
          : "",
        estado: usuarioEncontrado.endereco
          ? usuarioEncontrado.endereco.estado
          : "",
        cep: usuarioEncontrado.endereco ? usuarioEncontrado.endereco.cep : "",
      },
    };

    onUsuarioEncontrado(usuarioFormatado);
  };

  // Função para obter as iniciais do nome
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Buscar Cliente Cadastrado
      </Typography>

      <form onSubmit={handleBuscarUsuario}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email do Cliente"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              required
              type="email"
              placeholder="cliente@exemplo.com"
              InputProps={{
                startAdornment: (
                  <Email sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&.Mui-focused fieldset": {
                    borderWidth: 2,
                    borderColor: "primary.main",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Search />}
              sx={{
                py: 1.2,
                borderRadius: 2,
              }}
            >
              {loading ? "Buscando..." : "Buscar Cliente"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {usuarioEncontrado && (
        <Card
          sx={{
            mt: 3,
            borderRadius: 3,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            overflow: "visible",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              zIndex: 0,
            },
          }}
        >
          <CardContent sx={{ position: "relative", pt: 7 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "primary.main",
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  border: "4px solid white",
                  marginTop: "-40px",
                }}
              >
                {getInitials(usuarioEncontrado.nome)}
              </Avatar>
              <Typography variant="h5" sx={{ mt: 2, fontWeight: "bold" }}>
                {usuarioEncontrado.nome}
              </Typography>
              <Chip
                icon={<CheckCircle />}
                label="Cliente Verificado"
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "rgba(25, 118, 210, 0.04)",
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Typography variant="subtitle2" color="primary" gutterBottom>
                    Informações Pessoais
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <Email color="primary" sx={{ mr: 1.5, fontSize: 20 }} />
                    <Typography variant="body2">
                      {usuarioEncontrado.usuario.email}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                    <Phone color="primary" sx={{ mr: 1.5, fontSize: 20 }} />
                    <Typography variant="body2">
                      {usuarioEncontrado.usuario.telefone}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Badge color="primary" sx={{ mr: 1.5, fontSize: 20 }} />
                    <Typography variant="body2">
                      {usuarioEncontrado.usuario.cpf}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "rgba(76, 175, 80, 0.04)",
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="success.main"
                    gutterBottom
                  >
                    Endereço
                  </Typography>

                  {usuarioEncontrado.endereco ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          mb: 1.5,
                        }}
                      >
                        <Home
                          color="success"
                          sx={{ mr: 1.5, fontSize: 20, mt: 0.5 }}
                        />
                        <Typography variant="body2">
                          {`${usuarioEncontrado.endereco.rua}, ${usuarioEncontrado.endereco.numero}`}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <LocationCity
                          color="success"
                          sx={{ mr: 1.5, fontSize: 20 }}
                        />
                        <Typography variant="body2">
                          {`${usuarioEncontrado.endereco.bairro}`}
                        </Typography>
                      </Box>

                      {usuarioEncontrado.endereco.complemento && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Info
                            color="success"
                            sx={{ mr: 1.5, fontSize: 20 }}
                          />
                          <Typography variant="body2">
                            {usuarioEncontrado.endereco.complemento}
                          </Typography>
                        </Box>
                      )}
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Nenhum endereço cadastrado
                    </Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                borderRadius: 2,
                py: 1.5,
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                },
              }}
              onClick={handleConfirmarUsuario}
              startIcon={<CheckCircle />}
            >
              Confirmar e Continuar
            </Button>
          </CardContent>
        </Card>
      )}

      <Button
        variant="text"
        color="primary"
        onClick={onSwitchToNovoUsuario}
        startIcon={<PersonAdd />}
        sx={{ mt: 2 }}
      >
        Informar Novo Endereço
      </Button>
    </Box>
  );
};

export default BuscarUsuarioForm;
