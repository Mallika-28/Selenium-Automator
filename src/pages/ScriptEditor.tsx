
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeftIcon, SaveIcon, PlayIcon } from "lucide-react";
import CodeEditor from "@/components/editor/CodeEditor";
import ConsoleOutput from '@/components/editor/ConsoleOutput';
import { useScripts } from "@/hooks/use-scripts";
import { useConsole } from "@/hooks/use-console";
import { toast } from '@/components/ui/use-toast';

const ScriptEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { scripts, updateScript } = useScripts();
  const { logs, isRunning, simulateScriptRun } = useConsole();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  // Load script data
  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    
    const script = scripts.find(s => s.id === id);
    if (!script) {
      toast({
        title: "Script Not Found",
        description: "The requested script could not be found.",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
    
    setName(script.name);
    setDescription(script.description);
    setCode(script.code);
    setUnsavedChanges(false);
  }, [id, scripts, navigate]);
  
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setUnsavedChanges(true);
  };
  
  const handleSave = () => {
    if (!id) return;
    
    updateScript(id, {
      name,
      description,
      code
    });
    
    setUnsavedChanges(false);
  };
  
  const handleRun = async () => {
    if (!id) return;
    
    // First save any unsaved changes
    if (unsavedChanges) {
      handleSave();
    }
    
    // Run the script and get success/fail status
    const success = await simulateScriptRun(code);
    
    // Update the script status
    updateScript(id, {
      lastRunStatus: success ? 'success' : 'failed',
      lastRun: new Date().toISOString(),
      runCount: (scripts.find(s => s.id === id)?.runCount || 0) + 1
    });
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave} disabled={!unsavedChanges}>
            <SaveIcon className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button onClick={handleRun} disabled={isRunning}>
            <PlayIcon className="h-4 w-4 mr-2" />
            Run
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Script Name</label>
          <Input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setUnsavedChanges(true);
            }}
            className="max-w-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setUnsavedChanges(true);
            }}
            rows={2}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <CodeEditor
            initialCode={code}
            onChange={handleCodeChange}
            onSave={handleSave}
            onRun={handleRun}
          />
        </div>
        <div className="lg:col-span-2">
          <ConsoleOutput logs={logs} isRunning={isRunning} />
        </div>
      </div>
      
      {unsavedChanges && (
        <div className="fixed bottom-4 right-4">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-md flex items-center">
            <span className="mr-2">You have unsaved changes</span>
            <Button size="sm" onClick={handleSave}>Save Now</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScriptEditor;
