import { Outcome } from "../types/index";
import { logger } from "./logger";

export async function performanceMonitor(
  taskName: string,
  fn: () => Promise<Outcome>):
  Promise<{ durationMs: number, outcome: Outcome }> {
  const start = performance.now();

  try {
    const outcome = await fn();
    const end = performance.now();

    const durationMs = Math.floor(end - start);

    return { durationMs, outcome };
  } catch (error) {
    const durationMs = Math.floor(performance.now() - start);
    logger.error(`${taskName} failed in ${durationMs}ms`);
    throw error;
  }
}
