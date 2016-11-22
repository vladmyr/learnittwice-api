import { Mongoose as UtilMongoose } from 'src/App/Domain/Helpers/Util';

const Language = UtilMongoose.DefineModel('language', {
  _id: String,
  alphabet: [{
    letter: String,
    count: Number
  }]
});

export default Language;