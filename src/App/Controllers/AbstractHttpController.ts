import * as Joi from 'joi';
import * as Core from 'express-serve-static-core';
import * as Express from 'express';

import ValidationException 
  from 'src/App/Domain/Exceptions/Operational/ValidationException';

abstract class HttpController {
  private _rootPath: string;
  private _router: Core.IRouter;

  public constructor (rootPath: string) {
    this._rootPath = rootPath;
    this._router = Express.Router();
  }

  public get router(): Core.IRouter {
    return this._router;
  }

  public get rootPath(): string {
    return this._rootPath;
  }

  protected _validateParams(schemas: Joi.Schema | Joi.Schema[]) {
    return this._validate(schemas);
  }

  protected _validateBody(schemas: Joi.Schema | Joi.Schema[]) {
    return this._validate(schemas, 'body');
  }

  protected _validateQuery(schemas: Joi.Schema | Joi.Schema[]) {
    return this._validate(schemas, 'query');
  }

  private _validate(
    schemas: Joi.Schema | Joi.Schema[], 
    prop: 'params' | 'body' | 'query' = 'params'
  ) {
    let lstSchema: Joi.Schema[];

    if (!Array.isArray(schemas)) {
      lstSchema = [schemas];
    }

    return (
      req: Core.Request, 
      res: Core.Response, 
      next: Core.NextFunction
    ) => {
      let schemaIndex = 0;
      let isValid = false;
      let schema: Joi.Schema;

      while (!isValid && schemaIndex < lstSchema.length) {
        schema = lstSchema[schemaIndex];
        try {
          const validationResult = Joi.validate(req[prop], schema);
          isValid = !validationResult.error;
        } catch (e) {
          // FIXME: logging
          console.error(e);
        } finally {
          schemaIndex++;
        }
      }

      if (isValid) {
        // keep reference of valid schema
        if (!res.locals.schema) res.locals.schema = {}
        res.locals.schema[prop] = schema;
        return next();
      } else {
        return next(new ValidationException());
      }
    }
  }
}

export default HttpController;