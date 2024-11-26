import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um empréstimo
 */

export class Emprestimo {

    /* Atributos */
    /* Id do emprestimo */
    private idEmprestimo: number = 0;
    /* Id do aluno */
    private idAluno: number = 0;
    /* Id do livro */
    private idLivro: number = 0;
    /* Data de emprestimo do livro */
    private dataEmprestimo: Date;
    /* Data de devolução do livro */
    private dataDevolucao: Date;
    /* Status do empréstimo do livro */
    private statusEmprestimo: Date;
    static status_emprestimo: Date;

    /**
     * Construtor da classe emprestimo
     * 
     * @param idAluno Id do aluno
     * @param idLivro Id do livro
     * @param dataEmprestimo Data do emprestimo
     * @param dataDevolucao Data de devolução do emprestimo
     * @param statusEmprestimo Status do emprestimo  
     */

    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: Date
    ) {
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    /* Método get e set */
    /**
     * Recupera o id do emprestimo
     * @returns o id do emprestimo
     */
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    /**
     * Atribui um valor ao id do emprestimo
     * @param idEmprestimo novo emprestimo a ser identificado
     */
    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    /**
     * Retorna o id do Aluno
     * @returns {number} O id do Aluno 
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /** 
     * Define o id do Aluno 
     * @param idAluno O id do Aluno a ser definido
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o id do Livro 
     * @returns {number} O id do Livro 
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o id do Livro 
     * @param idLivro O id do Livro a ser definido
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Retorna a data do emprestimo
     * @returns {Date} A data do emprestimo
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    /**
     * Define a data do emprestimo
     * @param dataEmprestimo A data do emprestimo a ser definido
     */
    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Retorna a data de devolucao do emprestimo
     * @returns {Date} A data de devolucao do emprestimo
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    /**
     * Define a data de devolucao do emprestimo
     * @param dataDevolucao A data de devolucao do emprestimo a ser definida
     */
    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * Retorna a status do emprestimo
     * @returns {Date} A status do emprestimo
     */
    public getStatusEmprestimo(): Date {
        return this.statusEmprestimo;
    }

    /**
     * Define a status do emprestimo
     * @param statusEmprestimo A status do emprestimo a ser definido
     */
    public setStatusEmprestimo(statusEmprestimo: Date): void {
        this.statusEmprestimo = statusEmprestimo;
    }

    /**
         * O método listarEmprestimo executa uma consulta SQL para buscar todos os pedidos e vendas da tabela emprestimo no banco de dados.
         * @returns todos os pedidos e vendas encontrados no banco de dados.
         */

    static async listarEmprestimo(): Promise<Array<Emprestimo> | null> {

        let listaDeEmprestimo: Array<Emprestimo> = [];

        try {

            const querySelectEmprestimo = `SELECT * FROM emprestimo;`;

            const respostaBD = await database.query(querySelectEmprestimo);

            respostaBD.rows.forEach((emprestimo: any) => {
                let novoEmprestimo = new Emprestimo(
                    emprestimo.id_aluno,
                    emprestimo.id_livro,
                    emprestimo.data_empre,
                    emprestimo.data_devolucao,
                    emprestimo.status_empre
                );

                novoEmprestimo.setIdEmprestimo(emprestimo.id);

                listaDeEmprestimo.push(novoEmprestimo);

            });

            return listaDeEmprestimo;


        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    /**
     * Realiza o cadastro de um Emprestimo no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Emprestimo` e insere seus dados (id_livro, id_aluno, data_emprestimo, data_devolucao, 
     * status_emprestimo)
     * na tabela `emprestimo` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * @param {Emprestimo} emprestimo - Objeto contendo os dados do pedidoVenda que será cadastrado. O objeto `Emprestimo`
    deve conter os métodos `getIdLivro()`, `getIdAluno()`, `getDataEmprestimo(), `getDataDevolucao()`, `getStatusEmprestimo()`
    que retornam os respectivos valores do emprestimo.
     * @returns {Promise<boolean>} - Retorna `true` se o Emprestimo foi cadastrado com sucesso e `false` caso contrário.
      Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
      no console junto com os detalhes do erro.
     */
    static async cadastroEmprestimo(emprestimo: Emprestimo): Promise<boolean> {
        try {
            // query para fazer insert de um Emprestimo no banco de dados
            const queryInsertEmprestimo = `INSERT INTO emprestimo (id_livro, id_aluno, data_emprestimo, data_devolucao, status_emprestimo)
                                    VALUES
                                    ('${emprestimo.getIdLivro()}', 
                                    '${emprestimo.getIdAluno()}',
                                    '${emprestimo.getDataEmprestimo()}',
                                    '${emprestimo.getDataDevolucao()}',
                                    '${emprestimo.getStatusEmprestimo()}',
                                    )
                                    RETURNING id_emprestimo;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertEmprestimo);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Emprestimo cadastrado com sucesso! ID do Emprestimo: ${respostaBD.rows[0].id_emprestimo}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o Emprestimo. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }


    //MISAO ZÉ
    //pegar o nome do aluno e o titulo do livro pela listagem de empréstimo

    
    /**
         * Lista os empréstimos junto com o nome do aluno e o título do livro.
         * 
         * Este método faz um `JOIN` nas tabelas `emprestimo`, `aluno`, e `livro`
         * para retornar uma lista detalhada de empréstimos, incluindo o nome do aluno
         * e o título do livro.
         * 
         * @returns {Promise<Array<any> | null>} Lista de empréstimos com detalhes ou null em caso de erro.
         */

    static async listarEmprestimosComDetalhes(): Promise<Array<any> | null> {
        try {
            // Query SQL para buscar os empréstimos com nome do aluno e título do livro
            const query = `
            SELECT 
                e.id_emprestimo,
                e.id_aluno,
                a.nome AS nome_aluno,
                e.id_livro,
                l.titulo AS titulo_livro,
                e.data_emprestimo,
                e.data_devolucao,
                e.status_emprestimo
            FROM emprestimo e
            INNER JOIN aluno a ON e.id_aluno = a.id_aluno
            INNER JOIN livro l ON e.id_livro = l.id_livro;
        `;

            // Executar a query no banco de dados
            const respostaBD = await database.query(query);

            // Criar uma lista para armazenar os resultados formatados
            const listaEmprestimosDetalhada: Array<any> = [];

            // Processar os resultados
            respostaBD.rows.forEach((row: any) => {
                listaEmprestimosDetalhada.push({
                    idEmprestimo: row.id_emprestimo,
                    idAluno: row.id_aluno,
                    nomeAluno: row.nome_aluno,
                    idLivro: row.id_livro,
                    tituloLivro: row.titulo_livro,
                    dataEmprestimo: row.data_emprestimo,
                    dataDevolucao: row.data_devolucao,
                    statusEmprestimo: row.status_emprestimo
                });
            });

            // Retornar a lista detalhada
            return listaEmprestimosDetalhada;
        } catch (error) {
            console.log(`Erro ao listar empréstimos com detalhes: ${error}`);
            return null;
        }
    }

}