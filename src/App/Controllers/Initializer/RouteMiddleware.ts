import * as Core from 'express-serve-static-core';
import OperationalException 
  from 'src/App/Domain/Exceptions/Operational/OperationalException';

class RouteMiddleware {
  public static Entry(
    req: Core.Request, 
    res: Core.Response, 
    next: Core.NextFunction
  ) {
    return next();
  }

  public static NotFound(
    req: Core.Request, 
    res: Core.Response, 
    next: Core.NextFunction
  ) {
    res.json({ 
      error: {
        code: 404,
        message: `No route found for "${req.baseUrl}"`
      }
    })
  }

  public static OperationalException(
    err: Error,
    req: Core.Request, 
    res: Core.Response, 
    next: Core.NextFunction
  ) {
    // skip non-operational exceptions
    if (!(err instanceof OperationalException)) {
      return next(err);
    }

    return res
      .status((err as OperationalException).statusCode)
      .json({
        error: {
          code: err.statusCode,
          message: err.message
        }
      })
  }

  public static UnhandledException(
    err: Error, 
    req: Core.Request, 
    res: Core.Response, 
    next: Core.NextFunction
  ) {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(500).json({
      error: {
        code: 500,
        message: err.message
      }
    })
  }
}

export default RouteMiddleware;