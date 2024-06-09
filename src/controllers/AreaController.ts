import { Request, Response } from 'express';
import { AppDataSource } from '../ormconfig';
import { Area } from '../models/Area';

export class AreaController {
  static getAll = async (req: Request, res: Response) => {
    const areaRepository = AppDataSource.getRepository(Area);
    const areas = await areaRepository.find();
    res.send(areas);
  };

  static getById = async (req: Request, res: Response) => {
    const areaRepository = AppDataSource.getRepository(Area);
    const area = await areaRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.send(area);
  };

  static create = async (req: Request, res: Response) => {
    const areaRepository = AppDataSource.getRepository(Area);
    const area = areaRepository.create(req.body);
    try {
      await areaRepository.save(area);
      res.status(201).json({ message: 'Área creada correctamente', area });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el área', error: error.message });
    }
  };
  
  static update = async (req: Request, res: Response) => {
    const areaRepository = AppDataSource.getRepository(Area);
    const area = await areaRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    try {
      areaRepository.merge(area, req.body);
      await areaRepository.save(area);
      res.json({ message: 'Área actualizada correctamente', area });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el área', error: error.message });
    }
  };

  static delete = async (req: Request, res: Response) => {
    const areaRepository = AppDataSource.getRepository(Area);
    const area = await areaRepository.findOneBy({ id: parseInt(req.params.id) });
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    try {
      await areaRepository.remove(area);
      res.status(204).json({ message: 'Área eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el área', error: error.message });
    }
  };
}
