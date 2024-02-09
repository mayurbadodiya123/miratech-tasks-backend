import { Injectable } from '@nestjs/common';
import { Team } from 'src/apis/team/entities/team.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TeamRepository extends Repository<Team> {
  constructor(private dataSource: DataSource) {
    super(Team, dataSource.createEntityManager());
  }

  async getTeamAutoCompleteList(): Promise<Team[]> {
    return this.find();
  }
}
