
# Sistema de Agendamento de Consultas

Este projeto é um sistema de agendamento de consultas médicas, desenvolvido com Node.js e MongoDB. O sistema permite que os usuários cadastrem consultas, visualizem as consultas agendadas, pesquisem por consultas específicas e recebam notificações por e-mail antes das consultas ocorrerem.

## Funcionalidades

- **Cadastro de Consultas**: Permite o cadastro de consultas com informações como nome, e-mail, descrição, CPF, data e hora.
- **Visualização de Consultas**: Exibe uma lista de consultas agendadas e um calendário com as consultas.
- **Pesquisa de Consultas**: Permite a busca de consultas pelo e-mail ou CPF do paciente.
- **Notificações por E-mail**: Envia um e-mail de notificação ao paciente uma hora antes da consulta.
- **Finalização de Consultas**: Permite marcar consultas como finalizadas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework para Node.js utilizado para criar a aplicação web.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados das consultas.
- **Mongoose**: Biblioteca ODM para MongoDB e Node.js.
- **Nodemailer**: Biblioteca para envio de e-mails.
- **EJS**: Template engine para geração de páginas HTML.
- **FullCalendar**: Biblioteca JavaScript para exibição de calendários interativos.

## Instalação

### Pré-requisitos

- Node.js e npm instalados.
- MongoDB rodando localmente.

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/AlfredoLSN/Agendamento
   cd Agendamento
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o MongoDB:
   Certifique-se de que o MongoDB está rodando em `mongodb://localhost:27017/agendamento`.

4. Inicie o servidor:
   ```bash
   npm start
   ```

5. Acesse a aplicação em `http://localhost:8080`.

## Uso

### Cadastro de Consultas

Para cadastrar uma nova consulta, acesse `/cadastro` e preencha o formulário com as informações necessárias.

### Visualização de Consultas

As consultas podem ser visualizadas na página inicial (`/`) em formato de calendário ou em lista na página `/list`.

### Pesquisa de Consultas

Pesquise consultas por e-mail ou CPF através da página `/list`.

### Notificações

Notificações por e-mail serão enviadas automaticamente uma hora antes da consulta.

## Estrutura do Projeto

- **factories**: Contém o `AppointmentFactory`, responsável por construir objetos de consulta a partir de dados simples.
- **models**: Contém o modelo Mongoose `Appointment`.
- **services**: Contém o serviço `AppointmentService`, que lida com a lógica de negócios, como criação e consulta de agendamentos.
- **views**: Contém os templates EJS usados para renderizar as páginas HTML.
- **index.js**: Arquivo principal que configura e inicia a aplicação.

