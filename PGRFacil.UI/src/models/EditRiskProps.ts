import type { AddRiscoPayload } from "../pages/Programa/models/AddRiscoPayload";

export default interface EditRiskProps {
  programGuid: string;
  riskGuid: string;
  payload: AddRiscoPayload;
}
