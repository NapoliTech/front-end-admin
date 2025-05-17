import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  Person,
  Phone,
  Home,
  Email,
  ShoppingCart,
  ArrowBack,
  Send,
  KeyboardArrowDown,
  KeyboardArrowUp,
  AttachMoney,
  Search,
  PersonAdd,
  AccountCircle,
  Store,
} from "@mui/icons-material";

// Componente para buscar usuário existente
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
      // Simulação de busca de usuário
      // Em produção, você faria uma chamada à API:
      // const response = await usuarioService.buscarPorEmail(email);
      
      // Simulando um delay para mostrar o loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulando um usuário encontrado
      if (email.includes("@")) {
        const usuario = {
          id: 123,
          nome: "Cliente Exemplo",
          email: email,
          telefone: "(11) 98765-4321",
          endereco: {
            logradouro: "Rua Exemplo, 123 - Bairro Teste",
            complemento: "Apto 42"
          }
        };
        setUsuarioEncontrado(usuario);
      } else {
        setError("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setError("Ocorreu um erro ao buscar o usuário. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarUsuario = () => {
    onUsuarioEncontrado(usuarioEncontrado);
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
                startAdornment: <Email sx={{ mr: 1, color: "text.secondary" }} />,
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
            >
              {loading ? "Buscando..." : "Buscar Cliente"}
            </Button>
          </Grid>
        </Grid>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {usuarioEncontrado && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Cliente Encontrado
            </Typography>
            <Typography variant="body1">
              <strong>Nome:</strong> {usuarioEncontrado.nome}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {usuarioEncontrado.email}
            </Typography>
            <Typography variant="body1">
              <strong>Telefone:</strong> {usuarioEncontrado.telefone}
            </Typography>
            <Typography variant="body1">
              <strong>Endereço:</strong> {usuarioEncontrado.endereco.logradouro}
            </Typography>
            {usuarioEncontrado.endereco.complemento && (
              <Typography variant="body1">
                <strong>Complemento:</strong> {usuarioEncontrado.endereco.complemento}
              </Typography>
            )}
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleConfirmarUsuario}
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

const CredenciaisForm = ({ pedidos, onBack, onFinish, onRetirarNaLoja }) => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    complemento: "",
    salvarDados: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPedidoSummary, setShowPedidoSummary] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(null); // null, 'novo', 'existente'
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "salvarDados" ? checked : value,
    });
  };

  const handleUsuarioEncontrado = (usuario) => {
    setUsuarioSelecionado(usuario);
    setFormData({
      nome: usuario.nome,
      telefone: usuario.telefone,
      email: usuario.email,
      endereco: usuario.endereco.logradouro,
      complemento: usuario.endereco.complemento || "",
      salvarDados: false,
    });
    setTipoUsuario('confirmado');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Montar o payload do pedido
      const payload = {
        cliente: {
          nome: formData.nome,
          telefone: formData.telefone,
          email: formData.email,
          id: usuarioSelecionado?.id // Incluir ID se for um usuário existente
        },
        endereco: {
          logradouro: formData.endereco,
          complemento: formData.complemento,
        },
        itens: pedidos.map(pedido => ({
          tamanho: pedido.tamanho,
          borda: pedido.borda,
          pizzas: pedido.pizzas.map(pizza => ({
            id: pizza.id,
            nome: pizza.nome,
            preco: pizza.preco
          })),
          bebidas: pedido.bebidas.map(bebida => ({
            id: bebida.id,
            nome: bebida.nome,
            preco: bebida.preco
          })),
          valorTotal: pedido.total
        })),
        valorTotal: calcularTotalPedidos()
      };

      // Simular envio para o backend
      // Quando for conectar com o backend real, use:
      // await pedidoService.enviarPedido(payload);
      console.log("Enviando pedido:", payload);
      
      // Simular um atraso para mostrar o loading
      setTimeout(() => {
        setLoading(false);
        // Chamar a função de finalização
        onFinish(payload);
      }, 1500);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      setError("Ocorreu um erro ao enviar o pedido. Por favor, tente novamente.");
      setLoading(false);
    }
  };

  const calcularTotalPedidos = () => {
    return pedidos.reduce((acc, pedido) => acc + parseFloat(pedido.total), 0).toFixed(2);
  };

  const isFormValid = () => {
    return formData.nome && formData.telefone && formData.endereco;
  };

  // Renderização inicial com opções de tipo de usuário
  if (tipoUsuario === null) {
    return (
      <Box sx={{ maxWidth: '100%', mx: "auto" }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <IconButton 
              color="primary" 
              onClick={onBack}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" component="h1">
              Informações para Entrega
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setShowPedidoSummary(!showPedidoSummary)}
              endIcon={showPedidoSummary ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              sx={{ justifyContent: "space-between", py: 1 }}
            >
              <Typography>Resumo do Pedido</Typography>
              <Chip 
                icon={<AttachMoney />} 
                label={`R$ ${calcularTotalPedidos()}`} 
                color="success"
              />
            </Button>
            <Collapse in={showPedidoSummary}>
              <Box sx={{ mt: 2, p: 2, bgcolor: "background.default", borderRadius: 1 }}>
                <Stack spacing={2}>
                  {pedidos.map((pedido, index) => (
                    <Box key={index} sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                        Pedido {index + 1}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Tamanho: {pedido.tamanho}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Borda: {pedido.borda}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                          <Chip 
                            size="small" 
                            label={`R$ ${pedido.total}`} 
                            color="primary" 
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Collapse>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Selecione uma opção:
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 3 }}
                startIcon={<PersonAdd />}
                onClick={() => setTipoUsuario('novo')}
              >
                Informar Novo Endereço
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                sx={{ py: 3 }}
                startIcon={<AccountCircle />}
                onClick={() => setTipoUsuario('existente')}
              >
                Cliente já Cadastrado
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
                sx={{ py: 3 }}
                startIcon={<Store />}
                onClick={() => onRetirarNaLoja()}
              >
                Retirar na Loja
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }

  // Renderização para buscar usuário existente
  if (tipoUsuario === 'existente') {
    return (
      <Box sx={{ maxWidth: '100%', mx: "auto" }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton 
              color="primary" 
              onClick={() => setTipoUsuario(null)}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" component="h1">
              Cliente Cadastrado
            </Typography>
          </Box>

          <BuscarUsuarioForm 
            onUsuarioEncontrado={handleUsuarioEncontrado} 
            onSwitchToNovoUsuario={() => setTipoUsuario('novo')}
          />
        </Paper>
      </Box>
    );
  }

  // Renderização do formulário para novo usuário ou usuário confirmado
  return (
    <Box sx={{ maxWidth: '100%', mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton 
            color="primary" 
            onClick={() => tipoUsuario === 'confirmado' ? setTipoUsuario('existente') : setTipoUsuario(null)}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" component="h1">
            {tipoUsuario === 'confirmado' ? 'Confirmar Informações' : 'Novo Endereço'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setShowPedidoSummary(!showPedidoSummary)}
              endIcon={showPedidoSummary ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              sx={{ justifyContent: "space-between", py: 1 }}
            >
              <Typography>Resumo do Pedido</Typography>
              <Chip 
                icon={<AttachMoney />} 
                label={`R$ ${calcularTotalPedidos()}`} 
                color="success"
              />
            </Button>
            <Collapse in={showPedidoSummary}>
              <Box sx={{ mt: 2, p: 2, bgcolor: "background.default", borderRadius: 1 }}>
                <Stack spacing={2}>
                  {pedidos.map((pedido, index) => (
                    <Box key={index} sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                        Pedido {index + 1}
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" color="text.secondary">
                            Tamanho: {pedido.tamanho}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Borda: {pedido.borda}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
                          <Chip 
                            size="small" 
                            label={`R$ ${pedido.total}`} 
                            color="primary" 
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Collapse>
          </Box>
  
          <Divider sx={{ my: 3 }} />
  
          <form onSubmit={handleSubmit}>
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
                    startAdornment: <Person sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                  disabled={tipoUsuario === 'confirmado'}
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
                  disabled={tipoUsuario === 'confirmado'}
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
                  disabled={tipoUsuario === 'confirmado'}
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
                  disabled={tipoUsuario === 'confirmado'}
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
                  disabled={tipoUsuario === 'confirmado'}
                />
              </Grid>
              {tipoUsuario === 'novo' && (
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
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => tipoUsuario === 'confirmado' ? setTipoUsuario('existente') : setTipoUsuario(null)}
                    startIcon={<ArrowBack />}
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!isFormValid() || loading}
                    endIcon={loading ? <CircularProgress size={20} /> : <Send />}
                    sx={{ minWidth: 150 }}
                  >
                    {loading ? "Enviando..." : "Finalizar Pedido"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    );
  };
  
  export default CredenciaisForm;
  