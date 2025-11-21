### Coisas para fazer:

- [ ] Fazer parte inicial do front end.

### Migrations
Para gerar uma nova migration, adicionar esse método na classe AppDbContext:

``csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=riscos_db;Username=seunome;Password=suasenha");
}
``