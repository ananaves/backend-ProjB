import { Request, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";

interface EmprestimoDTO {
    idAluno: number,
    idLivro: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmprestimo: Date
}

/**
 * A classe `EmprestimoController` estende a classe `Emprestimo` e é responsável por controlar as requisições relacionadas aos Emprestimos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "Emprestimo".
 * - Herdando de `Emprestimo`, ela pode acessar métodos e propriedades da classe base.
 */
export class EmprestimoController extends Emprestimo {

    /**
    * Lista todos os emprestimos.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de emprestimos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem dos emprestimos.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os emprestimos e armazena o resultado
            const listaDeEmprestimos = await Emprestimo.listarEmprestimo();

            // retorna a lista de Emprestimos há quem fez a requisição web
            return res.status(200).json(listaDeEmprestimos);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de Emprestimo');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de |Emprestimo" });
        }
    }

    /**
    * Método controller para cadastrar um novo Emprestimo.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um Emprestimo no corpo da requisição
    * e tenta cadastrar este Emprestimo no banco de dados utilizando a função `cadastroEmprestimo`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do emprestimo no formato `Emprestimo`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao aluno.
    * @returns {Promise<any>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao aluno.
    */
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface |EmprestimoDTO
            const emprestimoRecebido: EmprestimoDTO = req.body;

            // instanciando um objeto do tipo emprestimo com as informações recebidas
            const novoEmprestimo = new Emprestimo(emprestimoRecebido.idLivro,
                emprestimoRecebido.idAluno,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
                );

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Emprestimo.cadastroEmprestimo(novoEmprestimo);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Emprestimo cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o EmprescleRtimo. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um Emprestimo. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o Emprestimo. Entre em contato com o administrador do sistema." });
        }
    }
  
    
    /**
     * Atualiza os dados de um emprestimo no sistema.
     * 
     * Esta função recupera os dados do emprestimo a serem atualizados a partir do corpo da requisição (`req.body`) 
     * e o ID do emprestimo a partir dos parâmetros da URL. Verifica se o ID é válido, cria um objeto `emprestimo` 
     * com os dados fornecidos e chama o método do modelo para realizar a atualização. Retorna uma resposta 
     * indicando o sucesso ou a falha da operação.
     * 
     * @param {Request} req - Objeto da requisição HTTP contendo os dados do emprestimo no corpo e o ID nos parâmetros.
     * @param {Response} res - Objeto da resposta HTTP usado para enviar o status e mensagens ao aluno.
     * @returns {Promise<Response>} - Retorna:
     *   - Status 200 e uma mensagem de sucesso se a atualização for bem-sucedida.
     *   - Status 400 e uma mensagem de erro caso a atualização falhe ou ocorra uma exceção.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Recupera os dados do emprestimo a serem atualizados do corpo da requisição.
            const emprestimoRecebido: EmprestimoDTO = req.body;

            // Recupera o ID do emprestimo a ser atualizado a partir dos parâmetros da URL.
            const idEmprestimoRecebido = parseInt(req.params.idEmprestimo as string);

            // Verifica se o ID do emprestimo é válido.
            if (isNaN(idEmprestimoRecebido) || idEmprestimoRecebido <= 0) {
                return res.status(400).json({ mensagem: "ID do emprestimo inválido. Por favor, forneça um ID válido." });
            }

            // Cria um novo objeto `emprestimoVenda` com os dados recebidos.
            const emprestimoAtualizado = new Emprestimo(
                emprestimoRecebido.idLivro,
                emprestimoRecebido.idAluno,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
            );

            // Define o ID do emprestimo no objeto `emprestimoAtualizado`.
            emprestimoAtualizado.setIdEmprestimo(idEmprestimoRecebido);

            // Chama o método do modelo para atualizar o emprestimo e armazena a resposta (true ou false).
            const respostaModelo = await Emprestimo.atualizarEmprestimo(emprestimoAtualizado);

            // Verifica se a resposta do modelo indica que o emprestimo foi atualizado com sucesso.
            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Emprestimo atualizado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Não foi possível atualizar o emprestimo. Entre em contato com o administrador." });
            }
        } catch (error) {
            // Loga o erro no console para depuração.
            console.error(`Erro ao atualizar o emprestimo: ${error}`);

            // Retorna uma resposta HTTP com status 400 e mensagem genérica de erro.
            return res.status(400).json({ mensagem: "Não foi possível atualizar o emprestimo. Entre em contato com o administrador." });
        }
    }
}