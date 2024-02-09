import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeProjectDto } from './create-employee-project.dto';

export class UpdateEmployeeProjectDto extends PartialType(CreateEmployeeProjectDto) {}
