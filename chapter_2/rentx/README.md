Os requisitos funcionais e as regras de negocio trabalham juntos


# Cadastro de carro
**Requisitos Funcionais** 
Deve ser possível cadastrar um novo carro.

**Requisitos Não Funcionais**
N/A

**Regras de Negocio**
Não deve ser possível cadastrar um carro com uma placa já existente.
O Carro deve ser cadastrado por padrão com disponibilidade.
* O usuário responsável pelo cadastro deve ser um usuário administrador.


# Listagem de carros
**Requisitos Funcionais** 
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros pelo nome da categoria.
Deve ser possível listar todos os carros pelo nome da marca.
Deve ser possível listar todos os carros pelo nome do carro.

**Requisitos Não Funcionais**
N/A

**Regras de Negocio**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro
**Requisitos Funcionais** 
Deve ser possível cadastrar uma especificação para um carro.


**Requisitos Não Funcionais**
N/A

**Regras de Negocio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens carro
**Requisitos Funcionais** 
Deve ser possível cadastrar a imagem para o carro.

**Requisitos Não Funcionais**
Utilizar o multer para upload dos arquivos.

**Regras de Negocio**
O Usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.


# Aluguel de carro
**Requisitos Funcionais** 
Deve ser possível cadastrar um aluguel.

**Requisitos Não Funcionais**
N/A

**Regras de Negocio**
O Aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

# TODO
**Upload de Images**
Funcionalidade de deletar/alterar imagem do carro.
