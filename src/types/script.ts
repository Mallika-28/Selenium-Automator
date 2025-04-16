
export type ScriptStatus = 'not_run' | 'success' | 'failed';

export interface Script {
  id: string;
  name: string;
  description: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  lastRun?: string;
  lastRunStatus: ScriptStatus;
  runCount?: number;
  isRunning?: boolean;
}
