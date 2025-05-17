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
} from "@mui/material";
import { Store, DirectionsWalk } from "@mui/icons-material";
import MontarPedidoForm from "../organismo/MontarPedidoForm";
import CredenciaisForm from "../organismo/CredenciaisForm";

const steps = ["Montar Pedido", "Informações de Entrega", "Confirmação"];

const MontarPedido = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [pedidos, setPedidos] = useState([]);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(null);
  const [error, setError] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState(null); // 'entrega' ou 'retirada'

  const handleContinue = (pedidosSelecionados) => {
    setPedidos(pedidosSelecionados);
    setActiveStep(1);
  };

  const handleRetirarNaLoja = (pedidosSelecionados) => {
    setPedidos(pedidosSelecionados);
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
    };

    setPedidoFinalizado(pedidoRetirada);
    setActiveStep(2);
  };

  const handleBack = () => {
    setActiveStep(0);
  };

  const handleFinish = async (dadosPedido) => {
    try {
      // Aqui você pode fazer a chamada real para a API
      // const response = await pedidoService.finalizarPedido(dadosPedido);
      // setPedidoFinalizado(response.data);

      // Por enquanto, vamos apenas simular
      setPedidoFinalizado({
        ...dadosPedido,
        tipoEntrega: "entrega",
        numeroPedido: `PED-${Math.floor(Math.random() * 10000)}`,
        status: "CONFIRMADO",
        dataPedido: new Date().toISOString(),
        previsaoEntrega: "30-45 minutos",
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
      // Aqui você faria a chamada real para a API para gerar o pedido
      // const response = await pedidoService.gerarPedido(pedidoFinalizado);

      // Simulando sucesso
      alert(`Pedido ${pedidoFinalizado.numeroPedido} gerado com sucesso!`);

      // Redirecionar para a lista de pedidos ou dashboard
      // navigate('/pedidos');
    } catch (error) {
      console.error("Erro ao gerar pedido:", error);
      setError("Não foi possível gerar o pedido. Por favor, tente novamente.");
    }
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
            onRetirarNaLoja={() => handleRetirarNaLoja(pedidos)}
          />
        );

      case 2:
        return (
          <Box sx={{ maxWidth: '100%', mx: "auto", mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom color="primary">
                {tipoEntrega === "retirada"
                  ? "Pedido para Retirada"
                  : "Pedido Confirmado!"}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Número do Pedido: {pedidoFinalizado?.numeroPedido}
              </Typography>

              <Box
                sx={{
                  my: 3,
                  p: 2,
                  bgcolor: "background.default",
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Detalhes do Pedido:
                </Typography>

                {tipoEntrega === "retirada" ? (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      <strong>Tipo:</strong> Retirada na Loja
                    </Typography>
                    <Typography variant="body1">
                      <strong>Tempo estimado para retirada:</strong>{" "}
                      {pedidoFinalizado?.previsaoRetirada}
                    </Typography>
                  </Alert>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                      <strong>Cliente:</strong>{" "}
                      {pedidoFinalizado?.cliente?.nome}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Telefone:</strong>{" "}
                      {pedidoFinalizado?.cliente?.telefone}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Endereço:</strong>{" "}
                      {pedidoFinalizado?.endereco?.logradouro}
                      {pedidoFinalizado?.endereco?.complemento &&
                        `, ${pedidoFinalizado.endereco.complemento}`}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Tempo estimado de entrega:</strong>{" "}
                      {pedidoFinalizado?.previsaoEntrega}
                    </Typography>
                  </Box>
                )}

                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Itens:
                </Typography>

                {pedidoFinalizado?.itens?.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      p: 2,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Pedido {index + 1} - {item.tamanho} - Borda: {item.borda}
                    </Typography>

                    {item.pizzas?.map((pizza, pizzaIndex) => (
                      <Typography key={pizzaIndex} variant="body2">
                        •{" "}
                        {pizzaIndex === 0
                          ? "Primeira metade"
                          : "Segunda metade"}
                        : {pizza.nome} - R$ {pizza.preco}
                      </Typography>
                    ))}

                    {item.bebidas?.length > 0 && (
                      <>
                        <Typography
                          variant="body2"
                          sx={{ mt: 1, fontWeight: "medium" }}
                        >
                          Bebidas:
                        </Typography>
                        {item.bebidas.map((bebida, bebidaIndex) => (
                          <Typography key={bebidaIndex} variant="body2">
                            • {bebida.nome} - R$ {bebida.preco}
                          </Typography>
                        ))}
                      </>
                    )}

                    <Typography
                      variant="body2"
                      sx={{ mt: 1, fontWeight: "bold" }}
                    >
                      Subtotal: R$ {item.valorTotal}
                    </Typography>
                  </Box>
                ))}

                <Typography variant="h6" align="right" sx={{ mt: 2 }}>
                  Valor Total: R$ {pedidoFinalizado?.valorTotal}
                </Typography>
              </Box>

              <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  onClick={handleGerarPedido}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Gerar Pedido
                </Button>
              </Box>
            </Paper>
          </Box>
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
    </Container>
  );
};

export default MontarPedido;
