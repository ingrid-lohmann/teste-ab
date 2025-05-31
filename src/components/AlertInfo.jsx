import { Alert, AlertDescription, AlertTitle } from '@chakra-ui/react'
import { AlertCircleIcon } from 'lucide-react'

const AlertInfo = () => {
  return (
    <Alert status="info" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" borderRadius="md" p={4}>
      <AlertCircleIcon size={40} mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">Atenção!</AlertTitle>
      <AlertDescription maxWidth="sm">
        Acesso à câmera requer permissão do navegador e, em produção, geralmente funciona apenas em **HTTPS**
      </AlertDescription>
    </Alert>
  )
}

export default AlertInfo