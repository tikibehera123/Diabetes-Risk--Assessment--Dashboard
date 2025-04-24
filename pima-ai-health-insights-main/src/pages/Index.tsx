
import React, { useState } from 'react';
import Header from '@/components/Header';
import DashboardStats from '@/components/DashboardStats';
import PredictionForm from '@/components/PredictionForm';
import PredictionResults from '@/components/PredictionResults';
import FeatureImportanceChart from '@/components/FeatureImportanceChart';
import DistributionChart from '@/components/DistributionChart';
import InfoCard from '@/components/InfoCard';
import CorrelationHeatmap from '@/components/CorrelationHeatmap';
import { PatientData, PredictionResult } from '@/types/diabetes';
import { predictDiabetes } from '@/utils/modelUtils';

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  
  const handlePredict = (data: PatientData) => {
    const result = predictDiabetes(data);
    setPredictionResult(result);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-heading font-bold mb-6">Diabetes Risk Assessment Dashboard</h1>
        
        <DashboardStats />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <PredictionForm onPredict={handlePredict} />
              <PredictionResults result={predictionResult} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FeatureImportanceChart />
              <DistributionChart />
            </div>
          </div>
          
          <div className="space-y-6">
            <InfoCard />
            <CorrelationHeatmap />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Pima AI Health Insights &copy; 2025 - Diabetes Risk Assessment Tool</p>
          <p className="text-xs mt-1">
            This application is for educational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
