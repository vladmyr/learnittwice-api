const config = {
  server: {
    api: {
      port:8090
    }
  },
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
      port: 5433,
      database: 'learnittwice_test',
      poolSize: 100,
      binary: true,
      ssl: false, // ToDo: true
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
      port: '7697',
      user: 'neo4j',
      password: 'docker',
      poolSize: 1
    },
    neo4jMigrations: {
      path: 'src/App/Persistence/Repositories/Neo4j/Migrations',
      nodeLabel: 'MigrationVersion'
    }
  },
  filepath: {
    databaseDump: {
      postgres: 'src/Test/Persistence/Postgres/Seeds/dump_postgres_test.sql',
      neo4j: 'src/Test/Persistence/Neo4j/Seeds/neo4j_graph_seed.cql'
    }
  },
  path: {
    app: 'src/App',
    persistence: {
      postgres: 'src/App/Persistence/Repositories/Postgres',
      neo4j: 'src/App/Persistence/Repositories/Neo4j'
    }
  },
  regexMatch: {
    specFiles: /.*Spec.js$/
  }
}

export default config;