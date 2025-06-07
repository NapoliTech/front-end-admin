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
import NomeUsuarioModal from "../moleculas/NomeUsuarioModal";
import { usuarioService } from "../../services/usuarioService";
import FormClienteNaoCadastrado from "../moleculas/FormClienteNaoCadastrado";
// Função para gerar CPF válido e formatado XXX.XXX.XXX-XX
function gerarCpfFormatado() {
  const n = () => Math.floor(Math.random() * 9);
  const cpf = Array.from({ length: 9 }, n).join("");
  const calcDv = (cpf, factor) => {
    let total = 0;
    for (let i = 0; i < factor - 1; i++) {
      total += parseInt(cpf[i]) * (factor - i);
    }
    let dv = 11 - (total % 11);
    return dv > 9 ? 0 : dv;
  };
  const dv1 = calcDv(cpf, 10);
  const dv2 = calcDv(cpf + dv1, 11);
  const cpfCompleto = cpf + dv1 + dv2;
  return cpfCompleto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

const CredenciaisForm = ({ pedidos, onBack, onFinish, onRetirarNaLoja }) => {
  const [error, setError] = useState("");
  const [showPedidoSummary, setShowPedidoSummary] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(null); // null, 'novo', 'existente', 'confirmado'
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleUsuarioEncontrado = (usuario) => {
    setUsuarioSelecionado(usuario);
    setTipoUsuario("confirmado");
  };

  const handleSubmitNovoEndereco = async (formData) => {
    try {
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

      await onFinish(payload);
    } catch (error) {
      setError(
        "Ocorreu um erro ao enviar o pedido. Por favor, tente novamente."
      );
      throw error;
    }
  };


  const handleSubmitClienteNaoCadastrado = async (form) => {
    setError("");
    // Gera dados fake
    const random = Math.floor(Math.random() * 100000);
    const fakeEmail = `pedidonaocadastrado${random}@gmail.com`;
    const fakeCpf = gerarCpfFormatado();
    const payloadCadastro = {
      nome: form.nome,
      email: fakeEmail,
      dataNasc: "10/01/1989",
      cpf: fakeCpf,
      senha: "P@ssw0rd",
      confirmarSenha: "P@ssw0rd",
      telefone: "(11) 99999-9999",
    };

    try {
      // 1. Cadastra usuário fake
      const resUsuario = await usuarioService.cadastrarUsuario(payloadCadastro);
      const usuario = resUsuario.data?.usuario;
      const usuarioId = usuario?.id;

      if (!usuarioId) {
        setError("Erro ao cadastrar usuário: ID não retornado pela API.");
        return;
      }

      // 2. Cadastra endereço com dados do form
      const payloadEndereco = {
        rua: form.rua,
        numero: form.numero,
        bairro: form.bairro,
        complemento: form.complemento,
        cidade: form.cidade,
        estado: form.estado,
        cep: form.cep,
        usuarioId: usuarioId,
      };
      await usuarioService.cadastrarEndereco(payloadEndereco);

      // 3. Monta payload igual cliente cadastrado
      const payloadPedido = {
        cliente: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
        },
        endereco: {
          logradouro: `${form.rua}, ${form.numero} - ${form.bairro}`,
          complemento: form.complemento,
          cidade: form.cidade,
          estado: form.estado,
          cep: form.cep,
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

      onFinish(payloadPedido);
    } catch (err) {
      setError(
        "Erro ao cadastrar usuário/endereço para cliente não cadastrado."
      );
      console.error(err);
    }
  };





  const handleSubmitEnderecoConfirmado = async (formData) => {
    try {
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

      await onFinish(payload);
    } catch (error) {
      setError(
        "Ocorreu um erro ao enviar o pedido. Por favor, tente novamente."
      );
      throw error;
    }
  };

  const calcularTotalPedidos = () => {
    return pedidos
      .reduce((acc, pedido) => acc + parseFloat(pedido.total), 0)
      .toFixed(2);
  };

  // Handler para abrir o modal ao clicar em "Retirar na Loja"
  const handleRetirarNaLojaClick = () => {
    setModalOpen(true);
  };

  // Handler para quando o nome for confirmado no modal
    const handleModalConfirm = async (nomeCompleto) => {
    setModalOpen(false);
  
    const random = Math.floor(Math.random() * 100000);
    const fakeEmail = `pedidodesistema${random}@gmail.com`;
    const fakeCpf = gerarCpfFormatado();
    const payloadCadastro = {
      nome: nomeCompleto,
      email: fakeEmail,
      dataNasc: "10/01/1989",
      cpf: fakeCpf,
      senha: "P@ssw0rd",
      confirmarSenha: "P@ssw0rd",
      telefone: "(11) 99999-9999",
    };
  
    try {
      // 1. Cadastra usuário
      const resUsuario = await usuarioService.cadastrarUsuario(payloadCadastro);
      const usuario = resUsuario.data?.usuario;
      const usuarioId = usuario?.id;
  
      if (!usuarioId) {
        setError("Erro ao cadastrar usuário: ID não retornado pela API.");
        return;
      }
  
      // 2. Cadastra endereço fixo
      const payloadEndereco = {
        rua: "Rua Juquiá",
        numero: 675,
        bairro: "Jardim Cristiane",
        complemento: "Digital Building",
        cidade: "Santo Andre",
        estado: "SP",
        cep: "09185-235",
        usuarioId: usuarioId,
      };
      await usuarioService.cadastrarEndereco(payloadEndereco);
  
      // 3. Monta payload igual cliente cadastrado
      const payloadPedido = {
        cliente: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
        },
        endereco: {
          logradouro: "Rua Juquiá, 675 - Jardim Cristiane",
          complemento: "Digital Building",
          cidade: "Santo Andre",
          estado: "SP",
          cep: "09185-235",
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
  
      // Chama handleFinish para seguir o mesmo fluxo de confirmação
      onFinish(payloadPedido);
    } catch (err) {
      setError("Erro ao cadastrar usuário/endereço para retirada na loja.");
      console.error(err);
    }
  };

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
            {/* <Grid item xs={12} md={3}>
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
            </Grid> */}
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                size="large"
                sx={{ py: 3 }}
                startIcon={<Store />}
                onClick={handleRetirarNaLojaClick}
              >
                Retirar na Loja
              </Button>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="outlined"
                color="warning"
                fullWidth
                size="large"
                sx={{ py: 3 }}
                onClick={() => setTipoUsuario("naoCadastrado")}
              >
                Cliente não cadastrado
              </Button>
            </Grid>
          </Grid>
          <NomeUsuarioModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleModalConfirm}
          />
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
          <BuscarUsuarioForm
            onUsuarioEncontrado={handleUsuarioEncontrado}
            onSwitchToNovoUsuario={() => setTipoUsuario("novo")}
          />
        </Paper>
      </Box>
    );
  }

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
          <PedidoResumoCollapse
            pedidos={pedidos}
            showPedidoSummary={showPedidoSummary}
            setShowPedidoSummary={setShowPedidoSummary}
            calcularTotalPedidos={calcularTotalPedidos}
          />
          <Divider sx={{ my: 3 }} />
          <NovoEnderecoForm onSubmit={handleSubmitNovoEndereco} />
        </Paper>
      </Box>
    );
  }
  if (tipoUsuario === "naoCadastrado") {
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
              Cliente não cadastrado
            </Typography>
          </Box>
          <FormClienteNaoCadastrado
            onSubmit={handleSubmitClienteNaoCadastrado}
            onBack={() => setTipoUsuario(null)}
          />
        </Paper>
      </Box>
    );
  }
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
          <PedidoResumoCollapse
            pedidos={pedidos}
            showPedidoSummary={showPedidoSummary}
            setShowPedidoSummary={setShowPedidoSummary}
            calcularTotalPedidos={calcularTotalPedidos}
          />
          <Divider sx={{ my: 3 }} />
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

  return null;
};

export default CredenciaisForm;