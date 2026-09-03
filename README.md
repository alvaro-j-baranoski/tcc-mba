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
A API RESTful foi desenvolvida utilizando o framework [ASP.NET](https://dotnet.microsoft.com/en-us/apps/aspnet) e procura seguir os padrões estabelecidos pela [Arquitetura Limpa](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) de separação de camadas de códigos e isolamento de regras de negócio. 

### Autenticação e autorização
A API conta com sistemas de autenticação e autorização construidos utilizando o [Identity Framework](https://learn.microsoft.com/pt-br/aspnet/core/security/authentication/identity) do ASP.NET. A autenticação é feita utilizando como base um JWT, que é retornado após a requisição à rota `/API/Usuarios/Login` bem-sucedida. Para ter acesso às demais rotas, este token deve ser incluído em requisições subsequentes no cabeçalho HTTP "Authorization". Requisições para rotas sem a devida autenticação retornarão o erro "401 – Unauthorized".

O sistema também conta com diferentes roles que são atribuidas aos usuários cadastrados. Quando um usuário cria uma conta através da rota `/API/Usuarios/Registrar`, ele recebe a role de `Reader`, que dá acesso as rotas de consulta. Um usuário também pode possuir a role de `Editor`, que dá acesso as demais rotas de modificação de dados.

Durante a inicialização do sistema, é possível criar um usuário "admin" da seguinte maneira:
1. Crie um usuário padrão através da rota `/API/Usuarios/Registrar`;
2. No banco de dados, localize o usuário cadastrado na tabela `AspNetUsers` e copie seu `Id`;
3. Na tabela `AspNetRoles`, copie o `Id` da role `Editor`;
4. Na tabela `AspNetUserRoles`, adicione uma nova linha e preencha os valores de `UserId` e `RoleId` com os valores copiados previamente.

### Documentação (Swagger)
A documentação completa da API pode ser acessada em `https://localhost:8081/swagger/index.html`.

### Integração com base de dados
A integração com o PostgreSQL é feita através do [Entity Framework](https://learn.microsoft.com/pt-br/ef/core/), que é um ORM que facilita a consulta ao banco de dados. Quando a API é iniciada, um comando de migration é executado para atualizar as tabelas do banco de dados. O processo de criação de uma nova migration está documentado [aqui](https://github.com/alvaro-j-baranoski/tcc-mba/blob/main/PGRFacilAPI/README.md). 

### Testes de integração
A API conta com 33 testes de integração, avaliando todas as rotas externas e operações com o banco de dados. O [Insomnia](https://insomnia.rest/) é utilizado para executar os testes, e os mesmos podem ser importados através do arquivo .yaml presente na pasta Insomnia deste repositório.
<img width="1280" height="678" alt="insomnia-tests" src="https://github.com/user-attachments/assets/9fb19920-8104-4380-a4ab-581f5374d314" />

## Interface web
A interface web deste sistema é uma SPA (Single Page Application) desenvolvida com React e TypeScript. A estilização foi feita utilizando o [shadcn](https://ui.shadcn.com/) como system design. A navegação entre páginas foi feita com o [react-router-dom](https://www.npmjs.com/package/react-router-dom). Por fim, as requisições HTTPS à API foram feitas com o auxílio da biblioteca [react-query](https://tanstack.com/query/latest/docs/framework/react/overview).
<img width="1280" height="596" alt="login" src="https://github.com/user-attachments/assets/e41843a8-de0e-401a-aef3-3bca6a441c90" />
<img width="1280" height="595" alt="ghes" src="https://github.com/user-attachments/assets/4a61b08e-e891-410a-9002-34dabfa23a77" />
<img width="1278" height="596" alt="riscos" src="https://github.com/user-attachments/assets/640846b0-0265-4e13-a070-a9590fa1562c" />
<img width="1279" height="595" alt="matriz" src="https://github.com/user-attachments/assets/e9d3328e-c510-4578-a804-960eaebc2027" />
<img width="1280" height="595" alt="perigos" src="https://github.com/user-attachments/assets/ab4d1c37-a948-4e77-b29f-9a577e3b38d4" />
<img width="1280" height="594" alt="danos" src="https://github.com/user-attachments/assets/ceda029a-a3a5-41a3-b2d5-4418a86280e1" />
<img width="1280" height="593" alt="usuarios" src="https://github.com/user-attachments/assets/062c6b9c-979d-43ad-b616-97107ab535fc" />