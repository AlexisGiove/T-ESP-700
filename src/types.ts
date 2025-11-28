export interface TerminalLine {
  type: 'command' | 'output' | 'system';
  content: string;
  timestamp?: number;
}

export type CommandHandler = (args: string[]) => string | string[];



