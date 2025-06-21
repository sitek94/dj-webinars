import { Request, Response, NextFunction } from 'express';
import { httpRequestsTotal, httpRequestDurationSeconds } from './metrics';

export function metricsMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Skip metrics endpoint itself to avoid circular measurements
  if (req.path === '/metrics') {
    return next();
  }

  // Start the timer
  const start = process.hrtime();

  // Record the original end method
  const originalEnd = res.end;

  // Override the end method to capture metrics before sending the response
  res.end = function (...args: any[]): any {
    // Calculate the duration in seconds
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds + nanoseconds / 1e9;

    // Get the route path (or use the actual path if route is not available)
    const route = req.route ? req.route.path || req.path : req.path;

    // Increment the request counter
    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status_code: res.statusCode.toString()
    });

    // Observe the request duration
    httpRequestDurationSeconds.observe(
      {
        method: req.method,
        route: route
      },
      duration
    );

    // Call the original end method
    return originalEnd.apply(res, args as [any, any]);
  };

  next();
}
