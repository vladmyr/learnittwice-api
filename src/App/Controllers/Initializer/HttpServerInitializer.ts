import * as Core from 'express-serve-static-core';
import * as Http from 'http';

import * as Express from 'express';
import * as Compression from 'compression';
import * as BodyParser from 'body-parser';

import RouteMiddleware from './RouteMiddleware';

import AbstractHttpController from '../AbstractHttpController'
import HelloController from '../HelloController';
import CustomPropertyController from '../CustomPropertyController';

interface IConfig {
  port: number
}

class HttpServerInitializer {
  private _config: IConfig;
  private _expressApp: Core.Express;
  private _server: Http.Server;

  public constructor(config: IConfig) {
    this._config = config;
    this._expressApp = Express();
  }

  public initialize(): HttpServerInitializer {
    this._expressApp.use(Compression());  // enable gzip
    this._expressApp.use(BodyParser.json());   // parse http request body

    // register middleware to execute for each request
    this._expressApp.use(RouteMiddleware.Entry);

    // initialize each controller
    this._initializeController(new HelloController());
    this._initializeController(new CustomPropertyController());

    // register url-not-found middleware
    this._expressApp.use('*', RouteMiddleware.NotFound)

    // register exception handlers
    this._expressApp.use(RouteMiddleware.OperationalException);
    this._expressApp.use(RouteMiddleware.UnhandledException);

    return this;
  }

  public async start(): Promise<HttpServerInitializer> {
    if (!this._isServerRunning()) {
      try {
        console.log('Starting an HTTP server...')
        this._server = await this._expressApp.listen(this._config.port, () => {
          return Promise.resolve()
        });
        console.log(`Listening on port ${this._config.port}`);
      } catch(e) {
        console.log('An error occurred:', e);
      }
    }
    
    return this;
  }

  public async stop(): Promise<HttpServerInitializer> {
    if (this._isServerRunning()) {
      try {
        console.log('Stopping server...')
        await this._server.close(() => {
          return Promise.resolve()
        });
        console.log('Done');
      } catch(e) {
        console.log('An error occurred:', e);
      }
    }
    
    return this;
  }

  public get expressApp(): Core.Express {
    return this._expressApp;
  }

  private _isServerRunning(): boolean {
    return !!(this._server && !this._server.listening);
  }

  private _initializeController(controller: AbstractHttpController): void {
    this._expressApp.use(controller.rootPath, controller.router);
    return;
  }
}

export default HttpServerInitializer;