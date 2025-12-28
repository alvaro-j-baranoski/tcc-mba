### Coisas para fazer:

- [ ] Fazer parte inicial do front end.
	- [ ] Fazer tela de home.
		- Se basear na UI do Excel/Whiteboard para mostrar os projetos
	- [ ] Fazer tela de criação/visualização de um programa.
	- [ ] Fazer formulário de criação/edição de um risco.
	- [ ] Fazer parte dos relatórios.
- [ ] Implementar signficância do risco
- [ ] Arrumar agentes de risco para vir como string ou enum
- [ ] Implementar criar cópia de um risco
- [ ] Implementar register e logout
- [ ] Implementar "programa atualização por...", data da ultima atualização e número de riscos e área e versão.
- [ ] Implementar geração de uma nova versão do relatório.
- [ ] Implementar histórico de alterações do usuário (Event Sourcing).
- [ ] Implementar usuários que podem somente ver vs usuários que podem alterar os programas.
- [ ] Implementar importar e exportar para Excel e PDF.
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