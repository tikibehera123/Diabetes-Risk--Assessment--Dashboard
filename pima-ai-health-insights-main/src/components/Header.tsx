
import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6" />
          <h1 className="text-xl font-bold font-heading">Pima AI Health Insights</h1>
        </div>
        <div className="text-sm font-medium">Diabetes Risk Assessment Tool</div>
      </div>
    </header>
  );
};

export default Header;
