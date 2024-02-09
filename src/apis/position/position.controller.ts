import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import ResponseDTO from 'src/shared/response/response.dto';
import { message } from 'src/shared/response/response.messages';
import { PositionAdaptor } from './position.adaptor';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('create')
  async create(@Body() createPositionDto: CreatePositionDto) {
    try {
      const positionReq = createPositionDto;
      const preparePositionData = PositionAdaptor.toEntity(positionReq);
      const position =
        await this.positionService.createPosition(preparePositionData);
      if (!position) throw Error('Something went wrong');

      return ResponseDTO.success(message.position.addPositionSuccess, position);
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Get('get-team-list')
  async findAllTeam() {
    try {
      const teamList = await this.positionService.getTeamListAutoComplete();
      const prepareData = teamList.map((res) => PositionAdaptor.toTeamDTO(res));
      return ResponseDTO.success(message.team.getTeamSuccess, prepareData);
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Get('list')
  async findAll() {
    try {
      let positionList = await this.positionService
        .getPositionList()
        .then()
        .catch();
      const teamIds = positionList.map((p) => p.iTeamId);
      const teamList = await this.positionService.getTeamListByIds(teamIds);
      positionList = positionList.map((res) => ({
        ...res,
        team_name: teamList.filter((t) => t.iTeamId === res.iTeamId)[0].vName,
      }));
      const prepareList = positionList.map((res) => PositionAdaptor.toDTO(res));
      if (!positionList) throw Error('Position not found');
      return ResponseDTO.success(
        message.position.PositionListSuccess,
        prepareList,
      );
    } catch (e) {
      console.log(e);
      ResponseDTO.failure(e, {});
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const position = await this.positionService.getPositionDetailById(+id);
      const teamId = [position.iTeamId];
      const teamDetails = await this.positionService.getTeamListByIds(teamId);
      position['team_name'] = teamDetails[0].vName;
      const prepareData = PositionAdaptor.toDTO(position);

      if (!position) throw new Error('Position not found');

      return ResponseDTO.success(
        message.position.getPositionSuccess,
        prepareData,
      );
    } catch (e) {
      console.log(e);
      ResponseDTO.failure(e, {});
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ) {
    try {
      const positionReq = updatePositionDto;
      const prepareData = PositionAdaptor.toEntity(positionReq);

      const position = await this.positionService.getPositionDetailById(+id);

      if (!position) throw Error('Position not found');

      const updateData = await this.positionService.updatePosition(
        +id,
        prepareData,
      );
      return ResponseDTO.success(
        message.position.updatePositionSuccess,
        updateData,
      );
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const position = await this.positionService.getPositionDetailById(+id);
      if (!position) throw Error('Position not found');
      await this.positionService.deletePosition(+id);
      return ResponseDTO.success(message.position.deletePositionSuccess, {});
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }
}
