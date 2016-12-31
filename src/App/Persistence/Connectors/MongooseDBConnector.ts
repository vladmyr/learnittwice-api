import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';

class MongooseDBConnector {
  private _uri:string = '';
  private _options:Object = {};
  private _mongoose:mongoose.Mongoose = mongoose;

  public constructor(uri:string, options:Object) {
    this._uri = uri;
    this._options = options;
    this._mongoose.Promise = Promise;
  }

  public initialize(): Promise<MongooseDBConnector> {
    const self = this;

    return new Promise((fulfill, reject) => {
      self._mongoose.set('debug', true);
      self._mongoose.connect(self._uri, self._options);
      self._mongoose.connection.on('error', reject);
      self._mongoose.connection.once('open', fulfill);
    }).then(() => {
      return self;
    });
  }

  public getMongoose():mongoose.Mongoose {
    return this._mongoose;
  }
}

export default MongooseDBConnector;