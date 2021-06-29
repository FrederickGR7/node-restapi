export const config: any = {
    typeOrm: {
      type: 'postgres',
      host: process.env.HOST_POSTGRES || 'localhost',
      port: parseInt(process.env.HOST_POSTGRES_PORT as string) || 5432,
      username: process.env.HOST_POSTGRES_USERNAME || 'postgres',
      password: process.env.HOST_POSTGRES_PASS || 'postgres',
      database: process.env.HOST_POSTGRES_DB || 'postgrest',
      synchronize: true,
      // ssl: { rejectUnauthorized: false },
      entities: ["dist/entities/**/*.js"]
    },
    roles: process.env.ROLES || [
      {name: 'user', description: 'User Role'},
      {name: 'admin', description: 'Admin Role'}
    ],
    appPort: process.env.PORT || 3000,
    requestBodyLimit: process.env.REQUEST_BODY_LIMIT || '50mb',
    secret: process.env.SECRET || 'MyStrongSecret7'
  
  };
  
  