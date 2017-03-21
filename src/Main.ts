import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import Application from 'src/App/Application';
import { MongooseModels } from 'src/App/Persistence/ODM/Mongoose/Models';
import PostgresModels from 'src/App/Persistence/Repositories/PostgresModels';
import Neo4jModels from 'src/App/Persistence/Repositories/Neo4jModels';

const main = ():void => {
  const application = new Application();

  Promise
    .resolve()
    .then(() => {
      return application.initialize();
    })
    // .then(() => {
    //   return application.dbConnectors.neo4jDBConnector
    //     .inSession((session, fulfill, reject) => {
    //       return session
    //         .run('MATCH (people:Person) RETURN people.name LIMIT 10')
    //         .then(fulfill)
    //         .catch(reject)
    //     })
    // })
    // .then((result) => {
    //   console.log('Neo4j -> Person -> people.name', result);
    // })
    .then(() => {
      return Neo4jModels.LemmaCommandsGph.GetInstance()
        .createOne(1)
        .then((data) => {
          console.log('Neo4j -> Lemma', data);
        })
    })
    .then(() => {
      return application.dbConnectors.neo4jDBConnector
        .inSession((session, fulfill, reject) => {
          return Neo4jModels.LemmaCommandsGph.GetInstance()
            .createOne(2, session)
            .then(() => {
              return Neo4jModels.LemmaCommandsGph.GetInstance()
                .createOne(3, session);
            })
            .then(fulfill)
            .catch(reject);
        })
    })
    // .then(() => {
    //   return MongooseModels.Synset.find().limit(1);
    // })
    // .then((record: mongoose.MongooseDocument[]) => {
    //   console.log('Mongoose -> Synset -> find()', record.map(r => r.toObject()));
    // })
    // .then(() => {
    //   return PostgresModels.LemmaQueries.GetInstance().findOne(123);
    // })
    // .then((result) => {
    //   console.log('PG -> LemmaQueries -> findOne', result);
    //   return PostgresModels.LemmaQueries.GetInstance().findMany([11,23, 123, 5]);
    // })
    // .then((result) => {
    //   console.log('PG -> LemmaQueries -> findMany', result);
    .then(() => {
      process.exit(0);
    })
    .catch((e) => {
      console.error(e);
      process.exit(0);
    })
}

export default main;