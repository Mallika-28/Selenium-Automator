
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SaveIcon, PlayIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  initialCode: string;
  onChange: (code: string) => void;
  onSave: () => void;
  onRun: () => void;
  className?: string;
}

const CodeEditor = ({ initialCode, onChange, onSave, onRun, className }: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange(newCode);
  };

  return (
    <Card className={cn("rounded-lg", className)}>
      <div className="bg-muted/50 flex items-center justify-between px-4 py-2 border-b">
        <span className="text-sm font-medium">Python Script</span>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" onClick={onSave}>
            <SaveIcon className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="default" size="sm" onClick={onRun}>
            <PlayIcon className="h-4 w-4 mr-2" />
            Run
          </Button>
        </div>
      </div>
      <CardContent className="p-0">
        <div className="relative">
          <textarea
            className="w-full h-[400px] font-mono text-sm p-4 bg-card resize-none outline-none"
            value={code}
            onChange={handleChange}
            spellCheck={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeEditor;
