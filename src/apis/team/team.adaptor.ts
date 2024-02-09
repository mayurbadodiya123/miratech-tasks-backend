import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';

export class TeamAdaptor {
  static toDto(data): CreateTeamDto {
    let team: CreateTeamDto = new CreateTeamDto();
    team.name = data.vName;
    team.team_id = data.iTeamId;
    team.description = data.vDescription;
    return team;
  }

  static toEntity(data): Team {
    let team: Team = new Team();
    team.vName = data.name;
    team.iTeamId = data.team_id;
    team.vDescription = data.description;
    return team;
  }
}
