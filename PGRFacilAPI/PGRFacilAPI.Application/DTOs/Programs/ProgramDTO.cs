namespace PGRFacilAPI.Application.DTOs.Programs
{
    public class ProgramDTO
    {
        public Guid Guid { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime UpdatedOn { get; set; }
        public int NumberOfRisks { get; set; }
        public Version Version { get; set; } = new Version();
    }
}
