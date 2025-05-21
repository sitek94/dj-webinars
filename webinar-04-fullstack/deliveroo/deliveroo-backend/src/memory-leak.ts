import logger from './logger';
// Memory leak simulation container
const memoryLeak: any[] = [];
const invokeMemoryLeak = (): void => {
  if (process.env.SIMULATE_MEMORY_LEAK === 'true') {
    // Simulate memory leak by adding dummy data
    memoryLeak.push(new Array(1000000).fill('leak'));
    const memUsage = process.memoryUsage();
    logger.warn(`Simulated Memory Leak: entries=${memoryLeak.length}, HeapUsed=${Math.round(memUsage.heapUsed/1024/1024)} MB`);
  }
}

export { memoryLeak, invokeMemoryLeak };
