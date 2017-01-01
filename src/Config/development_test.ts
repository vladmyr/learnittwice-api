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
      database: 'learnittwice_test',
      poolSize: 100,
      binary: true,
      ssl: false, // ToDo: true
      schemaMigrations: {
        driver: 'pg',
        migrationsDir: '/src/App/Persistence/Repositories/Postgres/Migrations',
        schema: '_SchemaVersion',
        migrationTable: '_SchemaVersion',
        verbose: true,
        dryRun: true
      }
    }
  }
}

export default config;