import { Injectable } from '@nestjs/common';
import { Employee } from 'src/apis/employee/entities/employee.entity';
import { Team } from 'src/apis/team/entities/team.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class EmployeeRepository extends Repository<Employee> {
  constructor(private dataSource: DataSource) {
    super(Employee, dataSource.createEntityManager());
  }

  async getEmployeeList(): Promise<Employee[]> {
    return this.createQueryBuilder('employee')
      .select([
        'employee.iEmployeeId',
        'employee.vEmployeeCode',
        'employee.vFirstName',
        'employee.vLastName',
        'employee.iTeamId',
        'employee.iPositionId',
      ])
      .where('employee.bIsDeleted = :bIsDeleted', { bIsDeleted: false })
      .getMany();
  }

  async getEmployeeDetails(id: number): Promise<Employee> {
    return this.createQueryBuilder('employee')
      .where('employee.iEmployeeId = :id', { id })
      .andWhere('employee.bIsDeleted = :bIsDeleted', { bIsDeleted: false })
      .getOne();
  }
}
