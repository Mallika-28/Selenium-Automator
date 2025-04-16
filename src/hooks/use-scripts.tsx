
import { useState, useEffect } from 'react';
import { Script } from '@/types/script';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/components/ui/use-toast';
import { sampleScripts } from '@/data/sample-scripts';

interface ScriptStats {
  totalScripts: number;
  successfulRuns: number;
  failedRuns: number;
  totalRuns: number;
}

export const useScripts = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<ScriptStats>({
    totalScripts: 0,
    successfulRuns: 0,
    failedRuns: 0,
    totalRuns: 0
  });

  useEffect(() => {
    // Load scripts from localStorage or use sample data for first-time users
    const loadScripts = () => {
      const savedScripts = localStorage.getItem('selenium-scripts');
      if (savedScripts) {
        setScripts(JSON.parse(savedScripts));
      } else {
        // Use sample scripts for first time
        setScripts(sampleScripts);
      }
      setIsLoading(false);
    };

    loadScripts();
  }, []);

  useEffect(() => {
    // Persist scripts to localStorage whenever they change
    if (!isLoading) {
      localStorage.setItem('selenium-scripts', JSON.stringify(scripts));
    }

    // Update stats
    const successfulRuns = scripts.filter(s => s.lastRunStatus === 'success').length;
    const failedRuns = scripts.filter(s => s.lastRunStatus === 'failed').length;
    const totalRuns = scripts.reduce((acc, script) => acc + (script.runCount || 0), 0);

    setStats({
      totalScripts: scripts.length,
      successfulRuns,
      failedRuns,
      totalRuns
    });
  }, [scripts, isLoading]);

  const addScript = (name: string, description: string, code: string) => {
    const newScript: Script = {
      id: uuidv4(),
      name,
      description,
      code,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastRunStatus: 'not_run',
      runCount: 0
    };

    setScripts(prevScripts => [...prevScripts, newScript]);
    toast({
      title: "Script Created",
      description: `Successfully created "${name}"`,
    });
    return newScript;
  };

  const updateScript = (id: string, updates: Partial<Script>) => {
    setScripts(prevScripts => 
      prevScripts.map(script => 
        script.id === id 
          ? { ...script, ...updates, updatedAt: new Date().toISOString() } 
          : script
      )
    );
    toast({
      title: "Script Updated",
      description: "Your changes have been saved",
    });
  };

  const deleteScript = (id: string) => {
    const scriptToDelete = scripts.find(s => s.id === id);
    if (!scriptToDelete) return;

    setScripts(prevScripts => prevScripts.filter(script => script.id !== id));
    toast({
      title: "Script Deleted",
      description: `Successfully deleted "${scriptToDelete.name}"`,
    });
  };

  const runScript = async (id: string): Promise<void> => {
    const script = scripts.find(s => s.id === id);
    if (!script) return;

    // Update script to running state
    updateScript(id, { isRunning: true });

    // Simulate running a Selenium script
    return new Promise((resolve) => {
      const simulationTime = 2000 + Math.random() * 3000;

      setTimeout(() => {
        // 80% chance of success
        const success = Math.random() > 0.2;
        updateScript(id, { 
          isRunning: false,
          lastRunStatus: success ? 'success' : 'failed',
          lastRun: new Date().toISOString(),
          runCount: (script.runCount || 0) + 1
        });

        toast({
          title: success ? "Script Execution Successful" : "Script Execution Failed",
          description: success 
            ? `Successfully executed "${script.name}"` 
            : `Failed to execute "${script.name}"`,
          variant: success ? "default" : "destructive",
        });

        resolve();
      }, simulationTime);
    });
  };

  return {
    scripts,
    isLoading,
    stats,
    addScript,
    updateScript,
    deleteScript,
    runScript
  };
};
