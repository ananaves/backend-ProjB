import { server } from './server';

/**
 * Porta do servidor
 */
const port: number = 3333;

/**Iniciando o servidor */
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})
