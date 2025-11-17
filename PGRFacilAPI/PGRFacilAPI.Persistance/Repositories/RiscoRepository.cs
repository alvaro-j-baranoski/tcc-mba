using Dapper;
using Npgsql;
using PGRFacilAPI.Application.Interfaces;
using PGRFacilAPI.Domain.Models;

namespace PGRFacilAPI.Persistance.Repositories
{
    internal class RiscoRepository(string connectionString) : IRiscoRepository
    {
        private readonly string connectionString = connectionString;

        private const string createSQL = "";

        public async Task<Risco> Create(Risco risco)
        {
            using var connection = new NpgsqlConnection(connectionString);
            connection.Open();
            await connection.ExecuteAsync(createSQL, risco);
            return risco;
        }
    }
}
