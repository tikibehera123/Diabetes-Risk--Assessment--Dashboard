
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { getFeatureImportances, getFeatureDisplayName } from '@/utils/modelUtils';

const FeatureImportanceChart: React.FC = () => {
  const importances = getFeatureImportances();
  
  // Sort by importance (descending)
  const sortedImportances = [...importances].sort((a, b) => b.importance - a.importance);
  
  // Transform data for the chart
  const data = sortedImportances.map(item => ({
    name: getFeatureDisplayName(item.feature),
    value: item.importance,
    feature: item.feature
  }));
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Feature Importance</CardTitle>
        <CardDescription>
          Relative contribution of each feature to diabetes prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 'dataMax']} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, 'Importance']}
              />
              <Bar dataKey="value" barSize={20} radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={index === 0 ? '#0077B6' : index === 1 ? '#00B4D8' : '#90E0EF'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureImportanceChart;
