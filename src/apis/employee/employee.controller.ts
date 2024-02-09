import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeAdaptor } from './employee.adaptor';

import { message } from 'src/shared/response/response.messages';
import ResponseDTO from 'src/shared/response/response.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AuthenticationGuard } from 'src/core/guards/authentication.guard';

@Controller('employee')
@UseGuards(new AuthenticationGuard())
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('get-team-list') //get-team-list
  async findAllTeam() {
    try {
      const teamList = await this.employeeService.findTeamListAutoComplete();
      const prepareData = teamList.map((res) => EmployeeAdaptor.toTeamDTO(res));
      return ResponseDTO.success(message.team.getTeamSuccess, prepareData);
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Get('get-position-list/:id') //get-position-list
  async findAllPosition(@Param('id') id: string) {
    try {
      const positionList =
        await this.employeeService.findPositionListAutoComplete(+id);
      const prepareData = positionList.map((res) =>
        EmployeeAdaptor.toPositionDTO(res),
      );
      return ResponseDTO.success(message.team.getTeamSuccess, prepareData);
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Post('create') //add
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const employeeReq = createEmployeeDto;
      let codeNumber = 0;

      // Preparing unique employee code
      const prepareEmployeeCode = async (employeeCode: string) => {
        let newEmpCode = employeeCode;
        let isExist = await this.employeeService.getEmployeeCode(newEmpCode);
        if (isExist?.iEmployeeId) {
          codeNumber++;
          newEmpCode = `${employeeReq.first_name}${codeNumber}.${employeeReq.last_name}`;
          return await prepareEmployeeCode(newEmpCode);
        }
        return newEmpCode;
      };

      let employeeCode = `${employeeReq.first_name}.${employeeReq.last_name}`;
      employeeReq.employee_code = await prepareEmployeeCode(employeeCode);
      const prepareEmployeeData = EmployeeAdaptor.toEntity(employeeReq);
      const employee =
        await this.employeeService.createEmployee(prepareEmployeeData);
      const prepareProjectData = EmployeeAdaptor.toEmployeeProjectEntity(
        employee.iEmployeeId,
        employeeReq.projects,
      );
      await this.employeeService.projectAdd(prepareProjectData);

      if (!employee) throw Error('Something went wrong');

      return ResponseDTO.success(message.employee.addEmployeeSuccess, employee);
    } catch (e) {
      console.log(e);
      ResponseDTO.failure(e.message, {});
    }
  }

  @Get('list')
  async findAll() {
    try {
      let employeeList = await this.employeeService.getEmployeeList();
      const positionIds = employeeList.map((e) => e.iPositionId);
      const teamIds = employeeList.map((e) => e.iTeamId);

      let prepareList = employeeList.map((res) => EmployeeAdaptor.toDTO(res));
      const positionList =
        await this.employeeService.getPositionListByIds(positionIds);
      const teamList = await this.employeeService.getTeamListByIds(teamIds);
      prepareList = prepareList.map((p) => ({
        ...p,
        position_name: positionList.length
          ? positionList.find((res) => res.iPositionId === p.position_id)?.vName
          : null,
        team_name: teamList.length
          ? teamList.find((res) => res.iTeamId === p.team_id)?.vName
          : null,
      }));

      if (!employeeList) throw Error('Employee not found');
      return ResponseDTO.success(
        message.employee.getEmployeeSuccess,
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
      const employee = await this.employeeService
        .getEmployeeDetailsById(+id)
        .then()
        .catch();
      const prepareData = EmployeeAdaptor.toDTO(employee);
      const projectList = await this.employeeService.getEmployeeProjects(+id);
      prepareData.projects = EmployeeAdaptor.toEmployeeProjectDTO(
        id,
        projectList,
      );
      const teamDetails = await this.employeeService.getTeamListByIds([
        employee.iTeamId,
      ]);
      const positionDetails = await this.employeeService.getPositionListByIds([
        employee.iPositionId,
      ]);
      prepareData['team_name'] = teamDetails[0].vName;
      prepareData['position_name'] = positionDetails[0].vName;

      if (!employee) throw Error('Employee not found');

      return ResponseDTO.success(
        message.employee.getEmployeeSuccess,
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
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      const employeeReq = updateEmployeeDto;
      const prepareData = EmployeeAdaptor.toEntity(employeeReq);

      const employee = await this.employeeService
        .getEmployeeDetailsById(+id)
        .then()
        .catch();
      if (!employee) throw Error('Employee not found');
      await this.employeeService.projectRemove(+id);

      const prepareProjectData = EmployeeAdaptor.toEmployeeProjectEntity(
        +id,
        employeeReq.projects,
      );
      await this.employeeService.projectAdd(prepareProjectData);

      await this.employeeService.updateEmployee(+id, prepareData);
      return ResponseDTO.success(message.employee.updateEmployeeSuccess, {});
    } catch (e) {
      ResponseDTO.failure(e.message, {});
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const employeeDetails = await this.employeeService.deleteEmployee(+id);
      await this.employeeService.deleteEmployeeProjects(+id);
      if (!employeeDetails) throw Error('Employee not Exist');

      return ResponseDTO.success(message.employee.deleteEmployeeSuccess, {});
    } catch (e) {
      console.log(e);
      ResponseDTO.failure(e, {});
    }
  }
}
