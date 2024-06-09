import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Area } from './Area';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @ManyToOne(() => Area, area => area.employees)
  area: Area;

  @ManyToOne(() => Employee, employee => employee.subordinates)
  manager: Employee;

  @OneToMany(() => Employee, employee => employee.manager)
  subordinates: Employee[];
}
