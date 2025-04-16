
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayIcon, AlertCircleIcon, CheckCircleIcon, BarChartIcon } from "lucide-react";

interface StatsCardsProps {
  totalScripts: number;
  successfulRuns: number;
  failedRuns: number;
  totalRuns: number;
}

const StatsCards = ({ totalScripts, successfulRuns, failedRuns, totalRuns }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Scripts</CardTitle>
          <BarChartIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalScripts}</div>
          <p className="text-xs text-muted-foreground">Scripts available</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
          <PlayIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRuns}</div>
          <p className="text-xs text-muted-foreground">Script executions</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Successful</CardTitle>
          <CheckCircleIcon className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successfulRuns}</div>
          <p className="text-xs text-muted-foreground">{totalRuns > 0 ? `${Math.round((successfulRuns / totalRuns) * 100)}% success rate` : 'No runs yet'}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Failed</CardTitle>
          <AlertCircleIcon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{failedRuns}</div>
          <p className="text-xs text-muted-foreground">{totalRuns > 0 ? `${Math.round((failedRuns / totalRuns) * 100)}% failure rate` : 'No runs yet'}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
