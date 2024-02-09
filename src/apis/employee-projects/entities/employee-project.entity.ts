import { Employee } from 'src/apis/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EmployeeProject {
  @PrimaryGeneratedColumn()
  iEmployeeProjectId: number;

  @Column()
  iEmployeeId!: number;

  @Column()
  vProjectName!: string;

  @Column()
  dStartDate!: Date;

  @Column()
  dEndDate!: Date;

  @Column({ default: false })
  bIsDeleted!: boolean;
}
