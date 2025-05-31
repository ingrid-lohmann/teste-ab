import QRCodeItem from '@/components/QRCodeItem';
import { Box, Heading, HStack, SimpleGrid, } from '@chakra-ui/react';
import { ScanQrCode, QrCode } from 'lucide-react';

import { students } from './mock-list';

const QRCodeExamplesPage = () => {

  return (
    <Box paddingBottom={20}>
      <HStack mb={6} marginBottom={20} justifyContent={'center'}>
        <QrCode size={32} color="#38A169" />
        <Heading as="h1" size="xl">Exemplos de QR Codes</Heading>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={10}>
        {students.map(student => (
          <QRCodeItem value={student.name} key={student.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default QRCodeExamplesPage;
