
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Users, LineChart, BarChart4 } from 'lucide-react';
import { getDatasetStatistics } from '@/utils/modelUtils';

const DashboardStats: React.FC = () => {
  const stats = getDatasetStatistics();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPatients}</div>
          <p className="text-xs text-muted-foreground">in dataset</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-destructive">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Diabetes Prevalence</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.diabetesPrevalence}%</div>
          <p className="text-xs text-muted-foreground">of patients</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-secondary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg. Glucose</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageGlucose}</div>
          <p className="text-xs text-muted-foreground">mg/dL</p>
        </CardContent>
      </Card>
      
      <Card className="border-l-4 border-l-accent">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Avg. BMI</CardTitle>
          <BarChart4 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageBMI}</div>
          <p className="text-xs text-muted-foreground">kg/m²</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
