import { Module } from '@nestjs/common';
import { EmployeeProjectsService } from './employee-projects.service';
import { EmployeeProjectsController } from './employee-projects.controller';
import { EmployeeProject } from './entities/employee-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeProjectRepository } from 'src/repositories/employee-project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeProject])],
  controllers: [EmployeeProjectsController],
  providers: [EmployeeProjectsService, EmployeeProjectRepository],
  exports: [EmployeeProjectRepository],
})
export class EmployeeProjectsModule {}
