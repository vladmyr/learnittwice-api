// 'use strict';

// /** Nested into infoSchema senseSchema */
// module.exports = (defineSchema, SchemaTypes) => {
//   const senseSchema = defineSchema({
//     importId: Number,
//     synsetId: {
//       type: SchemaTypes.ObjectId,
//       ref: "synset",
//       asVirtual: "synset"
//     },
//     baseLemmaId: {
//       type: SchemaTypes.ObjectId,
//       required: true
//     },
//     wordform: Object,
//     tagCount: Number,
//     order: Number
//   });

//   return senseSchema;
// };

import { SchemaTypes } from 'mongoose';
import { Mongoose as UtilMongoose } from 'src/App/Domain/Helpers/Util';

const SenseSchema = UtilMongoose.DefineSchema({
  importId: Number,
  synsetId: {
    type: SchemaTypes.ObjectId,
    ref: 'synset',
    asVirtual: 'synset'
  },
  baseLemmaId: {
    type: SchemaTypes.ObjectId,
    required: true
  },
  workform: Object,
  tagCount: Number,
  order: Number
});

export default SenseSchema;

