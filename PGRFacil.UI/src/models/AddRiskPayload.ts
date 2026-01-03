export interface AddRiskPayload {
  local: string,
  activities: string,
  dangers: string,
  damages: string,
  agent: number,
  assessementType: string,
  severity: number,
  probability: number
}