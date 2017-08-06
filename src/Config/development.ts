const config = {
  database: {
    mongodb: {
      uri: 'mongodb://127.0.0.1:27017/learnittwicev2',
      name: 'learnittwicev2',
      options: {
        user: undefined,
        password: undefined,
        server: {
          poolSize: 100
        }
      }
    },
    postgres: {
      protocol: 'postgres',
      user: 'postgres',
      password: 'docker',
      host: '127.0.0.1',
      port: 5432,
      database: 'docker',
      poolSize: 100,
      binary: true,
      ssl: false, // ToDo: true
      // FIXME: not used
      schemaMigrations: {
        driver: 'pg',
        migrationsDir: 'src/App/Persistence/Repositories/Postgres/Migrations',
        schema: '_SchemaVersion',
        migrationTable: '_SchemaVersion',
        verbose: true,
        dryRun: true
      }
    },
    neo4j: {
      host: '127.0.0.1',
      port: '7687',
      user: 'neo4j',
      password: 'docker',
      poolSize: 1
    },
    neo4jMigrations: {
      migrationsDir: 'src/App/Persistence/Repositories/Neo4j/Migrations',
      nodeLabel: 'MigrationVersion'
    }
  }
}

export default config;