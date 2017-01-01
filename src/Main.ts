import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import Application from 'src/App/Application';
import { MongooseModels } from 'src/App/Persistence/ODM/Mongoose/Models';
import PostgresModels from 'src/App/Persistence/Repositories/PostgresModels';

const main = ():void => {
  const application = new Application();

  Promise
    .resolve()
    .then(() => {
      return application.initialize();
    })
    .then(() => {
      return MongooseModels.Synset.find().limit(1);
    })
    .then((record: mongoose.MongooseDocument[]) => {
      console.log('Mongoose -> Synset -> find()', record.map(r => r.toObject()));
    })
    .then(() => {
      return PostgresModels.LemmaQueries.GetInstance().findOne(123);
    })
    .then((result) => {
      console.log('PG -> LemmaQueries -> findOne', result);
      return PostgresModels.LemmaQueries.GetInstance().findMany([11,23, 123, 5]);
    })
    .then((result) => {
      console.log('PG -> LemmaQueries -> findMany', result);
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(0);
    })
}

export default main;