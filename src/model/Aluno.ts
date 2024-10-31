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
    private ra: string;
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
     * @param ra Ra do aluno
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço do aluno
     * @param email Email do aluno
     * @param celular Celular do aluno
     */

    constructor(
        ra: string,
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string

    ){
        this.ra = ra;
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
    public getIdAluno():number{
        return this.idAluno;
    }

    /**
     * Atribui um valor ao id do aluno
     * @param idAluno novo aluno a ser identificado
     */
    public setIdAluno (idAluno: number): void{
        this.idAluno;
    }

    /**
     * Retorna o ra do aluno
     * @returns {string} O ra do aluno
     */
    public getRa(): string{
        return this.ra;
    }

    /** 
     * Define o ra do aluno
     * @param ra O ra do aluno a ser definido
     */
    public setRa (ra:string): void{
        this.ra = ra;
    }

    /**
     * Retorna o nome do aluno
     * @returns {string} O nome do aluno
     */
    public getNome():string{
        return this.nome;
    }

    /**
     * Define o nome do aluno
     * @param nome O nome do aluno a ser definido
     */
    public setNome(nome:string): void{
        this.nome = nome;
    }

    /**
     * Retorna o sobrenome do aluno
     * @returns {string} O sobrenome do aluno
     */
    public getSobrenome(): string{
        return this.sobrenome;
    }

    /**
     * Define o sobrenome do aluno
     * @param sobrenome O sobrenome do aluno a ser definido
     */
    public setSobrenome(sobrenome:string): void{
        this.sobrenome = sobrenome;
    }

    /**
     * Retorna a data de nascimento do aluno
     * @returns {Date} A data de nascimento do aluno
     */
    public getDataNascimento(): Date{
        return this.dataNascimento;
    }

    /**
     * Define a data de nascimento do aluno
     * @param dataNascimento A data de nascimento do aluno a ser definida
     */
    public setDataNascimento(dataNascimento: Date): void{
        this.dataNascimento = dataNascimento;
    }

    /**
     * Retorna o endereço do aluno
     * @returns {string} O endereço do aluno
     */
    public getEndereco(): string{
        return this.endereco;
    }

    /**
     * Define o endereço do aluno
     * @param endereco O endereço do aluno a ser definido
     */
    public setEndereco(endereco: string): void{
        this.endereco = endereco;
    }

     /**
     * Retorna o email do aluno
     * @returns {string} O email do aluno
     */
     public getEmail(): string{
        return this.email;
    }

    /**
     * Define o email do aluno
     * @param email O email do aluno a ser definido
     */
    public setEmail(email: string): void{
        this.email = email;
    }

     /**
     * Retorna o celular do aluno
     * @returns {string} O celular do aluno
     */
     public getCelular(): string{
        return this.celular;
    }

    /**
     * Define o celular do aluno
     * @param celular O celular do aluno a ser definido
     */
    public setCelular(celular: string): void{
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

        respostaBD.rows.forEach((aluno: any) => {
            let novoAluno = new Aluno(
                aluno.ra,
                aluno.nome,
                aluno.sobrenome,
                aluno.data_nascimento,
                aluno.endereco,
                aluno.email,
                aluno.celular,
            );

            novoAluno.setIdAluno(aluno.id);

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
        const queryInsertAluno = `INSERT INTO aluno (nome, sobrenome, data_nascimento, enderoco, email, celular)
                                    VALUES
                                    ('${aluno.getNome()}', 
                                    '${aluno.getSobrenome()}', 
                                    '${aluno.getDataNascimento()}',
                                    '${aluno.getEndereco()}', 
                                    '${aluno.getEmail()}', 
                                    '${aluno.getCelular()}', )
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
}