import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeProject } from 'src/apis/employee-projects/entities/employee-project.entity';
import { Team } from 'src/apis/team/entities/team.entity';
import { Position } from 'src/apis/position/entities/position.entity';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { TeamModule } from '../team/team.module';
import { PositionModule } from '../position/position.module';
import { EmployeeProjectsModule } from '../employee-projects/employee-projects.module';

@Module({
  imports: [
    TeamModule,
    PositionModule,
    EmployeeProjectsModule,
    TypeOrmModule.forFeature([Employee, EmployeeProject, Team, Position]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
