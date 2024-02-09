import { Injectable } from '@nestjs/common';
import { Employee } from './entities/employee.entity';
import { DeleteResult } from 'typeorm';
import { EmployeeProject } from '../employee-projects/entities/employee-project.entity';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { TeamRepository } from 'src/repositories/team.repository';
import { PositionRepository } from 'src/repositories/position.repository';
import { EmployeeProjectRepository } from 'src/repositories/employee-project.repository';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private projectRepository: EmployeeProjectRepository,
    private readonly teamRepository: TeamRepository,
    private readonly positionRepository: PositionRepository,
  ) {}

  async findTeamListAutoComplete() {
    return this.teamRepository.find({
      where: { bIsDeleted: false },
      select: ['iTeamId', 'vName'],
    });
  }

  async findPositionListAutoComplete(teamId: number) {
    return this.positionRepository.find({
      where: { iTeamId: teamId, bIsDeleted: false },
    });
  }

  async createEmployee(createEmployeeDto: Employee): Promise<Employee> {
    return this.employeeRepository.save(
      this.employeeRepository.create(createEmployeeDto),
    );
  }

  async getEmployeeList() {
    return this.employeeRepository.getEmployeeList();
  }

  async getEmployeeProjects(employeeId: number) {
    return this.projectRepository.find({
      where: { iEmployeeId: employeeId, bIsDeleted: false },
    });
  }

  async deleteEmployeeProjects(employeeId): Promise<DeleteResult> {
    return this.projectRepository.update(
      { iEmployeeId: employeeId },
      { bIsDeleted: true },
    );
  }

  async getPositionListByIds(ids: number[]) {
    return this.positionRepository.find({
      where: { bIsDeleted: false },
      select: ['iPositionId', 'vName'],
    });
  }

  async getTeamListByIds(ids: number[]): Promise<any> {
    return this.teamRepository.find({
      where: { bIsDeleted: false },
      select: ['iTeamId', 'vName'],
    });
  }

  async getEmployeeDetailsById(id: number) {
    return this.employeeRepository.getEmployeeDetails(id);
  }

  async updateEmployee(id: number, updateEmployeeDto: Employee) {
    return this.employeeRepository.update(
      { iEmployeeId: id },
      updateEmployeeDto,
    );
  }

  async deleteEmployee(id: number) {
    return this.employeeRepository.update(
      { iEmployeeId: id },
      { bIsDeleted: true },
    );
  }

  async getEmployeeCode(code: string) {
    return this.employeeRepository.findOneBy({ vEmployeeCode: code });
  }

  async projectAdd(data: EmployeeProject[]) {
    return this.projectRepository
      .createQueryBuilder()
      .insert()
      .into(EmployeeProject)
      .values(data)
      .execute();
  }

  async projectRemove(id: number) {
    return this.projectRepository.delete({ iEmployeeId: id, bIsDeleted: true });
  }
}
