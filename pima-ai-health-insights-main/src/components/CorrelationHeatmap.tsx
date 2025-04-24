
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCorrelationData, getFeatureDisplayName } from '@/utils/modelUtils';

const CorrelationHeatmap: React.FC = () => {
  const correlationData = getCorrelationData();
  
  // Helper function to determine color intensity based on correlation value
  const getColorIntensity = (value: number | undefined) => {
    if (value === undefined) return 'hsl(0, 0%, 95%)'; // Light gray for missing values
    
    const absValue = Math.abs(value);
    const hue = value >= 0 ? 200 : 0; // Blue for positive, red for negative
    const saturation = Math.min(100, absValue * 100); // Stronger colors for higher values
    const lightness = 100 - Math.min(50, absValue * 50); // Darker colors for higher values
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  
  // Helper function to render a heatmap cell
  const renderHeatmapCell = (feature1: string, feature2: string, value: number | undefined) => {
    return (
      <div 
        key={`${feature1}-${feature2}`}
        className="flex items-center justify-center h-16 text-xs font-medium rounded"
        style={{ backgroundColor: getColorIntensity(value) }}
      >
        {value !== undefined ? value.toFixed(2) : 'N/A'}
      </div>
    );
  };
  
  const features = Object.keys(correlationData);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Correlations</CardTitle>
        <CardDescription>
          Relationships between key features and diabetes risk
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-cols-[auto_repeat(3,1fr)] gap-1">
            <div className="h-16"></div>
            {['diabetes risk', 'glucose', 'bmi'].map(feature => (
              <div key={feature} className="h-16 flex items-center justify-center font-medium">
                {getFeatureDisplayName(feature)}
              </div>
            ))}
            
            {features.map(feature => (
              <React.Fragment key={feature}>
                <div className="h-16 flex items-center font-medium px-2">
                  {getFeatureDisplayName(feature)}
                </div>
                {renderHeatmapCell(feature, 'diabetesRisk', correlationData[feature]?.diabetesRisk)}
                {renderHeatmapCell(feature, 'glucose', correlationData[feature]?.glucose)}
                {renderHeatmapCell(feature, 'bmi', correlationData[feature]?.bmi)}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center items-center mt-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <span>Strong Negative</span>
            <div className="flex h-2">
              <div className="w-4 h-full bg-[hsl(0,100%,75%)]"></div>
              <div className="w-4 h-full bg-[hsl(0,80%,85%)]"></div>
              <div className="w-4 h-full bg-[hsl(0,0%,95%)]"></div>
              <div className="w-4 h-full bg-[hsl(200,80%,85%)]"></div>
              <div className="w-4 h-full bg-[hsl(200,100%,75%)]"></div>
            </div>
            <span>Strong Positive</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationHeatmap;
