import { Injectable } from '@nestjs/common';
import { EmployeeProject } from 'src/apis/employee-projects/entities/employee-project.entity';
import { Team } from 'src/apis/team/entities/team.entity';
import { DataSource, DeleteResult, InsertResult, Repository } from 'typeorm';

@Injectable()
export class EmployeeProjectRepository extends Repository<EmployeeProject> {
  constructor(private dataSource: DataSource) {
    super(EmployeeProject, dataSource.createEntityManager());
  }

  async getEmployeeProjectList(): Promise<EmployeeProject[]> {
    return this.find();
  }

  async createProject(data): Promise<InsertResult> {
    return this.createQueryBuilder()
      .insert()
      .into(EmployeeProject)
      .values(data)
      .execute();
  }

  async deleteProjects(employeeId: number): Promise<DeleteResult> {
    return this.delete({ iEmployeeId: employeeId });
  }
}
