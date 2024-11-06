import 'dotenv/config';

import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const postgresConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  migrations: ['src/migration/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migration' },
  synchronize: true,
};

export default registerAs('typeorm', () => postgresConfig);
export const connectionSource = new DataSource({
  ...postgresConfig,
} as DataSourceOptions);
