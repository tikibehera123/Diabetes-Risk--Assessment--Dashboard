
import { FeatureImportance, PatientData, PredictionResult, RiskFactor } from '@/types/diabetes';

// These values represent feature importances from a pre-trained Random Forest model
// In a real app, these would come from the actual trained model
const featureImportances: FeatureImportance[] = [
  { feature: "glucose", importance: 0.32 },
  { feature: "bmi", importance: 0.18 },
  { feature: "age", importance: 0.15 },
  { feature: "diabetesPedigree", importance: 0.11 },
  { feature: "insulin", importance: 0.09 },
  { feature: "pregnancies", importance: 0.06 },
  { feature: "bloodPressure", importance: 0.05 },
  { feature: "skinThickness", importance: 0.04 }
];

// Feature descriptions for risk factor analysis
const featureDescriptions: Record<string, string> = {
  glucose: "Blood glucose levels are a direct indicator of how well your body processes sugar.",
  bmi: "Body Mass Index measures body fat based on height and weight. High BMI is linked to insulin resistance.",
  age: "Age is a non-modifiable risk factor. Diabetes risk increases with age.",
  diabetesPedigree: "Family history function calculates diabetes risk based on family history.",
  insulin: "Insulin levels show how effectively your body is using insulin to process glucose.",
  pregnancies: "Number of pregnancies can affect long-term blood sugar regulation.",
  bloodPressure: "Blood pressure correlates with cardiovascular health and diabetes risk.",
  skinThickness: "Skin fold thickness can be an indicator of body fat distribution."
};

// Feature thresholds - values above these are considered risk factors
// Based on medical guidelines and dataset statistics
const featureThresholds: Record<string, number> = {
  glucose: 140,
  bmi: 30,
  age: 45,
  diabetesPedigree: 0.8,
  insulin: 150,
  pregnancies: 4,
  bloodPressure: 90,
  skinThickness: 35
};

// This is a simplified logistic regression model function
// In a real app, you'd use a proper ML model trained on the dataset
export const predictDiabetes = (data: PatientData): PredictionResult => {
  // Coefficients for our simplified logistic regression model
  const intercept = -8.4;
  const coefficients = {
    pregnancies: 0.12,
    glucose: 0.04,
    bloodPressure: 0.02,
    skinThickness: 0.001,
    insulin: 0.0001,
    bmi: 0.09,
    diabetesPedigree: 1.8,
    age: 0.04
  };
  
  // Calculate logit (log-odds)
  let logit = intercept;
  logit += coefficients.pregnancies * data.pregnancies;
  logit += coefficients.glucose * data.glucose;
  logit += coefficients.bloodPressure * data.bloodPressure;
  logit += coefficients.skinThickness * data.skinThickness;
  logit += coefficients.insulin * data.insulin;
  logit += coefficients.bmi * data.bmi;
  logit += coefficients.diabetesPedigree * data.diabetesPedigree;
  logit += coefficients.age * data.age;
  
  // Convert logit to probability using sigmoid function
  const probability = 1 / (1 + Math.exp(-logit));
  
  // Identify risk factors
  const riskFactors: RiskFactor[] = [];
  Object.keys(data).forEach(key => {
    const typedKey = key as keyof PatientData;
    const value = data[typedKey];
    const threshold = featureThresholds[typedKey];
    const importance = featureImportances.find(f => f.feature === typedKey)?.importance || 0;
    
    if (value > threshold) {
      riskFactors.push({
        name: typedKey,
        value: value,
        importance: importance,
        threshold: threshold,
        description: featureDescriptions[typedKey]
      });
    }
  });
  
  // Sort risk factors by importance
  riskFactors.sort((a, b) => b.importance - a.importance);
  
  return {
    probability,
    prediction: probability >= 0.5,
    riskFactors
  };
};

// Function to get sample data for demo purposes
export const getSamplePatientData = (): PatientData => {
  return {
    pregnancies: 2,
    glucose: 140,
    bloodPressure: 80,
    skinThickness: 30,
    insulin: 140,
    bmi: 32,
    diabetesPedigree: 0.6,
    age: 45
  };
};

// Function to get all feature importances
export const getFeatureImportances = (): FeatureImportance[] => {
  return [...featureImportances];
};

// Function to get feature descriptions
export const getFeatureDescription = (feature: string): string => {
  return featureDescriptions[feature] || "";
};

// Generate artificial data for visualization based on real statistics
export const getDatasetStatistics = () => {
  return {
    totalPatients: 768,
    diabetesPrevalence: 34.9,
    averageAge: 33.2,
    averageGlucose: 121.7,
    averageBMI: 32.5
  };
};

// Helper function to get a human-readable feature name
export const getFeatureDisplayName = (feature: string): string => {
  const displayNames: Record<string, string> = {
    pregnancies: "Pregnancies",
    glucose: "Glucose",
    bloodPressure: "Blood Pressure",
    skinThickness: "Skin Thickness",
    insulin: "Insulin",
    bmi: "BMI",
    diabetesPedigree: "Diabetes Pedigree",
    age: "Age"
  };
  
  return displayNames[feature] || feature;
};

// Helper function to get feature units
export const getFeatureUnit = (feature: string): string => {
  const units: Record<string, string> = {
    pregnancies: "count",
    glucose: "mg/dL",
    bloodPressure: "mmHg",
    skinThickness: "mm",
    insulin: "μU/mL",
    bmi: "kg/m²",
    diabetesPedigree: "score",
    age: "years"
  };
  
  return units[feature] || "";
};

// Function to get feature distribution data for visualizations
export const getFeatureDistribution = (feature: string) => {
  // This would be real data in a production app
  const distributions: Record<string, { diabetic: number[], nonDiabetic: number[] }> = {
    glucose: {
      diabetic: [140, 155, 165, 145, 180, 160, 170, 175, 195, 150],
      nonDiabetic: [85, 110, 90, 105, 100, 115, 95, 120, 125, 130]
    },
    bmi: {
      diabetic: [32, 35, 31, 36, 29, 38, 33, 30, 34, 37],
      nonDiabetic: [22, 25, 26, 24, 21, 27, 23, 28, 20, 23]
    },
    age: {
      diabetic: [55, 65, 45, 50, 60, 42, 58, 53, 48, 62],
      nonDiabetic: [25, 30, 22, 35, 28, 33, 26, 32, 24, 31]
    }
  };
  
  return distributions[feature] || { diabetic: [], nonDiabetic: [] };
};

// Create example correlation data
export const getCorrelationData = () => {
  return {
    glucose: { diabetesRisk: 0.67, bmi: 0.22, age: 0.26 },
    bmi: { diabetesRisk: 0.31, glucose: 0.22, age: 0.04 },
    age: { diabetesRisk: 0.24, glucose: 0.26, bmi: 0.04 },
    insulin: { diabetesRisk: 0.28, glucose: 0.61, bmi: 0.19 },
    diabetesPedigree: { diabetesRisk: 0.20, age: 0.03, bmi: 0.14 }
  };
};
