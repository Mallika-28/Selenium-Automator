
import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="container py-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Selenium Automation Suite</h1>
          <p className="text-muted-foreground">Manage and run your Selenium automation scripts</p>
        </div>
        <div className="flex space-x-3">
          <Button asChild>
            <Link to="/accessibility-auditor">
              Web Accessibility Auditor
            </Link>
          </Button>

        </div>
      </div>
      
      <Tabs defaultValue="scripts">
        <TabsList className="mb-4">
          <TabsTrigger value="scripts">Script Dashboard</TabsTrigger>
          <TabsTrigger value="accessibility" asChild>
            <Link to="/accessibility-auditor">Accessibility Tools</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="scripts">
          <Dashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
