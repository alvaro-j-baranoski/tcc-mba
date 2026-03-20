using PGRFacilAPI.Application.Exceptions;
using PGRFacilAPI.Application.Ghe;
using PGRFacilAPI.Application.Shared;
using PGRFacilAPI.Domain.Enums;
using PGRFacilAPI.Domain.Models;
using System.Reflection;

namespace PGRFacilAPI.Application.Risco.RiscoGetAll
{
    public class RiscoGetAllUseCase(IGheRepository gheRepository, IRiscoRepository riscoRepository)
    {
        public async Task<RiscoGetAllOutputDto> Execute(RiscoGetAllInputDto input)
        {
            PropertyInfo? sortBy = ValidateSortByParameter(input.SortBy);
            NivelSignificancia? nivelSignificancia = ValidateNivelSignificanciaParameter(input.NivelSignificancia);
            AgentesDeRisco? agente = ValidateAgentesParameter(input.Agentes);

            var queryParameters = new RiscoGetAllQueryParameters(input.Start, input.Limit, input.SortDirection, sortBy);
            var filterParameters = new RiscoGetAllFilterParameters(input.Local, input.Atividades, agente, input.TipoDeAvaliacao, input.MinSeveridade,
                input.MaxSeveridade, input.Severidade, input.MinProbabilidade, input.MaxProbabilidade, input.Probabilidade, input.MinSignificancia,
                input.MaxSignificancia, input.Significancia, nivelSignificancia);

            GetAllRepositoryResult<RiscoEntity> result;

            if (input.GheId.HasValue)
            {
                // Checks if GHE exists
                await gheRepository.GetById(input.GheId.Value);
            }

            result = await riscoRepository.GetAll(input.GheId, queryParameters, filterParameters);
            IEnumerable<RiscoDto> dtos = result.Entities.Select(RiscoDto.From);
            return new RiscoGetAllOutputDto(dtos, result.HasMoreData);
        }

        private static PropertyInfo? ValidateSortByParameter(string? sortBy)
        {
            if (string.IsNullOrWhiteSpace(sortBy))
                return null;

            var properties = typeof(RiscoEntity).GetProperties();
            var matchingProperty = properties.FirstOrDefault(p => p.Name.Equals(sortBy, StringComparison.OrdinalIgnoreCase)) ??
                throw new QueryParameterValidationException("Parâmetro sortBy precisa representar uma propriedade de risco.");

            return matchingProperty;
        }

        private static AgentesDeRisco? ValidateAgentesParameter(string? agentes)
        {
            if (string.IsNullOrEmpty(agentes))
                return null;

            var validAgentes = Enum.GetNames(typeof(AgentesDeRisco));

            if (!validAgentes.Any(a => a.Equals(agentes, StringComparison.OrdinalIgnoreCase)))
            {
                throw new QueryParameterValidationException("Parâmetro agentes precisa ser um dos valores válidos.");
            }

            return (AgentesDeRisco)Enum.Parse(typeof(AgentesDeRisco), agentes, ignoreCase: true);
        }

        private static NivelSignificancia? ValidateNivelSignificanciaParameter(string? nivelSignificancia)
        {
            if (string.IsNullOrWhiteSpace(nivelSignificancia))
                return null;

            var validLevels = Enum.GetNames(typeof(NivelSignificancia));

            if (!validLevels.Any(l => l.Equals(nivelSignificancia, StringComparison.OrdinalIgnoreCase)))
            {
                throw new QueryParameterValidationException("Parâmetro nivelSignificancia precisa ser um dos valores válidos: Baixo, Medio, Alto.");
            }

            return (NivelSignificancia)Enum.Parse(typeof(NivelSignificancia), nivelSignificancia, true);
        }
    }
}
