using System.ComponentModel.DataAnnotations.Schema;

namespace PGRFacilAPI.Domain.Models
{
    public class Programa
    {
        public Guid Guid { get; set; } = Guid.NewGuid();
        public required string Nome { get; set; }
        public DateTime AtualizadoEm { get; set; }
        public ICollection<Risco> Riscos { get; set; } = [];
        
        /// <summary>
        /// Gets the number of Riscos for this program.
        /// </summary>
        /// <remarks>
        /// This is being stored here so that we don't need to query the
        /// database for all of the Riscos, just the count.
        /// </remarks>
        [NotMapped]
        public int NumeroDeRiscos { get; set; }

        public string? UsuarioID { get; set; }
        public User? Usuario { get; set; }
    }
}
