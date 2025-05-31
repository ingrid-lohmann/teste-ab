import AlertInfo from '@/components/AlertInfo';
import ErrorAlert from '@/components/ErrorAlert';
import NotFoundAlert from '@/components/NotFoundAlert';
import PermissionAlert from '@/components/PermissionAlert';
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  HStack,
} from '@chakra-ui/react';
import { QrCode } from 'lucide-react';
import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QRCodeReaderPage = () => {
  const [data, setData] = useState('Nenhum QR Code escaneado ainda.');
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');

  const handleScanResult = (result, error) => {
    if (result) {
      setData(result?.text);
      setError(null);
    }

    if (error) {
      if (error.name !== 'NotDetected') {
        setError(error);
      }
    }
  };

  const handleCameraError = (err) => {
    setError(err);
    // console.error("Erro na câmera:", err);
  };

  const resetScanner = () => {
    setData('Nenhum QR Code escaneado ainda.');
    setError(null);
  };

  const renderError = () => {
    if (error.name === 'NotAllowedError') return <PermissionAlert resetScanner={resetScanner} />

    if (error.name === 'NotFoundError') return <NotFoundAlert resetScanner={resetScanner} />

    if (error) return <ErrorAlert resetScanner={resetScanner} error={error} />
  }

  const renderQRCodeReader = () => {
    return (
      <QrReader
        scanDelay={500}
        onResult={handleScanResult}
        onError={handleCameraError}
        constraints={{ facingMode: facingMode }
        }
        videoStyle={{ width: '100%', height: 'auto', transform: 'scaleX(-1)' }}
        containerStyle={{ width: '100%', paddingBottom: '100%', position: 'relative' }}
        videoContainerStyle={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    )
  }

  const renderScannerLoadingOverlay = () => {
    const showOverlay = data === 'Nenhum QR Code escaneado ainda.';

    if (!showOverlay) return null;

    return (
      <VStack
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0,0,0,0.6)"
        justifyContent="center"
        alignItems="center"
        color="white"
      >
        <Spinner size="xl" />
        <Text mt={4}> Aguardando QR Code...</Text>
      </VStack>
    );
  }

  const renderReader = () => {
    return (
      <Box
        width="100%"
        height="auto"
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        boxShadow="lg"
        bg="gray.800"
      >

        {renderQRCodeReader()}

        {renderScannerLoadingOverlay()}
      </Box>
    )
  }

  const renderButton = () => {
    return (
      <Button onClick={() => setFacingMode(facingMode === 'environment' ? 'user' : 'environment')} mt={4} colorScheme="gray">
        Alternar Câmera ({facingMode === 'environment' ? 'Traseira' : 'Frontal'})
      </Button>
    )
  }


  const renderContent = () => {
    if (error) return renderError();

    renderReader();
  }

  return (
    <VStack p={8} spacing={8} alignItems="center" maxWidth="600px" margin="0 auto">
      <HStack mb={6} marginBottom={20} justifyContent={'center'}>
        <QrCode size={32} color="#38A169" />
        <Heading as="h1" size="xl">Leitor QR Code</Heading>
      </HStack>

      {renderContent()}
      {renderButton()}
      <AlertInfo />
    </VStack>
  );
};

export default QRCodeReaderPage;