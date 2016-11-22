import { Mongoose as UtilMongoose } from 'src/App/Domain/Helpers/Util';
import InfoSchema from './NestedSchemas/InfoSchema';

const Lemma = UtilMongoose.DefineModel('lemma', {
  importId: {
    type: Number,
    required: true
  },
  lemma: {
    type: String,
    required: true
  },
  info: [InfoSchema]
}, {
  index: [{
    fields: {
      lemma: 1,
      'info.language': 1
    },
    options: {
      unique: true
    }
  }, {
    fields: {
      'info.sense.synsetId': 1
    }
  }, {
    fields: {
      lemma: 1,
      "info.language": 1
    },
    options: {
      unique: true
    }
  }, {
    fields: {
      "info.sense.synsetId": 1
    }
  }, {
    fields: {
      "info.sense.baseLemmaId": 1
    }
  }, {
    fields: {
      "info.order": -1
    }
  }]
});

export default Lemma;