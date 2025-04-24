
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getFeatureDisplayName, getFeatureUnit, getFeatureDistribution } from '@/utils/modelUtils';

const features = ['glucose', 'bmi', 'age'];

const DistributionChart: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('glucose');
  
  const handleFeatureChange = (value: string) => {
    setSelectedFeature(value);
  };
  
  const { diabetic, nonDiabetic } = getFeatureDistribution(selectedFeature);
  
  // Create a histogram-like data structure
  const bins = 10;
  const min = Math.min(...diabetic, ...nonDiabetic);
  const max = Math.max(...diabetic, ...nonDiabetic);
  const binWidth = (max - min) / bins;
  
  const binData = Array(bins).fill(0).map((_, i) => {
    const binStart = min + i * binWidth;
    const binEnd = binStart + binWidth;
    const binMiddle = (binStart + binEnd) / 2;
    
    const diabeticCount = diabetic.filter(val => val >= binStart && val < binEnd).length;
    const nonDiabeticCount = nonDiabetic.filter(val => val >= binStart && val < binEnd).length;
    
    return {
      bin: binMiddle.toFixed(1),
      diabetic: diabeticCount,
      nonDiabetic: nonDiabeticCount
    };
  });
  
  const displayName = getFeatureDisplayName(selectedFeature);
  const unit = getFeatureUnit(selectedFeature);
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Feature Distribution</CardTitle>
            <CardDescription>
              Distribution comparison between diabetic and non-diabetic patients
            </CardDescription>
          </div>
          <Select value={selectedFeature} onValueChange={handleFeatureChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select feature" />
            </SelectTrigger>
            <SelectContent>
              {features.map(feature => (
                <SelectItem key={feature} value={feature}>{getFeatureDisplayName(feature)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={binData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="bin" 
                label={{ 
                  value: `${displayName} (${unit})`,
                  position: 'insideBottom',
                  offset: -10
                }} 
              />
              <YAxis label={{ 
                value: 'Count', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="diabetic" 
                stackId="1" 
                stroke="#F87171" 
                fill="#F87171" 
                name="Diabetic"
              />
              <Area 
                type="monotone" 
                dataKey="nonDiabetic" 
                stackId="2" 
                stroke="#60A5FA" 
                fill="#60A5FA" 
                name="Non-Diabetic" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DistributionChart;
