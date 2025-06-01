import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import { Sparkle, Sparkles } from 'lucide-react';

const HomePage = () => {
  return (
    <Box maxW="3xl" mx="auto" py={8} p={4}>
      <Stack spacing={6}>
        <Heading size="xl" textAlign="center" mb={4}>
          Bem-vindo(a) ao Nosso Projeto de Presença!
        </Heading>

        <Text fontSize="lg" textAlign="center" color="gray.700">
          Estamos empolgados em testar e melhorar a forma como o registro de presença dos **escoteiros**! Para isso, estamos fazendo um pequeno experimento.
        </Text>

        <Text fontSize="md">
          Imagine que estamos experimentando duas maneiras diferentes de fazer a chamada, para ver qual delas é a mais <Text as='b'>prática e rápida</Text> para todos. Isso é o que chamamos de **Teste A/B**! É como comparar dois caminhos para ver qual nos leva mais rápido ao destino.
        </Text>

        <Text fontSize="md">
          Neste teste, vamos analisar duas opções de registro:
        </Text>

        <Stack pl={4} spacing={2} borderLeft="4px solid" borderColor="teal.300" py={2} bg="gray.50" borderRadius="md">
          <Sparkle size={18} color="#319795" />
          <Text fontSize="md">
            ✨**Chamada por QR Code:** Aqui, os monitores usarão a câmera do celular para **escanear um código** (como um código de barras quadrado) que cada escoteiro terá. Ah, e para você testar à vontade, temos uma **página com exemplos de QR Codes** que você pode usar! **Dica:** Você pode abrir essa página de exemplos no seu computador e usar o celular para fazer a leitura, assim fica bem prático!
          </Text>
          <Text fontSize="md">
            ✨ **Chamada por Lista:** Nesta opção, o responsável pela turma terá uma **lista digital com todos os nomes** dos escoteiros e poderá marcar a presença de cada um manualmente, com um simples toque.
          </Text>
        </Stack>

        <Text fontSize="md" mt={4} fontWeight="bold" color="teal.600">
          ✨ Importante: Faça o Teste Pelo Celular! ✨
        </Text>
        <Text fontSize="md">
          Para que o seu feedback seja o mais útil e real possível, pedimos que você realize tanto a chamada por QR Code quanto a chamada por lista **diretamente no seu celular**. É que, na "vida real", o registro de presença é feito com um aparelho portátil e a câmera do celular é essencial para a opção de QR Code. Assim, sua experiência será a mais próxima da realidade!
        </Text>

        <Text fontSize="md">
          Nosso objetivo é que a chamada de presença seja sempre **rápida, sem erros e super fácil de usar**. A sua experiência ao testar estas duas opções será essencial para nos ajudar a decidir qual delas se encaixa melhor nas nossas atividades escoteiras.
        </Text>

        <Text fontSize="md">
          Contamos com a sua participação para construir a melhor ferramenta! 😊
        </Text>

        <Text fontSize="md">
          Ao final, a sua experiência e a eficiência que observarmos no uso real do aplicativo nos ajudarão a escolher a melhor forma de registrar a presença.
        </Text>

        <Text fontSize="md" fontWeight="bold" textAlign="center" mt={6}>
          Sua participação é muito importante para nós!
        </Text>
      </Stack>
    </Box>
  );
}

export default HomePage;