/**
 * Classe que representa um empréstimo
 */

export class Emprestimos {

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
    ){
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
    public getIdEmprestimo():number{
        return this.idEmprestimo;
    }

    /**
     * Atribui um valor ao id do emprestimo
     * @param idEmprestimo novo emprestimo a ser identificado
     */
    public setIdEmprestimo (idEmprestimo: number): void{
        this.idEmprestimo;
    }

    /**
     * Retorna o id do Aluno
     * @returns {number} O id do Aluno 
     */
    public getIdAluno(): number{
        return this.idAluno;
    }

    /** 
     * Define o id do Aluno 
     * @param idAluno O id do Aluno a ser definido
     */
    public setIdAluno (idAluno:number): void{
        this.idAluno = idAluno;
    }

    /**
     * Retorna o id do Livro 
     * @returns {number} O id do Livro 
     */
    public getIdLivro():number{
        return this.idLivro;
    }

    /**
     * Define o id do Livro 
     * @param idLivro O id do Livro a ser definido
     */
    public setIdLivro(idLivro:number): void{
        this.idLivro = idLivro;
    }

    /**
     * Retorna a data do emprestimo
     * @returns {Date} A data do emprestimo
     */
    public getDataEmprestimo(): Date{
        return this.dataEmprestimo;
    }

    /**
     * Define a data do emprestimo
     * @param dataEmprestimo A data do emprestimo a ser definido
     */
    public setDataEmprestimo(dataEmprestimo:Date): void{
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Retorna a data de devolucao do emprestimo
     * @returns {Date} A data de devolucao do emprestimo
     */
    public getDataDevolucao(): Date{
        return this.dataDevolucao;
    }

    /**
     * Define a data de devolucao do emprestimo
     * @param dataDevolucao A data de devolucao do emprestimo a ser definida
     */
    public setDataDevolucao(dataDevolucao: Date): void{
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * Retorna a status do emprestimo
     * @returns {Date} A status do emprestimo
     */
    public getStatusEmprestimo(): Date{
        return this.statusEmprestimo;
    }

    /**
     * Define a status do emprestimo
     * @param statusEmprestimo A status do emprestimo a ser definido
     */
    public setStatusEmprestimo(statusEmprestimo:Date): void{
        this.statusEmprestimo = statusEmprestimo;
    }

}