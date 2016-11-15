import * as mongoose from 'mongoose';
import Synset from './Models/Synset';

interface IMongooseModels {
  Synset: mongoose.Model<any>;
}

const MongooseModels:IMongooseModels = {
  Synset
}

export { IMongooseModels, MongooseModels }