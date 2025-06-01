import AlertInfo from '@/components/AlertInfo';
import { Box, Button, Heading, HStack, Text, useToast } from '@chakra-ui/react';
import { Html5Qrcode } from 'html5-qrcode';
import { QrCode } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const isMobile = () => {
  // eslint-disable-next-line no-undef
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const QRCodeReaderPage = () => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [scanned, setScanned] = useState([]);
  const [isMobileDevice, setIsMobileDevice] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const handleScanSuccess = useCallback((decodedText) => {
    if (!scanned.includes(decodedText)) {
      setScanned((prev) => [...prev, decodedText]);
      toast({
        title: 'Presença registrada',
        description: decodedText,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [scanned, toast]);

  const handleScanFailure = useCallback((errorMessage) => {
    console.log('Falha na leitura:', errorMessage);
  }, []);

  const renderGenericErrorToast = useCallback((err) => {
    toast({
      title: 'Erro ao acessar a câmera',
      description: err.message || 'Verifique as permissões e tente novamente.',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  }, [toast]);

  const initializeScanner = useCallback(async () => {
    try {
      html5QrCodeRef.current = new Html5Qrcode(scannerRef.current.id);
      const devices = await Html5Qrcode.getCameras();

      const backCamera =
        devices.find((d) => d.label.toLowerCase().includes('back')) || devices[0];

      await html5QrCodeRef.current.start(
        backCamera.id,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleScanSuccess,
        handleScanFailure
      );
    } catch (err) {
      console.error('Erro ao iniciar a câmera:', err);
      renderGenericErrorToast(err)
    }
  }, [handleScanFailure, handleScanSuccess, renderGenericErrorToast])

  const stopScanner = async () => {
    try {
      await html5QrCodeRef.current?.stop();
      await html5QrCodeRef.current?.clear();
    } catch (err) {
      console.warn('Erro ao parar o scanner:', err);
    }
  };

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  useEffect(() => {
    if (isMobileDevice && scannerRef.current) {
      initializeScanner();
    }

    return () => {
      stopScanner();
    };
  }, [initializeScanner, isMobileDevice]);

  const handleConfirm = () => {
    navigate('/feedback', { state: { students: scanned } });
  };

  const renderAlertInfo = () => {
    if (!isMobileDevice) {
      return (
        <HStack mb={6} marginBottom={20} justifyContent={'center'}>
          <AlertInfo />
        </HStack>
      )
    };

    return (
      <>
        <Box
          id="reader"
          ref={scannerRef}
          w="100%"
          maxW="400px"
          m="auto"
          border="2px"
          borderColor="gray.300"
          borderRadius="md"
          overflow="hidden"
        />
        <Button
          mt={6}
          colorScheme="green"
          onClick={handleConfirm}
          isDisabled={scanned.length === 0}
        >
          Confirmar Presenças
        </Button>
      </>
    )
  }

  return (
    <Box p={4}>
      <HStack mb={6} marginBottom={20} justifyContent={'center'}>
        <QrCode size={32} color="#319795" />
        <Heading as="h1" size="xl">Leitor QR Code</Heading>
      </HStack>

      {renderAlertInfo()}
    </Box>
  );
}

export default QRCodeReaderPage;
