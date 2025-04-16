
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayIcon, EditIcon, TrashIcon, ClockIcon } from "lucide-react";
import { Script } from "@/types/script";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDistanceToNow } from 'date-fns';

interface ScriptCardProps {
  script: Script;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRun: (id: string) => void;
}

const ScriptCard = ({ script, onEdit, onDelete, onRun }: ScriptCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{script.name}</CardTitle>
          <div className={`px-2 py-1 text-xs rounded-full ${script.lastRunStatus === 'success' ? 'bg-green-100 text-green-800' : script.lastRunStatus === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
            {script.lastRunStatus === 'success' ? 'Passed' : script.lastRunStatus === 'failed' ? 'Failed' : 'Not run'}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{script.description}</p>
        {script.lastRun && (
          <div className="flex items-center mt-2 text-xs text-muted-foreground">
            <ClockIcon className="h-3 w-3 mr-1" />
            <span>Last run: {formatDistanceToNow(new Date(script.lastRun))} ago</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <TooltipProvider>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => onRun(script.id)}>
                  <PlayIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Run Script</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => onEdit(script.id)}>
                  <EditIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Script</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={() => onDelete(script.id)} className="text-destructive hover:text-destructive">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Script</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default ScriptCard;
