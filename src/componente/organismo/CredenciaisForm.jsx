import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Alert,
  Grid,
  IconButton
} from "@mui/material";
import {
  ArrowBack,
  PersonAdd,
  AccountCircle,
  Store
} from "@mui/icons-material";
import BuscarUsuarioForm from "../moleculas/BuscarUsuarioForm";
import NovoEnderecoForm from "../moleculas/NovoEnderecoForm";
import PedidoResumoCollapse from "../moleculas/PedidoResumoCollapse";

const CredenciaisForm = ({ pedidos, onBack, onFinish, onRetirarNaLoja }) => {
  const [error, setError] = useState("");
  const [showPedidoSummary, setShowPedidoSummary] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(null); // null, 'novo', 'existente', 'confirmado'
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const handleUsuarioEncontrado = (usuario) => {
    console.log("Usuário encontrado:", usuario); // <-- Adicionado para debug
    setUsuarioSelecionado(usuario);
    setTipoUsuario("confirmado");
  };

  const handleSubmitNovoEndereco = async (formData) => {
    try {
      // Montar o payload do pedido
      const payload = {
        cliente: {
          nome: formData.nome,
          telefone: formData.telefone,
          email: formData.email,
          salvarDados: formData.salvarDados,
        },
        endereco: {
          logradouro: formData.endereco,
          complemento: formData.complemento,
        },
        itens: pedidos.map((pedido) => ({
          tamanho: pedido.tamanho,
          borda: pedido.borda,
          pizzas: pedido.pizzas.map((pizza) => ({
            id: pizza.id,
            nome: pizza.nome,
            preco: pizza.preco,
          })),
          bebidas: pedido.bebidas.map((bebida) => ({
            id: bebida.id,
            nome: bebida.nome,
            preco: bebida.preco,
          })),
          valorTotal: pedido.total,
        })),
        valorTotal: calcularTotalPedidos(),
      };

      // Chamar a função de finalização
      await onFinish(payload);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      setError(
        "Ocorreu um erro ao enviar o pedido. Por favor, tente novamente."
      );
      throw error; // Propagar o erro para o componente NovoEnderecoForm
    }
  };

  const handleSubmitEnderecoConfirmado = async (formData) => {
    try {
      // Montar o payload do pedido com o ID do usuário
      const payload = {
        cliente: {
          id: usuarioSelecionado.id,
          nome: formData.nome,
          telefone: formData.telefone,
          email: formData.email,
        },
        endereco: {
          logradouro: formData.endereco,
          complemento: formData.complemento,
        },
        itens: pedidos.map((pedido) => ({
          tamanho: pedido.tamanho,
          borda: pedido.borda,
          pizzas: pedido.pizzas.map((pizza) => ({
            id: pizza.id,
            nome: pizza.nome,
            preco: pizza.preco,
          })),
          bebidas: pedido.bebidas.map((bebida) => ({
            id: bebida.id,
            nome: bebida.nome,
            preco: bebida.preco,
          })),
          valorTotal: pedido.total,
        })),
        valorTotal: calcularTotalPedidos(),
      };

      // Chamar a função de finalização
      await onFinish(payload);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      setError(
        "Ocorreu um erro ao enviar o pedido. Por favor, tente novamente."
      );
      throw error; // Propagar o erro para o componente NovoEnderecoForm
    }
  };

  const calcularTotalPedidos = () => {
    return pedidos
      .reduce((acc, pedido) => acc + parseFloat(pedido.total), 0)
      .toFixed(2);
  };

  // Renderização inicial com opções de tipo de usuário
  if (tipoUsuario === null) {
    return (
      <Box sx={{ maxWidth: "100%", mx: "auto" }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <IconButton color="primary" onClick={onBack} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" component="h1">
              Informações para Entrega
            </Typography>
          </Box>

          {/* Usando o componente molecular PedidoResumoCollapse */}
          <PedidoResumoCollapse
            pedidos={pedidos}
            showPedidoSummary={showPedidoSummary}
            setShowPedidoSummary={setShowPedidoSummary}
            calcularTotalPedidos={calcularTotalPedidos}
          />

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
                onClick={() => setTipoUsuario("novo")}
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
                onClick={() => setTipoUsuario("existente")}
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

  if (tipoUsuario === "existente") {
    return (
      <Box sx={{ maxWidth: "100%", mx: "auto" }}>
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

          {/* Usando o componente molecular BuscarUsuarioForm */}
          <BuscarUsuarioForm
            onUsuarioEncontrado={handleUsuarioEncontrado}
            onSwitchToNovoUsuario={() => setTipoUsuario("novo")}
          />
        </Paper>
      </Box>
    );
  }

  // Renderização para novo usuário
  if (tipoUsuario === "novo") {
    return (
      <Box sx={{ maxWidth: "100%", mx: "auto" }}>
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
              Novo Endereço
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Usando o componente molecular PedidoResumoCollapse */}
          <PedidoResumoCollapse
            pedidos={pedidos}
            showPedidoSummary={showPedidoSummary}
            setShowPedidoSummary={setShowPedidoSummary}
            calcularTotalPedidos={calcularTotalPedidos}
          />

          <Divider sx={{ my: 3 }} />

          {/* Usando o componente molecular NovoEnderecoForm */}
          <NovoEnderecoForm onSubmit={handleSubmitNovoEndereco} />
        </Paper>
      </Box>
    );
  }

  // Renderização para usuário confirmado
  if (tipoUsuario === "confirmado") {
    return (
      <Box sx={{ maxWidth: "100%", mx: "auto" }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton
              color="primary"
              onClick={() => setTipoUsuario("existente")}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h5" component="h1">
              Confirmar Informações
            </Typography>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          {/* Usando o componente molecular PedidoResumoCollapse */}
          <PedidoResumoCollapse
            pedidos={pedidos}
            showPedidoSummary={showPedidoSummary}
            setShowPedidoSummary={setShowPedidoSummary}
            calcularTotalPedidos={calcularTotalPedidos}
          />
          <Divider sx={{ my: 3 }} />
          {/* Usando o componente molecular NovoEnderecoForm em modo de confirmação */}
          <NovoEnderecoForm
            onSubmit={handleSubmitEnderecoConfirmado}
            initialData={{
              nome: usuarioSelecionado.nome,
              telefone: usuarioSelecionado.telefone,
              email: usuarioSelecionado.email,
              endereco: usuarioSelecionado.endereco.logradouro,
              complemento: usuarioSelecionado.endereco.complemento || "",
            }}
            isConfirmMode={true}
          />
        </Paper>
      </Box>
    );
  }

  // Caso padrão (não deve acontecer)
  return null;
};

export default CredenciaisForm;

