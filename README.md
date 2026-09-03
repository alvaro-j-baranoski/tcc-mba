# PGR Fácil
O PGR Fácil é um sistema web capaz de realizar o gerenciamento do PGR (Programas de Gerenciamento de Riscos) para empresas. Ele conta com funções para realizar o inventário e monitoramento de riscos, planos de ação e usuários. O sistema é composto por uma interface web desenvolvida em React, uma API RESTful desenvolvida em C#, e um banco de dados PostgreSQL.

## Como rodar localmente
As seções abaixo contém instruções de como rodar os componentes do sistema localmente. Primeiramente, clone o repositório.
```
git clone https://github.com/alvaro-j-baranoski/tcc-mba.git
cd tcc-mba
```

### API RESTful e banco de dados
A estrutura da API e banco de dados pode ser executada através do comando `docker compose up -d`. Para isso, a ferramenta [Docker](https://docs.docker.com/engine/install/) deve ser instalada.

```
cd PGRFacilAPI

docker compose up -d
```

Após a execução, os seguintes endereços ficarão disponíveis:
- API via HTTPS pela porta 8081;
- API via HTTP pela porta 8080;
- PostgreSQL pela porta 5432;

A conexão com o banco de dados local pode ser realizada utilizando o usuário `postgres` e a senha `yourpassword`. Estes valores devem ser modificados para o ambiente de produção através das variáveis de ambiente `POSTGRES_USER` e `POSTGRES_PASSWORD`.

### Interface web
A interface web do sistema pode ser executada através de comandos npm. Para isso, o [Node.js]() deve ser instalado localmente.

```
cd PGRFacil.UI

npm install

npm run dev
```

Após a execução, a interface web ficará disponível para acesso através da porta informada pelo comando npm.

Para realizar a integração com a API, é necessário informar o endereço HTTPS para as requisições. Este endereço deve ser definido pela variável de ambiente `VITE_API_URL`. Esta variável pode ser acessada através do arquivo .env.development localizado dentro da pasta PGRFacil.UI.

## API RESTful

### Autenticação

### Documentação (Swagger)

### Integração com base de dados

### Testes de integração

## Interface web

## Deploy em produção