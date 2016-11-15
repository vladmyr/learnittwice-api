import * as _ from 'underscore';
import * as mongoose from 'mongoose';

const MongooseDeepPopulate = require('mongoose-deep-populate');
const MongoosePopulateExtended = require('mongoose-populate-extended');

// empty function
const noop = Function.prototype;
const TO_JSON_OMIT = ['_id', '__v'];



// interfaces
interface ISchemaDescription {

}

interface IDefineSchemaOptions {
  virtuals?: any,
  index?: Array<Object>
  staticMethods?: Object,
  instanceMethods?: Object,
  autoIndex?: boolean,
  deepPopulateOptions?: Object
}



/**
 * Enhancements for Mongodb models
 * @model
 */
class Mongoose {
  /**
   * Define mongoose model
   */
  static DefineSchema(schemaDescription: Object, options: IDefineSchemaOptions): mongoose.Schema {
    const mongooseDeepPopulate = MongooseDeepPopulate(mongoose);
    const mongoosePopulateExtended = MongoosePopulateExtended(mongoose);

    // options defaults
    options = _.defaults({
      // virtual attributes
      virtuals: undefined,
      // model secondary indexes
      index: undefined,
      // model custom methods
      staticMethods: undefined,
      // model's instance custom methods
      instanceMethods: undefined,
      // auto index only in development environment
      autoIndex: false,
      // deepPopulate plugin options
      deepPopulateOptions: undefined
    }, options);

    const schema = new mongoose.Schema(schemaDescription, {
      autoIndex: options.autoIndex,
      toObject: {
        virtuals: true
      },
      toJSON: {
        virtuals: true
      }
    });

    // define indexes
    if (_.isArray(options.index)) {
      _.each(options.index, (index: any) => {
        schema.index(index.fields, index.options || {});
      });
    }

    // define model static methods
    if (!_.isEmpty(options.staticMethods)) {
      _.extend(schema.statics, options.staticMethods);
    }

    // define model instance methods
    if (!_.isEmpty(options.instanceMethods)) {
      _.extend(schema.methods, options.instanceMethods);
    }

    // define virtual attributes
    if (!_.isEmpty(options.virtuals)) {
      _.each(options.virtuals, (opts, key: string) => {
        let virtual = schema.virtual(key);

        virtual.get(options.virtuals[key].get || noop);
        virtual.set(options.virtuals[key].set || noop);
      });
    }

    // register plugins
    schema.plugin(mongooseDeepPopulate, options.deepPopulateOptions);
    schema.plugin(mongoosePopulateExtended);

    return schema;
  }

  static DefineModel(modelName: string, schemaDescription: Object, options: IDefineSchemaOptions): mongoose.Model<any> {
    const schema = Mongoose.DefineSchema(schemaDescription, options);
    return mongoose.model(modelName, schema);
  }

  /**
   * Map single or an array of mongoose model instances into plaint Object
   * @param   {Mongoose.Model|Array<Mongoose.Model>}  arr
   * @returns {Array<Object>}
   */
  static mapToObject(arr) {
    arr = _.isArray(arr) ? arr : [arr];

    return _.map(arr, (item:any) => {
      return item.toObject();
    });
  }
  static toObject(arr) {
    return this.mapToObject(arr);
  }

  /**
   * Map single or an array of mongoose model instances into JSON
   * @param   {Mongoose.Model|Array<Mongoose.Model>} arr
   * @returns {Array<Object>}
   */
  static toJSON(arr) {
    arr = _.isArray(arr) ? arr : [arr];

    return _.map(arr, (item:any) => {
      return _.omit(item.toJSON
        ? item.toJSON()
        : item,
      TO_JSON_OMIT);
    });
  }
}

export default Mongoose;