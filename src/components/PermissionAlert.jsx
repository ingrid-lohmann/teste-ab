import { Alert, AlertDescription, AlertTitle, Button } from '@chakra-ui/react'
import { AlertCircleIcon } from 'lucide-react'
import PropTypes from 'prop-types'

const PermissionAlert = (resetScanner) => {
  return (
    <Alert status="error" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" borderRadius="md" p={4}>
      <AlertCircleIcon size={40} mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">Permissão da Câmera Negada!</AlertTitle>
      <AlertDescription maxWidth="sm">
        Por favor, conceda permissão de acesso à câmera nas configurações do seu navegador para usar o leitor de QR Code.
      </AlertDescription>
      <Button onClick={resetScanner} mt={4} colorScheme="red">Tentar Novamente</Button>
    </Alert>
  )
}

PermissionAlert.propTypes = {
  resetScanner: PropTypes.func.isRequired,
};

export default PermissionAlert