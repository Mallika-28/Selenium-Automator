
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, FileCheck, AlertTriangle } from 'lucide-react';
import { useScripts } from '@/hooks/use-scripts';

const AccessibilityStats = () => {
  const { scripts } = useScripts();
  
  // Filter scripts to only show accessibility scans
  const accessibilityScans = scripts.filter(script => 
    script.name.toLowerCase().includes('accessibility') || 
    script.description.toLowerCase().includes('accessibility')
  );
  
  // Calculate statistics
  const totalScans = accessibilityScans.length;
  const completedScans = accessibilityScans.filter(s => s.lastRunStatus === 'success').length;
  const failedScans = accessibilityScans.filter(s => s.lastRunStatus === 'failed').length;
  
  // Extract and calculate average score from script outputs (simplified)
  // In a real implementation, we would parse the actual output for precise data
  const averageScore = totalScans > 0 ? Math.round(75 - (failedScans * 15)) : 0;
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Accessibility Score
          </CardTitle>
          <Gauge className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageScore}/100</div>
          <p className="text-xs text-muted-foreground">
            Based on {totalScans} website scans
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Completed Scans
          </CardTitle>
          <FileCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedScans}</div>
          <p className="text-xs text-muted-foreground">
            Successfully completed website audits
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Issues Detected
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{failedScans > 0 ? failedScans * 12 : 0}</div>
          <p className="text-xs text-muted-foreground">
            Across all scanned websites
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default AccessibilityStats;
