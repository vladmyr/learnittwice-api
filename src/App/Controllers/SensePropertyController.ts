import * as Core from 'express-serve-static-core';

import { ID_SCHEMA, CREATE_SCHEMA, UPDATE_SCHEMA }
  from 'src/App/Infrastructure/SenseProperty/Schemas/ValidationSchema';

import SensePropertyService
  from 'src/App/Infrastructure/SenseProperty/Services/SensePropertyService';
import AbstractHttpController from './AbstractHttpController';

class SensePropertyController extends AbstractHttpController {
  public constructor() {
    super('/sense_properties');

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
      const record = await SensePropertyService.CreateOne(req.body);

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
      const record = await SensePropertyService
        .FindOne(Number.parseInt(req.params.id));

      if (record) {
        return res
          .status(200)
          .json({
            data: record
          })
      } else {
        return res.status(404).end();
      }
    } catch (e) {
      return next(e)
    }
  }
  private async _updateOne(
    req: Core.Request,
    res: Core.Response,
    next: Core.NextFunction
  ) {
    try {
      const record = await SensePropertyService
        .UpdateOne(req.params.id, req.body);

      if (record) {
        return res
          .status(201)
          .json({
            data: record
          })
      } else {
        return res.status(404).end();
      }
    } catch (e) {
      return next(e);
    }
  }
  private async _deleteOne(
    req: Core.Request,
    res: Core.Response,
    next: Core.NextFunction
  ) {
    try {
      await SensePropertyService.DeleteOne(req.params.id);

      return res.status(204).send();
    } catch (e) {
      return next(e);
    }
  }
}

export default SensePropertyController;