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
    }
  }
}

export default config;