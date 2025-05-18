import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Container,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Button,
  Snackbar,
} from "@mui/material";
import { Store, DirectionsWalk } from "@mui/icons-material";
import MontarPedidoForm from "../organismo/MontarPedidoForm";
import CredenciaisForm from "../organismo/CredenciaisForm";
import PedidoConfirmado from "../moleculas/PedidoConfirmado";
import { pedidoService } from "../../services/pedidoService";

const steps = ["Montar Pedido", "Informações de Entrega", "Confirmação"];

const MontarPedido = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoPayload, setPedidoPayload] = useState({
    clienteId: null,
    itens: [],
  });
  const [pedidoFinalizado, setPedidoFinalizado] = useState(null);
  const [error, setError] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState(null); // 'entrega' ou 'retirada'
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleContinue = (pedidosSelecionados, payload) => {
    setPedidos(pedidosSelecionados);
    setPedidoPayload(payload);
    setActiveStep(1);
  };

  const handleRetirarNaLoja = (pedidosSelecionados, payload) => {
    setPedidos(pedidosSelecionados);
    setPedidoPayload(payload);
    setTipoEntrega("retirada");

    // Criar um pedido finalizado para retirada na loja
    const pedidoRetirada = {
      tipoEntrega: "retirada",
      itens: pedidosSelecionados.map((pedido) => ({
        tamanho: pedido.tamanho,
        borda: pedido.borda,
        pizzas: pedido.pizzas,
        bebidas: pedido.bebidas,
        valorTotal: pedido.total,
      })),
      valorTotal: pedidosSelecionados
        .reduce((acc, pedido) => acc + parseFloat(pedido.total), 0)
        .toFixed(2),
      numeroPedido: `PED-${Math.floor(Math.random() * 10000)}`,
      status: "AGUARDANDO PREPARO",
      dataPedido: new Date().toISOString(),
      previsaoRetirada: "20-30 minutos",
      payload: payload, // Armazenar o payload para envio posterior
    };

    setPedidoFinalizado(pedidoRetirada);
    setActiveStep(2);
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleFinish = async (dadosCliente) => {
    try {
      // Atualizar o payload com o ID do cliente
      const payloadCompleto = {
        ...pedidoPayload,
        clienteId: dadosCliente.id || 1, // Usar o ID do cliente ou um valor padrão
      };

      // Aqui você pode fazer a chamada real para a API
      // const response = await pedidoService.finalizarPedido(payloadCompleto);
      // setPedidoFinalizado(response.data);

      // Por enquanto, vamos apenas simular
      setPedidoFinalizado({
        ...dadosCliente,
        tipoEntrega: "entrega",
        numeroPedido: `PED-${Math.floor(Math.random() * 10000)}`,
        status: "CONFIRMADO",
        dataPedido: new Date().toISOString(),
        previsaoEntrega: "30-45 minutos",
        itens: pedidos.map((pedido) => ({
          tamanho: pedido.tamanho,
          borda: pedido.borda,
          pizzas: pedido.pizzas,
          bebidas: pedido.bebidas,
          valorTotal: pedido.total,
        })),
        valorTotal: pedidos
          .reduce((acc, pedido) => acc + parseFloat(pedido.total), 0)
          .toFixed(2),
        payload: payloadCompleto, // Armazenar o payload para envio posterior
      });

      setActiveStep(2);
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      setError(
        "Não foi possível finalizar seu pedido. Por favor, tente novamente."
      );
    }
  };

  const handleGerarPedido = async () => {
    try {
      const response = await pedidoService.gerarPedido(
        pedidoFinalizado.payload
      );

      console.log(response);
      return true;
    } catch (error) {
      console.error("Erro ao gerar pedido:", error);
      setSnackbar({
        open: true,
        message: "Não foi possível gerar o pedido. Por favor, tente novamente.",
        severity: "error",
      });
      return false;
    }
  };
  
  const handleNavigateToPedidos = (message) => {
    // Mostrar Snackbar com a mensagem
    setSnackbar({
      open: true,
      message: message || "Redirecionando para a lista de pedidos...",
      severity: "success",
    });

    // Delay de 1 segundo antes de navegar
    setTimeout(() => {
      if (onNavigate) {
        onNavigate("pedidos");
      }
    }, 1000);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <MontarPedidoForm
            onContinue={handleContinue}
            onRetirarNaLoja={handleRetirarNaLoja}
          />
        );

      case 1:
        return (
          <CredenciaisForm
            pedidos={pedidos}
            onBack={handleBack}
            onFinish={handleFinish}
            onRetirarNaLoja={() => handleRetirarNaLoja(pedidos, pedidoPayload)}
          />
        );

      case 2:
        return (
          <PedidoConfirmado
            pedidoFinalizado={pedidoFinalizado}
            tipoEntrega={tipoEntrega}
            onGerarPedido={handleGerarPedido}
            onNavigateToPedidos={handleNavigateToPedidos}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xl">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Montar Pedidos
        </Typography>

        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>{renderStepContent()}</Box>
      </Paper>

      {/* Snackbar para mensagens de sucesso/erro */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MontarPedido;
