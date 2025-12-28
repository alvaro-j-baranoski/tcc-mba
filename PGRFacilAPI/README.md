### Coisas para fazer:

- [ ] Fazer parte inicial do front end.
	- [ ] Fazer tela de home.
		- Se basear na UI do Excel/Whiteboard para mostrar os projetos
	- [ ] Fazer tela de criação/visualização de um programa.
	- [ ] Fazer formulário de criação/edição de um risco.
	- [ ] Fazer parte dos relatórios.
- [ ] Arrumar agentes de risco para vir como string ou enum
- [ ] Implementar register e logout
- [ ] Implementar "programa atualização por...", data da ultima atualização e número de riscos.
- [ ] Implementar geração de uma nova versão do relatório.
- [ ] Implementar histórico de alterações do usuário (Event Sourcing).
- [ ] Implementar usuários que podem somente ver vs usuários que podem alterar os programas.
- [ ] Verificar como implementar OAuth2 + OIDC.
- [ ] Implementar importar e exportar para Excel e PDF.
- [ ] Testar integração usando o Render.
- [ ] Adicionar uma seção de "Como Rodar Localmente" nesse README.

### Migrations
Para gerar uma nova migration, primeiro é necessário rodar o PostreSQL dentro do container. 

Em seguida, adicione esse método na classe AppDbContext:

``csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=riscos_db;Username=seunome;Password=suasenha");
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