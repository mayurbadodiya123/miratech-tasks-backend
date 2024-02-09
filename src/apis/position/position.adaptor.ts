import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';
import { CreateTeamDto } from 'src/apis/team/dto/create-team.dto';

export class PositionAdaptor {
  static toDTO(data): CreatePositionDto {
    let position: CreatePositionDto = new CreatePositionDto();
    position.position_id = data.iPositionId;
    position.name = data.vName;
    position.description = data.tDescription;
    position.team_id = data.iTeamId;
    position.team = data.team_name;
    return position;
  }
  static toEntity(data): Position {
    let position: Position = new Position();
    position.iPositionId = data.position_id;
    position.vName = data.name;
    position.tDescription = data.description;
    position.iTeamId = data.team_id;
    return position;
  }
  static toTeamDTO(data): CreateTeamDto {
    let team: CreateTeamDto = new CreateTeamDto();
    team.team_id = data.iTeamId;
    team.name = data.vName;
    return team;
  }
}
