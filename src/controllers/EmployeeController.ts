import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig'; 
import { Employee } from '../models/Employee';
import { Area } from '../models/Area';
export class EmployeeController {
  static getAll = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employees = await employeeRepository.find({ relations: ['area', 'manager', 'subordinates'] });
    res.send(employees);
  };

  static getById = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee = await employeeRepository.findOne({
      where: { id: parseInt(req.params.id) },
      relations: ['area', 'manager', 'subordinates']
    });
    if (!employee) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado encontrado', employee });
  };

  static create = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const areaRepository = AppDataSource.getRepository(Area);
  
    const { name, position, areaId, managerId } = req.body;
  
    try {
      const area = await areaRepository.findOne({ where: { id: areaId } });
      if (!area) {
        return res.status(400).json({ message: 'Área no encontrada' });
      }
  
      const manager = await employeeRepository.findOne({ where: { id: managerId } });
  
      const employee = new Employee();
      employee.name = name;
      employee.position = position;
      employee.area = area;
      employee.manager = manager;
  
      await employeeRepository.save(employee);
      res.status(201).json({ message: 'Empleado creado correctamente', employee });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el empleado', error: error.message });
    }
  };
  

  static update = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const areaRepository = AppDataSource.getRepository(Area);
  
    const { name, position, areaId, managerId } = req.body;
  
    try {
      const employee = await employeeRepository.findOne({ where: { id: parseInt(req.params.id) } });
      if (!employee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
  
      const area = await areaRepository.findOne({ where: { id: areaId } });
      const manager = await employeeRepository.findOne({ where: { id: managerId } });
  
      if (area) {
        employee.area = area;
      }
      if (manager) {
        employee.manager = manager;
      }
  
      employee.name = name;
      employee.position = position;
  
      await employeeRepository.save(employee);
      res.json({ message: 'Empleado actualizado correctamente', employee });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el empleado', error: error.message });
    }
  };
  
  static delete = async (req: Request, res: Response) => {
    const employeeRepository = AppDataSource.getRepository(Employee);
    try {
      const employee = await employeeRepository.findOne({ where: { id: parseInt(req.params.id) } });
      if (!employee) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
  
      await employeeRepository.remove(employee);
      res.status(204).json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el empleado', error: error.message });
    }
  };
  
}
