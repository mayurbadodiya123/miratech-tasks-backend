import { Employee } from 'src/apis/employee/entities/employee.entity';
import { Position } from 'src/apis/position/entities/position.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  iTeamId: number;

  @Column()
  vName!: string;

  @Column()
  vDescription!: string;

  @Column({ default: false })
  bIsDeleted!: boolean;
}
