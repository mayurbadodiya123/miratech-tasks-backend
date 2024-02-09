import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeProjectsService } from './employee-projects.service';
import { CreateEmployeeProjectDto } from './dto/create-employee-project.dto';
import { UpdateEmployeeProjectDto } from './dto/update-employee-project.dto';

@Controller('employee-projects')
export class EmployeeProjectsController {
  constructor(private readonly employeeProjectsService: EmployeeProjectsService) {}

  @Post()
  create(@Body() createEmployeeProjectDto: CreateEmployeeProjectDto) {
    return this.employeeProjectsService.create(createEmployeeProjectDto);
  }

  @Get()
  findAll() {
    return this.employeeProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeProjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeProjectDto: UpdateEmployeeProjectDto) {
    return this.employeeProjectsService.update(+id, updateEmployeeProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeProjectsService.remove(+id);
  }
}
