import { Injectable } from '@nestjs/common';
import { Position } from 'src/apis/position/entities/position.entity';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class PositionRepository extends Repository<Position> {
  constructor(private dataSource: DataSource) {
    super(Position, dataSource.createEntityManager());
  }

  async getPositionList(): Promise<Position[]> {
    return this.createQueryBuilder('p')
      .select(['p.iPositionId', 'p.vName', 'p.iTeamId', 'p.tDescription'])
      .getMany();
  }

  async getPositionListAutocomplete(teamId: number): Promise<Position[]> {
    return this.find({ where: { iTeamId: teamId } });
  }

  async getPositionDetails(id: number): Promise<Position> {
    return this.createQueryBuilder('p')
      .select(['p.iPositionId', 'p.vName', 'p.iTeamId', 'p.tDescription'])
      .getOne();
  }
}
