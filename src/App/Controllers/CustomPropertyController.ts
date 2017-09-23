import * as Core from 'express-serve-static-core';

import { ID_SCHEMA, CREATE_SCHEMA, UPDATE_SCHEMA } 
  from 'src/App/Infrastructure/CustomProperty/Schemas/ValidationSchema';

import CustomPropertyService 
  from 'src/App/Infrastructure/CustomProperty/Services/CustomPropertyService';
import AbstractHttpController from './AbstractHttpController';

class CustomPropertyController extends AbstractHttpController {
  public constructor() {
    super('/custom_properties');

    this.router.post('/', 
      this._validateBody(CREATE_SCHEMA),
      this._createOne.bind(this)
    );
    this.router.get('/:id', 
      this._validateParams(ID_SCHEMA),
      this._getOne.bind(this)
    );
    this.router.post('/:id', 
      this._validateParams(ID_SCHEMA),
      this._validateBody(UPDATE_SCHEMA),
      this._updateOne.bind(this)
    );
    this.router.delete('/:id', 
      this._validateParams(ID_SCHEMA),
      this._deleteOne.bind(this)
    );
  }

  private async _createOne(
    req: Core.Request,
    res: Core.Response,
    next: Core.NextFunction
  ) {
    try {
      const record = await CustomPropertyService.CreateOne(req.body);

      return res
        .status(201)
        .json({
          data: record
        })
    } catch (e) {
      return next(e);
    }
  }

  private async _getOne(
    req: Core.Request,
    res: Core.Response,
    next: Core.NextFunction
  ) {
    try {
      const record = await CustomPropertyService
        .FindOne(Number.parseInt(req.params.id));

      return res
        .status(200)
        .json({
          data: record
        })
    } catch (e) {
      return next(e)
    }
  }
  private _updateOne() {}
  private _deleteOne() {}
}

export default CustomPropertyController;