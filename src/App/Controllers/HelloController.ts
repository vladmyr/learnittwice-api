import * as Core from 'express-serve-static-core';

import AbstractHttpController from './AbstractHttpController';

class HelloController extends AbstractHttpController {
  public constructor() {
    super('/hello');

    this.router.get('/',
      this._greet.bind(this)
    )
  }

  private _greet(
    req: Core.Request,
    res: Core.Response,
    next: Core.NextFunction
  ) {
    return res.status(200).json({
      data: {
        message: 'Hello world'
      }
    })
  }
}

export default HelloController;