import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um livro
 */
export class Livro {

    /* Atributos */
    /* Id do livro */
    private idLivro: number = 0;
    /* Título do livro */
    private titulo: string;
    /* Autor do livro */
    private autor: string;
    /* Editora do livro */
    private editora: string;
    /* Ano de publicação do livro */
    private anoPublicacao: string;
    /* ISBN do livro */
    private isbn: string;
    /* Quantidade total de exemplares do livro */
    private quantTotal: number;
    /* Quantidade disponível para empréstimo */
    private quantDisponivel: number;
    /* Valor de aquisição do livro */
    private valorAquisicao: number;
    /* Status do livro emprestado */
    private statusLivroEmprestado: string;

    /**
     * Construtor da classe Livro
     * 
     * @param titulo Título do livro
     * @param autor Autor do livro
     * @param editora Editora do livro
     * @param anoPublicacao Ano de publicação do livro
     * @param isbn ISBN do livro
     * @param quantTotal Quantidade total de exemplares
     * @param quantDisponivel Quantidade disponível para empréstimo
     * @param valorAquisicao Valor de aquisição do livro
     * @param statusLivroEmprestado Status do livro emprestado
     */
    constructor(
        titulo: string,
        autor: string,
        editora: string,
        anoPublicacao: string,
        isbn: string,
        quantTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        statusLivroEmprestado: string
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.isbn = isbn;
        this.quantTotal = quantTotal;
        this.quantDisponivel = quantDisponivel;
        this.valorAquisicao = valorAquisicao;
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

    /* Métodos get e set */
    /**
     * Recupera o id do livro
     * @returns o id do livro
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Atribui um valor ao id do livro
     * @param idLivro novo id do livro a ser identificado
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro;
    }

    /**
     * Retorna o título do livro
     * @returns {string} O título do livro
     */
    public getTitulo(): string {
        return this.titulo;
    }

    /**
     * Define o título do livro
     * @param titulo O título do livro a ser definido
     */
    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    /**
     * Retorna o autor do livro
     * @returns {string} O autor do livro
     */
    public getAutor(): string {
        return this.autor;
    }

    /**
     * Define o autor do livro
     * @param autor O autor do livro a ser definido
     */
    public setAutor(autor: string): void {
        this.autor = autor;
    }

    /**
     * Retorna a editora do livro
     * @returns {string} A editora do livro
     */
    public getEditora(): string {
        return this.editora;
    }

    /**
     * Define a editora do livro
     * @param editora A editora do livro a ser definida
     */
    public setEditora(editora: string): void {
        this.editora = editora;
    }

    /**
     * Retorna o ano de publicação do livro
     * @returns {string} O ano de publicação do livro
     */
    public getAnoPublicacao(): string {
        return this.anoPublicacao;
    }

    /**
     * Define o ano de publicação do livro
     * @param anoPublicacao O ano de publicação do livro a ser definido
     */
    public setAnoPublicacao(anoPublicacao: string): void {
        this.anoPublicacao = anoPublicacao;
    }

    /**
     * Retorna o ISBN do livro
     * @returns {string} O ISBN do livro
     */
    public getIsbn(): string {
        return this.isbn;
    }

    /**
     * Define o ISBN do livro
     * @param isbn O ISBN do livro a ser definido
     */
    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    /**
     * Retorna a quantidade total de exemplares do livro
     * @returns {number} A quantidade total de exemplares
     */
    public getQuantTotal(): number {
        return this.quantTotal;
    }

    /**
     * Define a quantidade total de exemplares do livro
     * @param quantTotal A quantidade total de exemplares a ser definida
     */
    public setQuantTotal(quantTotal: number): void {
        this.quantTotal = quantTotal;
    }

    /**
     * Retorna a quantidade disponível para empréstimo
     * @returns {number} A quantidade disponível para empréstimo
     */
    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }

    /**
     * Define a quantidade disponível para empréstimo
     * @param quantDisponivel A quantidade disponível a ser definida
     */
    public setQuantDisponivel(quantDisponivel: number): void {
        this.quantDisponivel = quantDisponivel;
    }

    /**
     * Retorna o valor de aquisição do livro
     * @returns {number} O valor de aquisição do livro
     */
    public getValorAquisicao(): number {
        return this.valorAquisicao;
    }

    /**
     * Define o valor de aquisição do livro
     * @param valorAquisicao O valor de aquisição a ser definido
     */
    public setValorAquisicao(valorAquisicao: number): void {
        this.valorAquisicao = valorAquisicao;
    }

    /**
     * Retorna o status do livro emprestado
     * @returns {string} O status do livro emprestado
     */
    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }

    /**
     * Define o status do livro emprestado
     * @param statusLivroEmprestado O status do livro a ser definido
     */
    public setStatusLivroEmprestado(statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = statusLivroEmprestado;
    }
    /**
         * O método listarLivro executa uma consulta SQL para buscar todos os livros da tabela livro no banco de dados.
         * @returns todos os carros encontrados no banco de dados.
         */
    static async listarLivro(): Promise<Array<Livro> | null> {

        let listaDeLivro: Array<Livro> = [];

        try {

            //query de consulta no banco de dados
            const querySelectLivro = `SELECT * FROM livro;`;


            const respostaBD = await database.query(querySelectLivro);

 
            respostaBD.rows.forEach((livro: any) => {
                let novoLivro = new Livro(
                    livro.titulo,
                    livro.autor,
                    livro.editora,
                    livro.ano_publicacao,
                    livro.isbn,
                    livro.quant_total,
                    livro.quant_disponivel,
                    livro.valor_aquisicao,
                    livro.status_livro_emprestado

                );

                //atribuir objeito
                novoLivro.setIdLivro(livro.id_livro);

                //adicionar o objeto na lista
                listaDeLivro.push(novoLivro);

            });

            return listaDeLivro;


        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    /**
     * Realiza o cadastro de um livro no banco de dados.
     * 
     * Esta função recebe um objeto do tipo `Livro` e insere seus dados (titulo, autor, aditora, 
     * anoPublicacao, isbn, quantTotal, quantDisponivel, valorAquisicao, statusLivroEmprestado)
     * na tabela `livro` do banco de dados. O método retorna um valor booleano indicando se o cadastro 
     * foi realizado com sucesso.
     * 
     * @param {Livro} livro - Objeto contendo os dados do livro que será cadastrado. O objeto `Livro`
     *                        deve conter os métodos `getTitulo()`, `getAutor()`, `getEditora()`, `getAnoPublicacao()`,
     *                        `getIsbn()`, `getQuantTotal()`, `getQuantDisponivel()`, `getValorAquisicao()`, `getStatusLivroEmprestado()`
     *                        que retornam os respectivos valores do livro.
     * @returns {Promise<boolean>} - Retorna `true` se o livro foi cadastrado com sucesso e `false` caso contrário.
     *                               Em caso de erro durante o processo, a função trata o erro e retorna `false`.
     * 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
    static async cadastroLivro(livro: Livro): Promise<boolean> {
        try {
            // query para fazer insert de um livro no banco de dados
            const queryInsertLivro = `INSERT INTO livro (titulo, autor, editora, 
                                     ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestimo)
                                    VALUES
                                    ('${livro.getTitulo()}', 
                                    '${livro.getAutor()}',
                                    '${livro.getEditora()}',
                                    '${livro.getAnoPublicacao()}',
                                    '${livro.getIsbn()}',
                                    '${livro.getQuantTotal()}',
                                    '${livro.getQuantDisponivel()}',
                                    '${livro.getValorAquisicao()}',
                                    '${livro.getStatusLivroEmprestado()}'
                                   )
                                    RETURNING id_livro;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertLivro);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Livro cadastrado com sucesso! ID do Livro: ${respostaBD.rows[0].id_livro}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o livro. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}

