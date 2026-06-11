export type LogLevel = 'debug' | 'info' | 'error' | 'warn';

export interface LogEntry<T = unknown> {
  level: LogLevel;
  timestamp: string;
  message: string;
  context?: string;
  data?: T;
}

class Logger {
  private formatMessage<T>(
    level: LogLevel,
    message: string,
    context?: string,
    data?: T): LogEntry<T> {
    return {
      level,
      timestamp: new Date().toISOString(),
      message,
      ...(context && { context }),
      ...(data && { data }),
    }
  }

  private print(entry: LogEntry): void {
    const output = `[${entry.timestamp}] [${entry.level}]
    ${entry.context ? ` [${entry.context}]` : ''} ${entry.message}`;

    switch (entry.level) {
      case 'info':
        console.info(output, entry.data || '');
        break;

      case 'warn':
        console.warn(output, entry.data || '');
        break;

      case 'debug':
      default:
        console.debug(output, entry.data || '');
        break;

      case 'error':
        console.error(output, entry.data || '');
        break;
    }
  }

  info<T>(message: string, context?: string, data?: T): void {
    this.print(this.formatMessage('info', message, context, data));
  }
  warn<T>(message: string, context?: string, data?: T): void {
    this.print(this.formatMessage('warn', message, context, data));
  }
  debug<T>(message: string, context?: string, data?: T): void {
    this.print(this.formatMessage('debug', message, context, data));
  }
  error<T>(message: string, context?: string, data?: T) {
    this.print(this.formatMessage('error', message, context, data));
  }
}

export const logger = new Logger;
