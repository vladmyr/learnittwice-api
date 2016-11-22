// 'use strict';

// /** Nested into Lemma model infoSchema */
// module.exports = (defineSchema, SchemaTypes) => {
//   const senseSchema = alias.require('@file.modelsMongo.nestedSchemas.senseSchema')(defineSchema, SchemaTypes);
//   const infoSchema = defineSchema({
//     language: {
//       type: String,
//       required: true
//     },
//     order: Number,
//     sense: [senseSchema]  // denormalized embedded sense information
//   });

//   return infoSchema;
// };

import { Mongoose as UtilMongoose } from 'src/App/Domain/Helpers/Util';
import SenseSchema from './SenseSchema';

const InfoSchema = UtilMongoose.DefineSchema({
  language: {
    type: String,
    required: true
  },
  order: Number,
  sense: [SenseSchema] 
});

export default InfoSchema;