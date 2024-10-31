import { server } from './server';
import { DatabaseModel } from './model/DatabaseModel';

/**
 * Porta do servidor
 */
const port : number = 3333;

/**
 * Testando a conexão com o banco de dados
 *  */
new DatabaseModel().testeConexao().then((resbd) => {
    if(resbd) {
        /**Iniciando o servidor */
        server.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        })
        /** Tratamento de erro */
    } else {
        console.log('Não foi possível conectar ao banco de dados');
    }
})