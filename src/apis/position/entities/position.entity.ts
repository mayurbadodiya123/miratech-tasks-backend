import { Employee } from 'src/apis/employee/entities/employee.entity';
import { Team } from 'src/apis/team/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  iPositionId: number;

  @Column()
  vName!: string;

  @Column()
  tDescription!: string;

  @Column()
  iTeamId!: number;

  @Column({ default: false })
  bIsDeleted!: boolean;
}
