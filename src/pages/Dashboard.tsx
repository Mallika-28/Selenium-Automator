
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import StatsCards from "@/components/dashboard/StatsCards";
import ScriptGrid from "@/components/dashboard/ScriptGrid";
import CreateScriptDialog from "@/components/dialog/CreateScriptDialog";
import DeleteScriptDialog from "@/components/dialog/DeleteScriptDialog";
import { useScripts } from "@/hooks/use-scripts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { scripts, stats, addScript, deleteScript, runScript } = useScripts();
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  
  const handleCreateScript = (name: string, description: string, code: string) => {
    const newScript = addScript(name, description, code);
    navigate(`/editor/${newScript.id}`);
  };
  
  const handleEditScript = (id: string) => {
    navigate(`/editor/${id}`);
  };
  
  const handleDeleteScript = (id: string) => {
    setSelectedScriptId(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteScript = () => {
    if (selectedScriptId) {
      deleteScript(selectedScriptId);
      setSelectedScriptId(null);
    }
    setDeleteDialogOpen(false);
  };
  
  const handleRunScript = async (id: string) => {
    await runScript(id);
  };
  
  const selectedScript = selectedScriptId 
    ? scripts.find(s => s.id === selectedScriptId) 
    : null;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and run your Selenium automation scripts
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Script
        </Button>
      </div>
      
      <StatsCards
        totalScripts={stats.totalScripts}
        successfulRuns={stats.successfulRuns}
        failedRuns={stats.failedRuns}
        totalRuns={stats.totalRuns}
      />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Scripts</h2>
        {scripts.length === 0 ? (
          <div className="bg-muted/40 rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-1">No scripts found</h3>
            <p className="text-muted-foreground mb-4">
              Create your first Selenium script to get started
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Create Script
            </Button>
          </div>
        ) : (
          <ScriptGrid
            scripts={scripts}
            onEdit={handleEditScript}
            onDelete={handleDeleteScript}
            onRun={handleRunScript}
          />
        )}
      </div>
      
      <CreateScriptDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreateScript={handleCreateScript}
      />
      
      <DeleteScriptDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteScript}
        scriptName={selectedScript?.name || ""}
      />
    </div>
  );
};

export default Dashboard;
