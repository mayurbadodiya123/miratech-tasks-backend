import { Injectable } from '@nestjs/common';
import { CreateEmployeeProjectDto } from './dto/create-employee-project.dto';
import { UpdateEmployeeProjectDto } from './dto/update-employee-project.dto';

@Injectable()
export class EmployeeProjectsService {
  create(createEmployeeProjectDto: CreateEmployeeProjectDto) {
    return 'This action adds a new employeeProject';
  }

  findAll() {
    return `This action returns all employeeProjects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeeProject`;
  }

  update(id: number, updateEmployeeProjectDto: UpdateEmployeeProjectDto) {
    return `This action updates a #${id} employeeProject`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeeProject`;
  }
}
