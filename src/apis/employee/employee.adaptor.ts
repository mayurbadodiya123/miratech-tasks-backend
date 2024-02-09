import { CreateTeamDto } from 'src/apis/team/dto/create-team.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { Team } from 'src/apis/team/entities/team.entity';
import { Position } from 'src/apis/position/entities/position.entity';
import { CreatePositionDto } from 'src/apis/position/dto/create-position.dto';

export class EmployeeAdaptor {
  static toDTO(employeeData: Employee): CreateEmployeeDto {
    let employee: CreateEmployeeDto = new CreateEmployeeDto(); //right think

    employee.employee_id = employeeData.iEmployeeId;
    employee.first_name = employeeData.vFirstName;
    employee.last_name = employeeData.vLastName;
    employee.email = employeeData.vEmail;
    employee.employee_code = employeeData.vEmployeeCode;
    employee.position_id = employeeData.iPositionId;
    employee.team_id = employeeData.iTeamId;
    employee.phone_number = employeeData.vPhoneNumber;
    employee.peramanent_address_line1 = employeeData.vPeramanentAddressLine1;
    employee.peramanent_address_line2 = employeeData.vPeramanentAddressLine2;
    employee.peramanent_city = employeeData.vPeramanentCity;
    employee.peramanent_pin_code = employeeData.vPeramanentPinCode;
    employee.peramanent_state = employeeData.vPeramanentState;
    employee.peramanent_country = employeeData.vPeramanentCountry;
    employee.present_address_line1 = employeeData.vPresentAddressLine1;
    employee.present_address_line2 = employeeData.vPresentAddressLine2;
    employee.present_city = employeeData.vPresentCity;
    employee.present_state = employeeData.vPresentState;
    employee.present_country = employeeData.vPresentCountry;
    employee.peramanent_pin_code = employeeData.vPresentPinCode;
    employee.present_pin_code = employeeData.vPresentPinCode;
    employee.skills = employeeData?.vSkills?.length
      ? employeeData.vSkills.split(',')
      : [];
    employee.salary = employeeData.vSalary;
    employee.is_address_same = employeeData.bIsAddressSame;
    employee.position_id = employeeData.iPositionId;
    employee.team_id = employeeData.iTeamId;

    return employee;
  }
  static toEntity(employeeData): Employee {
    let employee: Employee = new Employee();
    employee.vFirstName = employeeData.first_name;
    employee.vLastName = employeeData.last_name;
    employee.vEmail = employeeData.email;
    employee.vEmployeeCode = employeeData.employee_code;
    employee.iPositionId = employeeData.position_id;
    employee.iTeamId = employeeData.team_id;
    employee.vPhoneNumber = employeeData.phone_number;
    employee.vPeramanentAddressLine1 = employeeData.peramanent_address_line1;
    employee.vPeramanentAddressLine2 = employeeData.peramanent_address_line2;
    employee.vPeramanentCity = employeeData.peramanent_city;
    employee.vPeramanentState = employeeData.peramanent_state;
    employee.vPeramanentCountry = employeeData.peramanent_country;
    employee.vPeramanentPinCode = employeeData.present_pin_code;
    employee.vPresentAddressLine1 = employeeData.present_address_line1;
    employee.vPresentAddressLine2 = employeeData.present_address_line2;
    employee.vPresentCity = employeeData.present_city;
    employee.vPresentState = employeeData.present_state;
    employee.vPresentCountry = employeeData.present_country;
    employee.vPresentPinCode = employeeData.present_pin_code;
    employee.vSkills = employeeData.skills.toString();
    employee.vSalary = employeeData.salary;
    employee.bIsAddressSame = employeeData.is_address_same;

    return employee;
  }

  static toEmployeeProjectEntity(employee_id, data): any {
    const employeeProjects = data.map((ep: any) => ({
      iEmployeeId: employee_id,
      vProjectName: ep.project_name,
      dStartDate: ep.start_date,
      dEndDate: ep.end_date,
    }));
    return employeeProjects;
  }

  static toEmployeeProjectDTO(id, data): any {
    const employeeProjects = data.map((res: any) => ({
      employee_id: id,
      project_id: res.iEmployeeProjectId,
      project_name: res.vProjectName,
      start_date: new Date(res.dStartDate),
      end_date: new Date(res.dEndDate),
    }));
    return employeeProjects;
  }

  static toTeamDTO(data: Team): CreateTeamDto {
    let team: CreateTeamDto = new CreateTeamDto();
    team.name = data.vName;
    team.team_id = data.iTeamId;
    return team;
  }

  static toPositionDTO(data: Position): CreatePositionDto {
    let position: CreatePositionDto = new CreatePositionDto();
    position.name = data.vName;
    position.position_id = data.iPositionId;
    return position;
  }
}
