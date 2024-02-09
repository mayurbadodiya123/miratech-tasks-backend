import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { UpdateTeamDto } from './dto/update-team.dto';
import ResponseDTO from 'src/shared/response/response.dto';
import { message } from 'src/shared/response/response.messages';
import { TeamAdaptor } from './team.adaptor';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create')
  async create(@Body() createTeamDto: CreateTeamDto) {
    try {
      const prepareData = TeamAdaptor.toEntity(createTeamDto);
      const createTeam = await this.teamService.createTeam(prepareData);
      if (!createTeam) throw Error('Something went wrong');
      return ResponseDTO.success(message.team.addTeamSuccess, createTeam);
    } catch (e) {
      return ResponseDTO.failure(e.message, {});
    }
  }

  @Get('list')
  async findAll() {
    try {
      const teamList = await this.teamService.getTeamList();
      const prepareList = teamList.map((res) => TeamAdaptor.toDto(res));
      if (!teamList) throw Error('Record not found');
      return ResponseDTO.success(message.team.TeamListSuccess, prepareList);
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const teamDetails = await this.teamService.getTeamDetailsById(+id);
      const prepareData = TeamAdaptor.toDto(teamDetails);
      if (!teamDetails) throw Error('Record not found');
      return ResponseDTO.success(message.team.getTeamSuccess, prepareData);
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    try {
      const prepareData = TeamAdaptor.toEntity(updateTeamDto);
      const teamUpdate = await this.teamService.updateTeam(+id, prepareData);
      const teamGetUpdatedData = await this.teamService.getTeamDetailsById(+id);
      if (!teamUpdate) throw Error('Record not found');

      return ResponseDTO.success(
        message.team.updateTeamSuccess,
        teamGetUpdatedData,
      );
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const teamDetails = await this.teamService.getTeamDetailsById(+id);
      if (!teamDetails) throw Error('Record Not Found');
      const removeTeam = await this.teamService.deleteTeam(+id);
      if (!removeTeam) throw Error('Something went wrong');
      return ResponseDTO.success(message.team.deleteTeamSuccess, {});
    } catch (e) {
      console.log(e);
      ResponseDTO.failure(e, {});
    }
  }
}
