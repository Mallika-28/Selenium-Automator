
import React from 'react';
import ScriptCard from './ScriptCard';
import { Script } from '@/types/script';

interface ScriptGridProps {
  scripts: Script[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRun: (id: string) => void;
}

const ScriptGrid = ({ scripts, onEdit, onDelete, onRun }: ScriptGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scripts.map((script) => (
        <ScriptCard
          key={script.id}
          script={script}
          onEdit={onEdit}
          onDelete={onDelete}
          onRun={onRun}
        />
      ))}
    </div>
  );
};

export default ScriptGrid;
