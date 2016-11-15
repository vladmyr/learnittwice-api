import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import Application from 'src/App/Application';

const application = new Application();

Promise
  .resolve()
  .then(() => {
    return application.initialize();
  })
  .then(() => {
    return application.mongooseDBConnector.Models.Synset.find().limit(1);
  })
  .then((record: mongoose.MongooseDocument[]) => {
    console.log(record.map(r => r.toObject()));
    process.exit(0);
  });
