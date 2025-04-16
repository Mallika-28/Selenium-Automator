
import { useState } from 'react';

export const useConsole = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const clearLogs = () => {
    setLogs([]);
  };

  const addLog = (message: string) => {
    setLogs(prev => [...prev, message]);
  };

  const simulateScriptRun = async (scriptCode: string): Promise<boolean> => {
    setIsRunning(true);
    clearLogs();

    addLog(">> Starting Selenium WebDriver...");

    // Simulate output over time
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog(">> WebDriver initialized");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    addLog(">> Executing Python script...");
    
    // Split code into lines and show them executing
    const codeLines = scriptCode.split('\n')
      .filter(line => line.trim().length > 0 && !line.trim().startsWith('#'))
      .slice(0, 5); // Only show first 5 code lines for simulation
      
    for (const line of codeLines) {
      await new Promise(resolve => setTimeout(resolve, 300));
      addLog(`>> ${line.trim()}`);
    }
    
    // Random chance of success or failure
    const success = Math.random() > 0.2;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (success) {
      addLog(">> Test completed successfully");
      addLog(">> All assertions passed");
      addLog(">> Closing browser...");
      await new Promise(resolve => setTimeout(resolve, 500));
      addLog(">> Selenium session ended");
    } else {
      const errors = [
        ">> Error: Element not found: #login-button",
        ">> Error: Timeout waiting for page load",
        ">> Error: Session disconnected unexpectedly",
        ">> Error: WebDriverException: unknown error: net::ERR_CONNECTION_REFUSED"
      ];
      addLog(errors[Math.floor(Math.random() * errors.length)]);
      addLog(">> Test failed");
      await new Promise(resolve => setTimeout(resolve, 500));
      addLog(">> Closing browser...");
      await new Promise(resolve => setTimeout(resolve, 300));
      addLog(">> Selenium session ended with errors");
    }
    
    setIsRunning(false);
    return success;
  };

  return {
    logs,
    isRunning,
    clearLogs,
    addLog,
    simulateScriptRun
  };
};
