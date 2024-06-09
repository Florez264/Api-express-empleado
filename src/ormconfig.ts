import { DataSource } from 'typeorm';
import { Area } from './models/Area';
import { Employee } from './models/Employee';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123',
  database: 'empleados',
  synchronize: true,
  logging: false,
  entities: [Area, Employee],
  migrations: [],
  subscribers: [],
});
