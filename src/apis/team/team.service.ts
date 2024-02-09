import { Injectable } from '@nestjs/common';
import { Team } from './entities/team.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { TeamRepository } from 'src/repositories/team.repository';

@Injectable()
export class TeamService {
  constructor(private teamRepository: TeamRepository) {}

  async createTeam(createTeamDto: Team): Promise<Team> {
    return this.teamRepository.save(this.teamRepository.create(createTeamDto));
  }

  async getTeamList(): Promise<Team[]> {
    return this.teamRepository.find({ where: { bIsDeleted: false } });
  }

  async getTeamDetailsById(id: number): Promise<Team> {
    return this.teamRepository.findOneBy({ iTeamId: id, bIsDeleted: false });
  }

  async updateTeam(id: number, updateTeamDto: Team): Promise<UpdateResult> {
    return this.teamRepository.update({ iTeamId: id }, updateTeamDto);
  }

  async deleteTeam(id: number): Promise<DeleteResult> {
    return this.teamRepository.update({ iTeamId: id }, { bIsDeleted: true });
  }
}
