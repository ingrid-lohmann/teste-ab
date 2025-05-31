import { Alert, AlertDescription, AlertTitle, Button } from '@chakra-ui/react'
import { AlertCircleIcon } from 'lucide-react'
import PropTypes from 'prop-types'

const NotFoundAlert = (resetScanner) => {
  return (
    <Alert status="warning" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" borderRadius="md" p={4}>
      <AlertCircleIcon size={40} mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">Câmera Não Encontrada!</AlertTitle>
      <AlertDescription maxWidth="sm">
        Nenhuma câmera disponível foi detectada. Verifique se sua câmera está conectada e funcionando.
      </AlertDescription>
      <Button onClick={resetScanner} mt={4} colorScheme="orange">Tentar Novamente</Button>
    </Alert>
  )
}

NotFoundAlert.propTypes = {
  resetScanner: PropTypes.func.isRequired,
};

export default NotFoundAlert