import type { AddRiskPayload } from "./AddRiskPayload";

export default interface EditRiskProps {
  programGuid: string;
  riskGuid: string;
  payload: AddRiskPayload;
}
