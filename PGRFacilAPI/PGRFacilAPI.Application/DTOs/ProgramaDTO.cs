namespace PGRFacilAPI.Application.DTOs
{
    public class ProgramaDTO
    {
        public Guid Guid { get; set; }
        public string Nome { get; set; } = string.Empty;
        public DateTime AtualizadoEm { get; set; }
        public int NumeroDeRiscos { get; set; }
        public Version Versao { get; set; } = new Version();
    }
}
