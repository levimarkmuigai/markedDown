export async function performanceMonitor<T>(
  taskName: string,
  fn: () => Promise<T>): Promise<number> {
  const start = performance.now();

  try {
    await fn();
    const end = performance.now();

    const durationMs = Math.floor(end - start);

    return durationMs;
  } catch (error) {
    const end = performance.now();

    console.error(`${taskName}
                  failed in ${Math.floor(end - start)}Ms`);

    throw error;
  }
}
