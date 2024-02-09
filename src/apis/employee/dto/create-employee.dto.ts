import { EmployeeProject } from 'src/apis/employee-projects/entities/employee-project.entity';

export class CreateEmployeeDto {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  code: string;
  position_id: number;
  team_id: number;
  employee_code: string;
  phone_number: string;
  peramanent_address_line1: string;
  peramanent_address_line2: string;
  peramanent_city: string;
  peramanent_state: string;
  peramanent_country: string;
  peramanent_pin_code: string;
  present_address_line1: string;
  present_address_line2: string;
  present_city: string;
  present_state: string;
  present_country: string;
  present_pin_code: string;
  skills: string[];
  position: string;
  team: string;
  salary: string;
  is_address_same: boolean;
  projects: EmployeeProject[];
}
