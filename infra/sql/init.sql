/*
-- Drop da trigger
DROP TRIGGER IF EXISTS trg_gerar_ra ON Aluno;

-- Drop da função
DROP FUNCTION IF EXISTS gerar_ra();

-- Drop da tabela Emprestimo
DROP TABLE IF EXISTS Emprestimo;

-- Drop da tabela Livro
DROP TABLE IF EXISTS Livro;

-- Drop da tabela Aluno
DROP TABLE IF EXISTS Aluno;

-- Drop da sequência
DROP SEQUENCE IF EXISTS seq_ra;
*/
-- CREATE ALUNO - TRIGGER - FUNCTION

CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();


-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestimo VARCHAR (20)
);


-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);


-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');


INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Harry', 'Potter', '1990-07-31', 'Rua Hogwarts, 7', 'harry.potter@hogwarts.com', '16991234567'),
('Katniss', 'Everdeen', '1998-05-08', 'Rua Distrito 12, 3', 'katniss@panem.com', '16992345678'),
('Jack', 'Dawson', '1985-12-14', 'Rua Titanic, 1912', 'jack.dawson@titanic.com', '16993456789'),
('Tris', 'Prior', '2000-03-15', 'Rua Divergente, 1', 'tris.prior@divergente.com', '16994567890'),
('Hermione', 'Granger', '1991-09-19', 'Rua Hogwarts, 12', 'hermione.granger@hogwarts.com', '16995678901'),
('Peeta', 'Mellark', '1997-08-02', 'Rua Distrito 12, 4', 'peeta@panem.com', '16996789012'),
('Rose', 'DeWitt', '1986-04-10', 'Rua Titanic, 1912', 'rose.dewitt@titanic.com', '16997890123'),
('Four', 'Eaton', '1999-06-16', 'Rua Divergente, 5', 'four.eaton@divergente.com', '16998901234'),
('Ron', 'Weasley', '1990-03-01', 'Rua Hogwarts, 9', 'ron.weasley@hogwarts.com', '16991012345'),
('Gale', 'Hawthorne', '1997-11-22', 'Rua Distrito 12, 2', 'gale@panem.com', '16992123456');



-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestimo) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestimo) 
VALUES 
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Rocco', '1997', '978-0439708180', 15, 15, 120.00, 'Disponível'),
('Jogos Vorazes', 'Suzanne Collins', 'Rocco', '2008', '978-0439023528', 10, 9, 85.00, 'Emprestado'),
('O Nome do Vento', 'Patrick Rothfuss', 'Arqueiro', '2007', '978-0575081406', 8, 7, 100.00, 'Emprestado'),
('Duna', 'Frank Herbert', 'Aleph', '1965', '978-0441172719', 12, 10, 95.00, 'Disponível'),
('Corte de Espinhos e Rosas', 'Sarah J. Maas', 'Galera Record', '2015', '978-1619635180', 9, 9, 110.00, 'Disponível'),
('O Problema dos Três Corpos', 'Cixin Liu', 'Suma', '2008', '978-0765382030', 7, 6, 130.00, 'Emprestado'),
('Mistborn: O Império Final', 'Brandon Sanderson', 'Leya', '2006', '978-0765311788', 10, 10, 150.00, 'Disponível'),
('A Torre Negra: O Pistoleiro', 'Stephen King', 'Suma', '1982', '978-0451210845', 6, 5, 80.00, 'Emprestado'),
('O Ciclo da Herança: Eragon', 'Christopher Paolini', 'Rocco', '2003', '978-0375826689', 8, 8, 95.00, 'Disponível'),
('Fundação', 'Isaac Asimov', 'Aleph', '1951', '978-0553293357', 5, 5, 140.00, 'Disponível');


-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');


INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(13, 14, '2024-10-01', '2024-10-15', 'Concluído'),
(11, 15, '2024-10-02', '2024-10-16', 'Aguardando devolução'),
(12, 16, '2024-10-03', '2024-10-17', 'Em atraso'),
(14, 11, '2024-10-04', '2024-10-18', 'Concluído'),
(15,17, '2024-10-05', '2024-10-19', 'Aguardando devolução'),
(16, 13, '2024-10-06', '2024-10-20', 'Em andamento'),
(17, 18, '2024-10-07', '2024-10-21', 'Concluído'),
(18, 12, '2024-10-08', '2024-10-22', 'Em atraso'),
(20, 19, '2024-10-09', '2024-10-23', 'Aguardando devolução'),
(19, 20, '2024-10-10', '2024-10-24', 'Em andamento'),
(12, 19, '2024-10-11', '2024-10-25', 'Concluído'),
(14, 18, '2024-10-11', '2024-10-25', 'Aguardando devolução'),
(11, 16, '2024-10-11', '2024-10-25', 'Em atraso'),
(13, 15, '2024-10-11', '2024-10-25', 'Concluído');


SELECT 
    a.ra, 
    a.nome, 
    a.sobrenome, 
    a.celular, 
    l.titulo, 
    l.autor, 
    l.editora, 
    e.data_emprestimo, 
    e.data_devolucao, 
    e.status_emprestimo
FROM 
    Emprestimo e
JOIN 
    Aluno a ON e.id_aluno = a.id_aluno
JOIN 
    Livro l ON e.id_livro = l.id_livro;

SELECT * FROM Aluno;
SELECT * FROM Livro;
SELECT * FROM Emprestimo;
