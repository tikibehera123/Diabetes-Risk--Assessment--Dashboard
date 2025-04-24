
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon, Database, Binary } from 'lucide-react';

const InfoCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <InfoIcon className="h-5 w-5" />
        <div>
          <CardTitle>About This Tool</CardTitle>
          <CardDescription>Understanding the prediction model</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-1">
            <Database className="h-4 w-4" /> Dataset Information
          </h4>
          <p className="text-sm text-muted-foreground">
            This tool uses the Pima Indians Diabetes Dataset, which contains diagnostic measurements from 768 females of Pima Indian heritage. The dataset includes features like glucose concentration, blood pressure, skin fold thickness, insulin level, BMI, diabetes pedigree function, and age.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium flex items-center gap-2 mb-1">
            <Binary className="h-4 w-4" /> Model Details
          </h4>
          <p className="text-sm text-muted-foreground">
            The prediction is performed using a logistic regression model trained on the dataset. The model identifies patterns in patient data to estimate diabetes risk. It has been evaluated using standard metrics including accuracy, precision, recall, and ROC/AUC scores.
          </p>
        </div>
        
        <div className="text-sm text-muted-foreground pt-2">
          <p className="italic border-l-2 border-muted pl-2">
            Note: This tool is for educational purposes only and should not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers regarding medical conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
