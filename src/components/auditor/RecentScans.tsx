
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Play, FileText, Edit, Trash } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Script } from '@/types/script';
import { useScripts } from '@/hooks/use-scripts';

const RecentScans = () => {
  const navigate = useNavigate();
  const { scripts, runScript, deleteScript } = useScripts();
  
  // Filter scripts to only show accessibility scans (based on name)
  const accessibilityScans = scripts.filter(script => 
    script.name.toLowerCase().includes('accessibility') || 
    script.description.toLowerCase().includes('accessibility')
  );
  
  // Sort by most recent first
  const sortedScans = [...accessibilityScans].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  
  const handleViewResults = (scriptId: string) => {
    navigate(`/editor/${scriptId}`);
  };
  
  const handleRunScan = async (scriptId: string) => {
    await runScript(scriptId);
  };
  
  const getStatusBadge = (script: Script) => {
    if (script.isRunning) {
      return <Badge className="bg-blue-500">Running</Badge>;
    }
    
    switch (script.lastRunStatus) {
      case 'success':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'failed':
        return <Badge className="bg-red-500">Failed</Badge>;
      default:
        return <Badge variant="outline">Not Run</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Accessibility Scans</CardTitle>
        <CardDescription>
          View and manage your recent website accessibility audits
        </CardDescription>
      </CardHeader>
      <CardContent>
        {sortedScans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <FileText className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No accessibility scans found</p>
            <p className="text-sm text-muted-foreground">Run your first accessibility scan to see results here</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Last Scan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedScans.map((script) => (
                <TableRow key={script.id}>
                  <TableCell className="font-medium">
                    {script.name.replace('Accessibility Scan - ', '')}
                  </TableCell>
                  <TableCell>
                    {script.lastRun 
                      ? formatDistanceToNow(new Date(script.lastRun), { addSuffix: true }) 
                      : 'Never'}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(script)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewResults(script.id)}>
                          <FileText className="mr-2 h-4 w-4" />
                          View Results
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRunScan(script.id)}>
                          <Play className="mr-2 h-4 w-4" />
                          Run Again
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteScript(script.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentScans;
