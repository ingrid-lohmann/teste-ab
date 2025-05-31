import { Box, Heading, Text, Stack } from '@chakra-ui/react';

export default function About() {
  return (
    <Box maxW="3xl" mx="auto" py={8}>
      <Stack spacing={6}>
        <Heading size="xl">Sobre o Projeto</Heading>

        <Text>
          Este aplicativo está realizando um <strong>teste A/B</strong> com o objetivo de descobrir qual forma de chamada de presença é mais eficiente e prática.
        </Text>

        <Text>
          O <strong>teste A/B</strong> é uma técnica usada para comparar duas versões diferentes de uma funcionalidade, para determinar qual delas gera melhores resultados com base em dados reais.
        </Text>

        <Text>
          Neste caso, estamos comparando duas abordagens:
        </Text>

        <Stack pl={4} spacing={2}>
          <Text>• Chamada através de <strong>QR Code</strong>, onde os monitores escaneiam um código para registrar a presença de cada escoteiro.</Text>
          <Text>• Chamada através de uma <strong>listagem de escoteiros</strong>, onde o responsável marca manualmente a presença de cada escoteiro.</Text>
        </Stack>

        <Text>
          A escolha final será baseada na experiência do usuário e na eficiência observada durante o uso real do aplicativo.
        </Text>
      </Stack>
    </Box>
  );
}
