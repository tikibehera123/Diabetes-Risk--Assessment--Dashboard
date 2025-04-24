
export interface PatientData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
}

export interface PredictionResult {
  probability: number;
  prediction: boolean;
  riskFactors: RiskFactor[];
}

export interface RiskFactor {
  name: string;
  value: number;
  importance: number;
  threshold: number;
  description: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface DataStatistics {
  totalPatients: number;
  diabetesPrevalence: number;
  averageAge: number;
  averageGlucose: number;
  averageBMI: number;
}

export interface CorrelationData {
  feature1: string;
  feature2: string;
  correlation: number;
}

export interface FeatureDistribution {
  feature: string;
  diabeticValues: number[];
  nonDiabeticValues: number[];
  bins: number;
}
