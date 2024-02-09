import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  iEmployeeId!: number;

  @Column()
  vFirstName!: string;

  @Column()
  vLastName!: string;

  @Column()
  vEmail!: string;

  @Column()
  vEmployeeCode!: string;

  @Column()
  vPhoneNumber!: string;

  @Column()
  vPeramanentAddressLine1!: string;

  @Column()
  vPeramanentAddressLine2!: string;

  @Column()
  vPeramanentCity!: string;

  @Column()
  vPeramanentState!: string;

  @Column()
  vPeramanentCountry!: string;

  @Column()
  vPeramanentPinCode!: string;

  @Column()
  vPresentAddressLine1!: string;

  @Column()
  vPresentAddressLine2!: string;

  @Column()
  vPresentCity!: string;

  @Column()
  vPresentState!: string;

  @Column()
  vPresentCountry!: string;

  @Column()
  vPresentPinCode!: string;

  @Column()
  vSkills!: string;

  @Column()
  vSalary!: string;

  @Column()
  bIsAddressSame!: boolean;

  @Column()
  iTeamId!: number;

  @Column()
  iPositionId!: number;

  @Column({ default: false })
  bIsDeleted!: boolean;
}
