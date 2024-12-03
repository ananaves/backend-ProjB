import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string,
    sobrenome:string,
    dataNascimento: Date,
    endereco: string,
    email: string,
    celular: string
}

/**
 * A classe `AlunoController` estende a classe `Aluno` e é responsável por controlar as requisições relacionadas aos alunos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "aluno".
 * - Herdando de `Aluno`, ela pode acessar métodos e propriedades da classe base.
 */
export class AlunoController extends Aluno {

    /**
    * Lista todos os alunos.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de alunos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de alunos.
    */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // acessa a função de listar os alunos e armazena o resultado
            const listaDeAluno = await Aluno.listarAluno();

            // retorna a lista de alunos há quem fez a requisição web
            return res.status(200).json(listaDeAluno);
        } catch (error) {
            // lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de alunos');

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de Alunos" });
        }
    }

    /**
    * Método controller para cadastrar um novo aluno.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um aluno no corpo da requisição
    * e tenta cadastrar este aluno no banco de dados utilizando a função `cadastroAluno`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do aluno no formato `AlunoDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao aluno.
    * @returns {Promise<any>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao aluno.
    */
   
    static async novo(req: Request, res: Response): Promise<any> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface AlunoDTO
            const alunoRecebido: AlunoDTO = req.body;

            // instanciando um objeto do tipo aluno com as informações recebidas
            const novoAluno = new Aluno(
                alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular
                );

            console.log(novoAluno);

            
            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Aluno.cadastroAluno(novoAluno);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o aluno. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um aluno. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }

     /**
      * Remove um aluno do banco de dados com base no ID fornecido na URL da requisição.
      * 
      * Esta função recebe um ID de aluno da requisição, chama o método do modelo para remover
      * o aluno correspondente e retorna uma resposta HTTP apropriada, dependendo do sucesso ou falha
      * da operação de remoção.
      * 
      * @param {Request} req - Objeto de requisição contendo o ID do aluno nos parâmetros da URL.
      * @param {Response} res - Objeto de resposta utilizado para enviar a resposta HTTP.
      * @returns {Promise<Response>} - Retorna uma resposta HTTP com status 200 para sucesso ou 400 para erro.
      * 
      * @throws {Error} - Caso ocorra um erro, uma resposta HTTP de erro será retornada e o erro será logado no console.
      */
     static async remover(req: Request, res: Response): Promise<any> {
        try {
            // Recupera o ID do aluno a ser removido a partir dos parâmetros da URL
            const idAluno = parseInt(req.params.idAluno as string);

            // Chama a função do modelo para remover o aluno e armazena a resposta (true ou false)
            const respostaModelo = await Aluno.removerAluno(idAluno);

            // Verifica se a resposta do modelo foi verdadeira (aluno removido com sucesso)
            if (respostaModelo) {
                // Retorna um status 200 com uma mensagem de sucesso
                return res.status(200).json({ mensagem: "O aluno foi removido com sucesso!" });
            } else {
                // Retorna um status 400 com uma mensagem de erro caso a remoção falhe
                return res.status(400).json({ mensagem: "Erro ao remover o aluno. Entre em contato com o administrador do sistema." });
            }

        } catch (error) {
            // Exibe uma mensagem de erro no console caso ocorra uma exceção
            console.log(`Erro ao remover o aluno ${error}`);

            // Retorna uma resposta HTTP com status 400 e uma mensagem de erro genérica
            return res.status(400).json({ mensagem: "Não foi possível remover o aluno. Entre em contato com o administrador do sistema." });
        }
    }

      /**
     * Atualiza os dados de um aluno no banco de dados com base no ID fornecido na URL da requisição.
     * 
     * Esta função recebe os dados do aluno a serem atualizados no corpo da requisição, chama o
     * método do modelo para atualizar o aluno no banco de dados e retorna uma resposta HTTP com o
     * status adequado, dependendo do sucesso ou falha da operação de atualização.
     * 
     * @param {Request} req - Objeto de requisição contendo os dados do aluno no corpo e o ID na URL.
     * @param {Response} res - Objeto de resposta utilizado para enviar a resposta HTTP.
     * @returns {Promise<Response>} - Retorna uma resposta HTTP com status 200 para sucesso ou 400 para erro.
     * 
     * @throws {Error} - Caso ocorra um erro, uma resposta HTTP de erro será retornada e o erro será logado no console.
     */
      static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Recupera os dados do aluno a serem atualizados do corpo da requisição
            const alunoRecebido: AlunoDTO = req.body;

            // Recupera o ID do aluno a ser atualizado a partir dos parâmetros da URL
            const idAlunoRecebido = parseInt(req.params.idAluno as string);

            // Cria um novo objeto aluno com os dados recebidos da requisição
            const alunoAtualizado = new Aluno(
                alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular
            );

            // Define o ID do aluno no objeto alunoAtualizado
            alunoAtualizado.setIdAluno(idAlunoRecebido);

            // Chama o método do modelo para atualizar o aluno e armazena a resposta (true ou false)
            const respostaModelo = await Aluno.atualizarAluno(alunoAtualizado);

            // Verifica se a resposta do modelo indica que o aluno foi atualizado com sucesso
            if (respostaModelo) {
                // Retorna uma resposta HTTP com status 200 e mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
            } else {
                // Retorna uma resposta HTTP com status 400 e mensagem de erro caso a atualização falhe
                return res.status(400).json({ mensagem: "Não foi possível atualizar o aluno. Entre em contato com o administrador." });
            }
        } catch (error) {
            // Exibe uma mensagem de erro no console caso ocorra uma exceção
            console.log(`Erro ao atualizar o aluno: ${error}`);

            // Retorna uma resposta HTTP com status 400 e uma mensagem de erro genérica
            return res.status(400).json({ mensagem: "Não foi possível atualizar o aluno. Entre em contato com o administrador." });
        }
    }
}