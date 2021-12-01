import { ConnectionOptions } from 'typeorm';
require('dotenv').config();

const ORMConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'kible',
  synchronize: true,
  logging: process.env.NODE_ENV === 'production' ? false : true,
  timezone: '+09:00',
  entities:
    process.env.NODE_ENV === 'production' ? ['build/entities/**/*.js'] : ['src/entities/**/*.ts'],
  migrations:
    process.env.NODE_ENV === 'production'
      ? ['build/migrations/**/*.js']
      : ['src/migrations/**/*.ts'],
  subscribers:
    process.env.NODE_ENV === 'production'
      ? ['build/subscribers/**/*.js']
      : ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: process.env.NODE_ENV === 'production' ? 'build/entities' : 'src/entities',
    migrationsDir: process.env.NODE_ENV === 'production' ? 'build/migrations' : 'src/migrations',
    subscribersDir: process.env.NODE_ENV === 'production' ? 'build/subscribers' : 'src/subscribers',
  },
};

export default ORMConfig;
