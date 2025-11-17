using PGRFacilAPI.Domain.Enums;

namespace PGRFacilAPI.Domain.Models
{
    public class Risco
    {
        public Guid Guid { get; private set; }
        public string Local { get; private set; }
        public string Atividades { get; private set; }
        public string Perigos { get; private set; }
        public string Danos { get; private set; }
        public AgentesDeRisco AgentesDeRisco { get; private set; }
        public string TipoDeAvaliacao { get; private set; }
        public uint Severidade { get; private set; }
        public uint Probabilidade { get; private set; }

        public Risco(
            string local, 
            string atividades, 
            string perigos, 
            string danos, 
            AgentesDeRisco agentesDeRisco, 
            string tipoDeAvaliacao,
            uint severidade,
            uint probabilidade)
        {
            Guid = Guid.NewGuid();
            Local = local;
            Atividades = atividades;
            Perigos = perigos;
            Danos = danos;
            AgentesDeRisco = agentesDeRisco;
            TipoDeAvaliacao = tipoDeAvaliacao;
            Severidade = severidade;
            Probabilidade = probabilidade;

            Console.WriteLine("heellouu");
        }
    }
}
