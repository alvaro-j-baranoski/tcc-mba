### Coisas para fazer:

- [ ] Fazer parte inicial do front end.
	- [ ] Fazer parte dos relatórios.
- [ ] Implementar data da ultima atualização e número de riscos e área e versão.
	- Atualizar UI dos Riscos
	- Atualizar para poder clicar na linha inteira dos programas
- [ ] Implementar geração de uma nova versão do relatório.
- [ ] Implementar histórico de alterações do usuário (Event Sourcing).
- [ ] Implementar usuários que podem somente ver vs usuários que podem alterar os programas.
	- [ ] Implementar "programa atualização por..." na lista de programas do front
- [ ] Trocar tabela de risco por data table
- [ ] Implementar criar cópia de um risco
- [ ] Implementar importar e exportar para Excel e PDF.
- [ ] Implementar Refresh Token.
- [ ] Verificar como implementar OAuth2 + OIDC.
- [ ] Testar integração usando o Render.
- [ ] Adicionar uma seção de "Como Rodar Localmente" nesse README.

### Coisas para fazer:
- Seria interessante se os danos fossem reutilizáveis (adicionar eles e depois em um dropdown)?

### Migrations
Para gerar uma nova migration, primeiro é necessário rodar o PostreSQL dentro do container. 

Em seguida, adicione esse método na classe AppDbContext:

``csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=pgrfacildb;Username=postgres;Password=yourpassword");
}
``

E comente o comando de Migration que está em Program.cs.

Por ultimo, entre na pasta do projeto de persistance, e rode o seguinte comando:
``bash
dotnet ef migrations add IdentityInicial
dotnet ef database update
``

### Deploy do Projeto
Para fazer o deploy do projeto, inicialmente decidi fazer com o Render. Atualmente ele está para fazer o deploy manual e precisa habilitar os
serviços. Outras opções para deploy que da pra analisar futuramente são o Railway e o Fly.io.