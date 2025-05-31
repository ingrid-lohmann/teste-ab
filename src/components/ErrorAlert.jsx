import { Alert, AlertDescription, AlertTitle, Button } from '@chakra-ui/react'
import { AlertCircleIcon } from 'lucide-react'
import PropTypes from 'prop-types'

const ErrorAlert = (resetScanner, error) => {
  return (
    <Alert status="error" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" borderRadius="md" p={4}>
      <AlertCircleIcon size={40} mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">Erro ao iniciar a Câmera!</AlertTitle>
      <AlertDescription maxWidth="sm">
        {error.message || "Ocorreu um erro desconhecido ao acessar a câmera."}
      </AlertDescription>
      <Button onClick={resetScanner} mt={4} colorScheme="red">Tentar Novamente</Button>
    </Alert>
  )
}

ErrorAlert.propTypes = {
  resetScanner: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error).isRequired,
};

export default ErrorAlert