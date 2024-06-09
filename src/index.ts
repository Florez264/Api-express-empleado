import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import { AppDataSource } from './ormconfig'; 
import areaRoutes from './routes/areaRoutes';
import employeeRoutes from './routes/employeeRoutes';

const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.use('/areas', areaRoutes);
    app.use('/employees', employeeRoutes);

    const port = process.env.PORT ? parseInt(process.env.PORT) : 4000; 
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
