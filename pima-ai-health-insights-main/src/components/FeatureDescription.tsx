
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getFeatureDescription, getFeatureDisplayName } from '@/utils/modelUtils';

interface FeatureDescriptionProps {
  feature: string;
}

const FeatureDescription: React.FC<FeatureDescriptionProps> = ({ feature }) => {
  const description = getFeatureDescription(feature);
  const displayName = getFeatureDisplayName(feature);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{displayName}</CardTitle>
        <CardDescription>Risk Factor Information</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureDescription;
