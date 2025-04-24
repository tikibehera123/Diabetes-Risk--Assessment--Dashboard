
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { PredictionResult, RiskFactor } from '@/types/diabetes';
import { getFeatureDisplayName, getFeatureUnit } from '@/utils/modelUtils';

interface PredictionResultsProps {
  result: PredictionResult | null;
}

const RiskIndicator: React.FC<{ probability: number }> = ({ probability }) => {
  const percentage = Math.round(probability * 100);
  
  let color = 'bg-green-500';
  let icon = <CheckCircle className="h-5 w-5 text-green-500" />;
  let text = 'Low Risk';
  
  if (percentage >= 30 && percentage < 70) {
    color = 'bg-yellow-500';
    icon = <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    text = 'Moderate Risk';
  } else if (percentage >= 70) {
    color = 'bg-red-500';
    icon = <AlertCircle className="h-5 w-5 text-red-500" />;
    text = 'High Risk';
  }
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-medium">{text}</span>
        </div>
        <span className="font-bold">{percentage}%</span>
      </div>
      <Progress value={percentage} className={color} />
    </div>
  );
};

const RiskFactorItem: React.FC<{ factor: RiskFactor, index: number }> = ({ factor, index }) => {
  const displayName = getFeatureDisplayName(factor.name);
  const unit = getFeatureUnit(factor.name);
  
  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-full bg-primary/90 text-white flex items-center justify-center text-sm">
            {index + 1}
          </span>
          <span className="font-medium">{displayName}</span>
        </div>
        <div className="text-sm">
          <span className="font-bold">{factor.value} {unit}</span>
          <span className="text-muted-foreground ml-1">
            (Threshold: {factor.threshold} {unit})
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1 ml-8">{factor.description}</p>
    </div>
  );
};

const PredictionResults: React.FC<PredictionResultsProps> = ({ result }) => {
  if (!result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
          <CardDescription>Enter patient data and click Calculate Risk to see results</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          No prediction data available yet
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction Results</CardTitle>
        <CardDescription>AI model assessment of diabetes risk</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RiskIndicator probability={result.probability} />
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="font-semibold">Key Risk Factors</h3>
          {result.riskFactors.length > 0 ? (
            <div className="divide-y">
              {result.riskFactors.map((factor, i) => (
                <RiskFactorItem key={factor.name} factor={factor} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No significant risk factors identified.</p>
          )}
        </div>
        
        <Separator />
        
        <div>
          <p className="text-sm text-muted-foreground italic">
            This assessment is based on a predictive model and should be used for informational purposes only. 
            Always consult with healthcare professionals for medical advice.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
