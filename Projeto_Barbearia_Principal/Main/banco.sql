CREATE DATABASE barbearia;
USE barbearia;

-- Tabela Usuario
CREATE TABLE Usuario (
    id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(45) NOT NULL,
    Email VARCHAR(45) UNIQUE NOT NULL,
    Senha VARCHAR(45) NOT NULL
);

-- Tabela Barbeiro
CREATE TABLE Barbeiro (
    id_Barbeiro INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(45) NOT NULL,
    Email VARCHAR(45) UNIQUE NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE
);

-- Tabela Servico
CREATE TABLE Servico (
    id_Servico INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(45) NOT NULL,
    Descricao VARCHAR(45),
    Preco DECIMAL(10,2) NOT NULL
);

-- Tabela Disponibilidade
CREATE TABLE Disponibilidade (
    id_Disponibilidade INT AUTO_INCREMENT PRIMARY KEY,
    id_Barbeiro INT NOT NULL,
    dia_semana ENUM('Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    
    FOREIGN KEY (id_Barbeiro) REFERENCES Barbeiro(id_Barbeiro)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabela Agendamento
CREATE TABLE Agendamento (
    id_Agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_Usuario INT NOT NULL,
    id_Barbeiro INT NOT NULL,
    data_hora DATETIME NOT NULL,
    status ENUM('Pendente','Confirmado','Cancelado','Concluido') DEFAULT 'Pendente',

    FOREIGN KEY (id_Usuario) REFERENCES Usuario(id_Usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (id_Barbeiro) REFERENCES Barbeiro(id_Barbeiro)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Tabela intermediária (N:N)
CREATE TABLE Agendamento_Servico (
    id_Agendamento_Servico INT AUTO_INCREMENT PRIMARY KEY,
    id_Agendamento INT NOT NULL,
    id_Servico INT NOT NULL,

    FOREIGN KEY (id_Agendamento) REFERENCES Agendamento(id_Agendamento)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (id_Servico) REFERENCES Servico(id_Servico)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);