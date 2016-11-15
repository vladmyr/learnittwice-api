import * as _ from 'underscore';
import { SchemaTypes } from 'mongoose';
import { Mongoose as UtilMongoose } from 'src/App/Domain/Helpers/Util';

const Synset = UtilMongoose.DefineModel('synset', {
  importId: Number,
  definition: [{
    language: String,
    text: String,
    examples: [String],
    sourceId: SchemaTypes.ObjectId
  }]
}, {
  virtuals: {
    synonyms: {
      get() {
        _.isUndefined(this.__synonyms) && (this.__synonyms = []);
        return this.__synonyms;
      },
      set(synonyms) {
        this.__synonyms = synonyms;
      }
    },
    translation: {
      get() {
        _.isUndefined(this.__translation) && (this.__translation = []);
        return this.__translation;
      },
      set(translation) {
        this.__translation = translation;
      }
    }
  },
  index: [{
    fields: {
      _id: 1,
      'definition.language': 1
    },
    options: {
      name: 'definition.language',
      unique: true
    }
  }]
})

export default Synset;