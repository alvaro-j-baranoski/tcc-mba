### Migrations
Para gerar uma nova migration, primeiro é necessário rodar o PostreSQL dentro do container. 

Em seguida, descomente esse método na classe AppDbContext:

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