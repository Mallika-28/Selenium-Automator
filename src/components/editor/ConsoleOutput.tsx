
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ConsoleOutputProps {
  logs: string[];
  isRunning: boolean;
  className?: string;
}

const ConsoleOutput = ({ logs, isRunning, className }: ConsoleOutputProps) => {
  return (
    <Card className={cn("rounded-lg", className)}>
      <CardHeader className="bg-muted/50 px-4 py-2 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Console Output</CardTitle>
          {isRunning && (
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse-slow"></span>
              <span className="text-xs text-muted-foreground">Running...</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-black text-green-400 font-mono text-sm p-4 h-[200px] overflow-y-auto">
          {logs.length === 0 ? (
            <div className="text-muted-foreground italic">No output yet. Run the script to see results.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsoleOutput;
