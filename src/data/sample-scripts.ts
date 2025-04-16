
import { Script } from '@/types/script';
import { scriptTemplates } from './script-templates';

// Generate sample scripts for first-time users
export const sampleScripts: Script[] = [
  {
    id: '1',
    name: 'Login Automation',
    description: 'Automates login for our application with proper error handling and reporting.',
    code: scriptTemplates.find(t => t.id === 'login-test')?.code || '',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    lastRun: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    lastRunStatus: 'success',
    runCount: 5
  },
  {
    id: '2',
    name: 'Product Data Scraper',
    description: 'Scrapes product information from the catalog pages and exports to CSV.',
    code: scriptTemplates.find(t => t.id === 'data-scraper')?.code || '',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    lastRunStatus: 'not_run',
    runCount: 0
  },
  {
    id: '3',
    name: 'UI Screenshot Tester',
    description: 'Takes screenshots of key pages for visual regression testing.',
    code: scriptTemplates.find(t => t.id === 'screenshot')?.code || '',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    lastRun: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    lastRunStatus: 'failed',
    runCount: 3
  }
];
