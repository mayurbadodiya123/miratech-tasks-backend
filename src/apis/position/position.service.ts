import { Injectable } from '@nestjs/common';
import { Position } from './entities/position.entity';
import { DeleteResult, In, UpdateResult } from 'typeorm';
import { Team } from 'src/apis/team/entities/team.entity';
import { PositionRepository } from 'src/repositories/position.repository';
import { TeamRepository } from 'src/repositories/team.repository';

@Injectable()
export class PositionService {
  constructor(
    private positionRepository: PositionRepository,
    private teamRepository: TeamRepository,
  ) {}

  async createPosition(createPositionDto: Position): Promise<Position> {
    return this.positionRepository.save(
      this.positionRepository.create(createPositionDto),
    );
  }

  async getPositionList(): Promise<Position[]> {
    return this.positionRepository.getPositionList();
  }

  async getPositionDetailById(id: number): Promise<Position> {
    return this.positionRepository.getPositionDetails(id);
  }

  async updatePosition(
    id: number,
    updatePositionDto: Position,
  ): Promise<UpdateResult> {
    return this.positionRepository.update(
      { iPositionId: id },
      updatePositionDto,
    );
  }

  async deletePosition(id: number): Promise<DeleteResult> {
    return this.positionRepository.update(
      { iPositionId: id },
      { bIsDeleted: true },
    );
  }

  async getTeamListAutoComplete(): Promise<Team[]> {
    return this.teamRepository.find({ select: ['iTeamId', 'vName'] });
  }

  async getTeamListByIds(ids: number[]) {
    return this.teamRepository.find({
      where: { iTeamId: In(ids) },
      select: ['iTeamId', 'vName'],
    });
  }
}
