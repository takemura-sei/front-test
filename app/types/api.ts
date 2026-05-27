export interface Prefecture {
  prefCode: number
  prefName: string
}

export interface PopulationDataItem {
  year: number
  value: number
}

export interface PopulationData {
  label: string
  data: PopulationDataItem[]
}

export interface PopulationResult {
  boundaryYear: number
  data: PopulationData[]
}

export interface PrefecturesResponse {
  message: string | null
  result: Prefecture[]
}

export interface PopulationResponse {
  message: string | null
  result: PopulationResult
}