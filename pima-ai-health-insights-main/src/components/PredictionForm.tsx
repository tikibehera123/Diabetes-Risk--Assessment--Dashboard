
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { PatientData } from '@/types/diabetes';
import { getSamplePatientData, getFeatureDisplayName, getFeatureUnit } from '@/utils/modelUtils';

interface PredictionFormProps {
  onPredict: (data: PatientData) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict }) => {
  const [formData, setFormData] = useState<PatientData>(getSamplePatientData());
  
  const handleChange = (feature: keyof PatientData, value: number) => {
    setFormData(prev => ({ ...prev, [feature]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const isValid = Object.values(formData).every(val => !isNaN(Number(val)));
    if (!isValid) {
      toast.error('Please enter valid numbers for all fields.');
      return;
    }
    
    onPredict(formData);
    toast.success('Prediction calculated successfully!');
  };
  
  const handleLoadSampleData = () => {
    setFormData(getSamplePatientData());
    toast.info('Sample data loaded');
  };
  
  // Helper function to create form fields
  const createFormField = (feature: keyof PatientData, min: number, max: number, step: number) => {
    const displayName = getFeatureDisplayName(feature);
    const unit = getFeatureUnit(feature);
    
    return (
      <div className="grid gap-2" key={feature}>
        <div className="flex justify-between">
          <Label htmlFor={feature}>{displayName}</Label>
          <span className="text-sm text-muted-foreground">{formData[feature]} {unit}</span>
        </div>
        <Slider
          id={feature}
          min={min}
          max={max}
          step={step}
          value={[formData[feature]]}
          onValueChange={(vals) => handleChange(feature, vals[0])}
          className="mb-2"
        />
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Data Input</CardTitle>
        <CardDescription>Enter patient measurements for diabetes risk assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {createFormField('pregnancies', 0, 17, 1)}
          {createFormField('glucose', 0, 200, 1)}
          {createFormField('bloodPressure', 0, 150, 1)}
          {createFormField('skinThickness', 0, 100, 1)}
          {createFormField('insulin', 0, 350, 1)}
          {createFormField('bmi', 0, 70, 0.1)}
          {createFormField('diabetesPedigree', 0, 2.5, 0.01)}
          {createFormField('age', 0, 100, 1)}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleLoadSampleData}>Load Sample Data</Button>
        <Button onClick={handleSubmit}>Calculate Risk</Button>
      </CardFooter>
    </Card>
  );
};

export default PredictionForm;
