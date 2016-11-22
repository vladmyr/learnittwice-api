import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';

import { IMongooseModels, MongooseModels} from 'src/App/Persistence/ODM/Mongoose/Models';

class MongooseDBConnector {
  private _uri:string = '';
  private _options:Object = {};

  public mongoose = mongoose;
  public Models:IMongooseModels = MongooseModels;

  public constructor(uri:string, options:Object) {
    this._uri = uri;
    this._options = options;
    this.mongoose.Promise = Promise;
  }

  public initialize(): Promise<MongooseDBConnector> {
    const self = this;

    return new Promise((fulfill, reject) => {
      self.mongoose.set('debug', true);
      self.mongoose.connect(self._uri, self._options);
      self.mongoose.connection.on('error', reject);
      self.mongoose.connection.once('open', fulfill);
    }).then(() => {
      return self;
    });
  }
}

export default MongooseDBConnector;