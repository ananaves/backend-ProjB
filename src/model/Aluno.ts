import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um aluno
 */

export class Aluno {

    /* Atributos */
    /* Id do aluno */
    private idAluno: number = 0;
    /* ra do aluno */
    private ra: string = "";
    /* Nome do aluno */
    private nome: string;
    /* Sobrenome do aluno */
    private sobrenome: string;
    /* Data de nascimento do aluno */
    private dataNascimento: Date;
    /* email do aluno */
    private endereco: string;
    /* Email do aluno */
    private email: string;
    /* Celular do aluno */
    private celular: string;

    /**
     * Construtor da classe Aluno
     * 
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço do aluno
     * @param email Email do aluno
     * @param celular Celular do aluno
     */

    constructor(
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string

    ) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

    /* Método get e set */
    /**
     * Recupera o id do aluno
     * @returns o id do aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui um valor ao id do aluno
     * @param idAluno novo aluno a ser identificado
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o ra do aluno
     * @returns {string} O ra do aluno
     */
    public getRa(): string {
        return this.ra;
    }

    /** 
     * Define o ra do aluno
     * @param ra O ra do aluno a ser definido
     */
    public setRa(ra: string): void {
        this.ra = ra;
    }

    /**
     * Retorna o nome do aluno
     * @returns {string} O nome do aluno
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do aluno
     * @param nome O nome do aluno a ser definido
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o sobrenome do aluno
     * @returns {string} O sobrenome do aluno
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * Define o sobrenome do aluno
     * @param sobrenome O sobrenome do aluno a ser definido
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * Retorna a data de nascimento do aluno
     * @returns {Date} A data de nascimento do aluno
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     * Define a data de nascimento do aluno
     * @param dataNascimento A data de nascimento do aluno a ser definida
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    /**
     * Retorna o endereço do aluno
     * @returns {string} O endereço do aluno
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * Define o endereço do aluno
     * @param endereco O endereço do aluno a ser definido
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
    * Retorna o email do aluno
    * @returns {string} O email do aluno
    */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o email do aluno
     * @param email O email do aluno a ser definido
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
    * Retorna o celular do aluno
    * @returns {string} O celular do aluno
    */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * Define o celular do aluno
     * @param celular O celular do aluno a ser definido
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }
    /**
         * O método listarAluno executa uma consulta SQL para buscar todos os alunos da tabela Aluno no banco de dados.
         * @returns todos os alunos encontrados no banco de dados.
         */

    static async listarAluno(): Promise<Array<Aluno> | null> {

        let listaDeAluno: Array<Aluno> = [];

        try {

            const querySelectAluno = `SELECT * FROM aluno;`;

            const respostaBD = await database.query(querySelectAluno);

            respostaBD.rows.forEach((aluno) => {
                let novoAluno = new Aluno(
                    aluno.nome,
                    aluno.sobrenome,
                    aluno.data_nascimento,
                    aluno.endereco,
                    aluno.email,
                    aluno.celular
                );

                novoAluno.setIdAluno(aluno.id_aluno);
                novoAluno.setRa(aluno.ra);

                listaDeAluno.push(novoAluno);

            });

            return listaDeAluno;


        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    /**
     * Realiza o cadastro de um aluno no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Aluno` e insere seus dados (nome, sobrenome, data_nascimento, endereco, email, celular)
     * na tabela `aluno` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Aluno} aluno - Objeto contendo os dados do carro que será cadastrado. O objeto `Aluno`
     *                        deve conter os métodos `getNome()`, `getSobrenome()`, `getData_nascimento()`, `getEndereco()`, `getEmail()`, `getCelular()`
     *                        que retornam os respectivos valores do aluno.
     * @returns {Promise<boolean>} - Retorna `true` se o aluno foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            // query para fazer insert de um aluno no banco de dados
            const queryInsertAluno = `INSERT INTO aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                                    VALUES
                                    ('${aluno.getNome()}', 
                                    '${aluno.getSobrenome()}', 
                                    '${aluno.getDataNascimento()}',
                                    '${aluno.getEndereco()}', 
                                    '${aluno.getEmail()}', 
                                    '${aluno.getCelular()}'
                                    )
                                    RETURNING id_aluno;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertAluno);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do Aluno: ${respostaBD.rows[0].id_aluno}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o aluno. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }

    /*
        * Remove um aluno do banco de dados com base no ID fornecido.
        * 
        * Esta função executa uma query DELETE para excluir um aluno da tabela aluno no banco de dados.
        * Retorna true se a remoção for bem-sucedida (linhas afetadas) ou false caso contrário.
        * 
        * @param {number} idAluno - ID do aluno a ser removido.
        * @returns {Promise<boolean>} - Retorna true se o aluno foi removido com sucesso, false caso contrário.
        * 
        * @throws {Error} - Caso ocorra um erro na execução da query, ele será logado no console.
        */


    static async removerAluno(idAluno: number): Promise<boolean> {
        try {
            // Query para deletar o aluno pelo ID
            const queryDeleteAluno = `DELETE FROM Aluno WHERE id_aluno = ${idAluno}`;

            // Executa a query no banco de dados e armazena a resposta
            const respostaBD = await database.query(queryDeleteAluno);

            // Verifica se alguma linha foi afetada pela query (aluno encontrado e removido)
            if (respostaBD.rowCount != 0) {
                // Exibe mensagem de sucesso no console
                console.log(`Aluno removido com sucesso! ID removido: ${idAluno}`);
                return true; // Retorna true para indicar sucesso
            }

            // Retorna false se nenhuma linha foi afetada (aluno não encontrado)
            return false;
        } catch (error) {
            // Exibe uma mensagem de erro caso ocorra uma exceção
            console.log(`Erro ao remover aluno. Verifique os logs para mais detalhes`);
            // Loga o erro no console para depuração
            console.log(error);
            return false; // Retorna false para indicar falha na operação
        }
    }
        /**
     * Atualiza os dados de um aluno no banco de dados.
     * 
     * Esta função executa uma query UPDATE para atualizar os dados do aluno na tabela aluno.
     * Retorna true se a atualização for bem-sucedida (linhas afetadas) ou false caso contrário.
     * 
     * @param {aluno} aluno - Objeto contendo os dados do aluno a serem atualizados.
     * @returns {Promise<boolean>} - Retorna true se o aluno foi atualizado com sucesso, false caso contrário.
     * 
     * @throws {Error} - Caso ocorra um erro na execução da query, ele será logado no console.
     */
        static async atualizarAluno(aluno: Aluno): Promise<boolean> {
            try {
                // Query para atualizar os dados do aluno no banco de dados
                const queryUpdateAluno = `UPDATE Aluno SET
                                           nome = '${aluno.getNome()}', 
                                           sobrenome =  '${aluno.getSobrenome()}', 
                                           data_nascimento = '${aluno.getDataNascimento()}',
                                           endereco = '${aluno.getEndereco()}', 
                                           email = '${aluno.getEmail()}', 
                                           celular = '${aluno.getCelular()}'
                                           WHERE id_aluno = '${aluno.getIdAluno()}'`;
    
                // Executa a query no banco de dados e armazena a resposta
                const respostaBD = await database.query(queryUpdateAluno);
    
                // Verifica se alguma linha foi alterada pela query (atualização bem-sucedida)
                if (respostaBD.rowCount != 0) {
                    // Exibe uma mensagem de sucesso no console indicando que o aluno foi atualizado
                    console.log(`Aluno atualizado com sucesso! ID: ${aluno.getIdAluno()}`);
                    return true; // Retorna true para indicar sucesso na atualização
                }
    
                // Retorna false se nenhuma linha foi alterada (atualização não realizada)
                return false;
            } catch (error) {
                // Exibe uma mensagem de erro no console caso ocorra uma exceção
                console.log('Erro ao atualizar o aluno. Verifique os logs para mais detalhes.');
                // Loga o erro no console para depuração
                console.log(error);
                return false; // Retorna false para indicar falha na operação
            }
        }
}