import type { AddRiscoPayload } from "./AddRiscoPayload";

export default interface EditRiscoProps {
  programaGuid: string;
  riscoGuid: string;
  payload: AddRiscoPayload;
}
