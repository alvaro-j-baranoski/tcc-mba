### Coisas para fazer:

- [ ] Fazer parte inicial do registro de riscos na API.
- [ ] Fazer parte inicial do front end.
- [ ] Testar integração usando o Render.

### Migrations
Para gerar uma nova migration, adicionar esse método na classe AppDbContext:

``csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=riscos_db;Username=seunome;Password=suasenha");
}
``

### Deploy do Projeto
Para fazer o deploy do projeto, inicialmente decidi fazer com o Render. Atualmente ele está para fazer o deploy manual e precisa habilitar os
serviços. Outras opções para deploy que da pra analisar futuramente são o Railway e o Fly.io.