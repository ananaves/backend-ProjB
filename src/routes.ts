import { Request, Response, Router } from "express";
import { AlunoController } from "./controller/AlunoController";
import { LivroController } from "./controller/LivroController";
import { EmprestimoController } from "./controller/EmprestimoController";


// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA LIVROS
*/ 
// Rota para listar os livros
router.get("/lista/livro", LivroController.todos);
// Rota para adicionar livros
router.post("/novo/livro", LivroController.novo);
// Rota para deletar livro
router.delete("/delete/livro/:idLivro", LivroController.remover);
// Rota para atualizar livro
router.put("/atualizar/livro/:idLivro", LivroController.atualizar);

/* 
* ROTAS PARA ALUNOS
*/ 
// Rota para listar os alunos
router.get("/lista/aluno", AlunoController.todos);
// Rota para adicionar alunos
router.post("/novo/aluno", AlunoController.novo);
// Rota para deletar alunos
router.delete("/delete/aluno/:idAluno", AlunoController.remover);
// Rota para atualizar alunos
router.put("/atualizar/aluno/:idAluno", AlunoController.atualizar);

/* 
* ROTAS PARA EMPRESTIMOS
*/ 
// Rota para listar os emprestimos
router.get("/lista/emprestimo", EmprestimoController.todos);
// Rota para adicionar emprestimo
router.post("/novo/emprestimo", EmprestimoController.novo);
// Rora para atualizar emprestimo
router.put("/atualizar/emprestimo/:idEmprestimo", EmprestimoController.atualizar);

// exportando as rotas
export { router };