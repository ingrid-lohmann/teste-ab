import AlertInfo from '@/components/AlertInfo';
import SectionHeader from '@/components/SectionHeader';
import { Box, Button, HStack, useToast } from '@chakra-ui/react';
import { Html5Qrcode } from 'html5-qrcode';
import { ScanQrCode } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const isMobile = () => {
  // eslint-disable-next-line no-undef
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const QRCodeReaderPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const lastScanTimeRef = useRef(0);
  const html5QrCodeRef = useRef(null);
  const [scanned, setScanned] = useState([]);
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  const handleScanSuccess = useCallback((decodedText) => {
    const now = Date.now();
    const scanCooldown = 2000;

    if (now - lastScanTimeRef.current < scanCooldown) {
      return; 
    }

    lastScanTimeRef.current = now;

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
    // eslint-disable-next-line no-undef
    console.log('Falha na leitura:', errorMessage);
  }, []);

  const renderGenericErrorToast = useCallback((err) => {
    toast({
      duration: 4000,
      status: 'error',
      isClosable: true,
      title: 'Erro ao acessar a câmera',
      description: err.message || 'Verifique as permissões e tente novamente.',
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
      // eslint-disable-next-line no-undef
      console.error('Erro ao iniciar a câmera:', err);
      renderGenericErrorToast(err)
    }
  }, [handleScanFailure, handleScanSuccess, renderGenericErrorToast])

  const stopScanner = async () => {
    try {
      await html5QrCodeRef.current?.stop();
      await html5QrCodeRef.current?.clear();
    } catch (err) {
      // eslint-disable-next-line no-undef
      console.warn('Erro ao parar o scanner:', err);
    }
  };

  const handleClearScanned = () => {
    setScanned([]);
    toast({
      status: 'info',
      duration: 3000,
      isClosable: true,
      title: 'Lista limpa',
      description: 'Todos os registros foram removidos.',
    });
  };

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  const renderInitializeButton = useCallback(() => {
    return (
      <Button colorScheme="teal" onClick={initializeScanner}>
        Iniciar leitura
      </Button>
    )
  }, [initializeScanner])

  useEffect(() => {
    if (isMobileDevice && scannerRef.current) {
      initializeScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isMobileDevice, initializeScanner]);

  const handleConfirm = () => {
    navigate('/feedback', { state: { students: scanned } });
  };

  const renderButtons = () => {
    return (
      <HStack mt={6} spacing={4} justify="center">
        <Button
          colorScheme="green"
          onClick={handleConfirm}
          isDisabled={scanned.length === 0}
        >
          Confirmar presenças
        </Button>
        <Button
          variant="outline"
          colorScheme="red"
          onClick={handleClearScanned}
          isDisabled={scanned.length === 0}
        >
          Limpar lista
        </Button>
      </HStack>
    )
  }

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
          m="auto"
          w="100%"
          id="reader"
          maxW="400px"
          border="2px"
          ref={scannerRef}
          borderRadius="md"
          overflow="hidden"
          borderColor="gray.300"
        />
        {renderButtons()}
      </>
    )
  }

  return (
    <Box p={4}>
      <SectionHeader title='Leitor QR Code' icon={ScanQrCode} />
      {renderAlertInfo()}
    </Box>
  );
}

export default QRCodeReaderPage;
