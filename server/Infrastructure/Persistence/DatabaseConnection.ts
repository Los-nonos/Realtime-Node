import { createConnection } from 'typeorm';

class DatabaseConnection {
  public async getConnection(): Promise<void> {
    const db_username = process.env.DATABASE_USERNAME;
    const db_password = process.env.DATABASE_PASSWORD;
    const db_database = process.env.DATABASE_DATABASE;
    const db_port = process.env.DATABASE_PORT;
    const db_host = process.env.DATABASE_HOST;
    const db_migrations_table = process.env.DATABASE_MIGRATIONS_TABLE_NAME;

    console.info(`Mode: ${process.env.NODE_ENV}`);
    console.info(`Host: ${db_host}`);

    await createConnection({
      type: 'mysql',
      host: db_host,
      port: Number(db_port),
      username: db_username,
      password: db_password,
      database: db_database,
      synchronize: false,
      logging: true,
      migrations: ['./dist/Infrastructure/Persistence/Migrations/*.js'],
      migrationsTableName: db_migrations_table,
      migrationsRun: true,
      entities: ['./dist/Domain/Entities/*.js'],
      cli: {
        migrationsDir: './Infrastructure/Persistence/Migrations',
      },
    }).catch(err => console.log('error connection to db: ' + err));
  }
}

export default DatabaseConnection;