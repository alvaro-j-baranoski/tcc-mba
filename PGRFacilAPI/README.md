Coisas para fazer:

- [ ] Ver estratégia para aplicar a migration do banco de dados.
- [ ] Finalizar CRUD básico.

### Migrations
Para gerar uma nova migration, adicionar esse método na classe AppDbContext:

``csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=riscos_db;Username=seunome;Password=suasenha");
}
``