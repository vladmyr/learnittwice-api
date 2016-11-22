import * as mongoose from 'mongoose';

import Synset from './Models/Synset';
import Language from './Models/Language';
import Lemma from './Models/Lemma';

interface IMongooseModels {
  Synset: mongoose.Model<any>;
  Language: mongoose.Model<any>;
  Lemma: mongoose.Model<any>;
}

const MongooseModels:IMongooseModels = {
  Synset,
  Language,
  Lemma
}

export { IMongooseModels, MongooseModels }