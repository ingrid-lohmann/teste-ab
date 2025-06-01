import { Button, Checkbox, Heading, HStack, Text, VStack, useToast, Box, SimpleGrid, ButtonGroup } from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { students } from './mock-list';



const StudentListPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (name) => {
    setCheckedItems(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  const handleSubmit = () => {
    const presentScouts = Object.entries(checkedItems)
      .filter(([_, checked]) => checked)
      .map(([name]) => name);

    toast({
      title: presentScouts.length ? 'Presença registrada' : 'Ops!',
      description: presentScouts.length
        ? `Presentes: ${presentScouts.join(', ')}`
        : 'Nenhum escoteiro selecionado',
      status: presentScouts.length ? 'success' : 'error',
      duration: 4000,
      isClosable: true,
    });

    navigate('/feedback', { state: { students: presentScouts } });
  }

  const handleReset = () => {
    setCheckedItems({});

    toast({
      title: 'Seleção limpa com sucesso',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <Box paddingBottom={20}>
      <HStack mb={6}>
        <CheckCircle size={32} color="#38A169" />
        <Heading as="h1" size="xl">Lista de Presença dos Escoteiros</Heading>
      </HStack>

      <VStack align="start" spacing={6} cursor={'pointer'}>
        {students.map(student => (
          <Checkbox
            key={student.id}
            isChecked={!!checkedItems[student.name]}
            onChange={() => handleCheckboxChange(student.name)}
          >
            <Text fontSize="lg" as={'b'}>{student.name}</Text>
          </Checkbox>
        ))}
      </VStack>

      <ButtonGroup spacing='6' marginTop={4}>
        <Button mt={6} colorScheme="green" onClick={handleSubmit}>
          Confirmar Presença
        </Button>

        <Button mt={6} colorScheme="red" onClick={handleReset}>
          Limpar seleção
        </Button>
      </ButtonGroup>

    </Box>
  );
}

export default StudentListPage;
