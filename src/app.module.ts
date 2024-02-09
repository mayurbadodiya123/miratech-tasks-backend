import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './apis/employee/employee.module';
import { Employee } from './apis/employee/entities/employee.entity';
import { EmployeeProjectsModule } from './apis/employee-projects/employee-projects.module';
import { EmployeeProject } from './apis/employee-projects/entities/employee-project.entity';
import { PositionModule } from './apis/position/position.module';
import { Team } from './apis/team/entities/team.entity';
import { Position } from './apis/position/entities/position.entity';
import { TeamModule } from './apis/team/team.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { CoreService } from './core/services/core/core.service';
import { JwtModule } from '@nestjs/jwt';
import { HttpInterceptor } from './core/interceptors/http/http.interceptor';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'root',
      database: 'miratech-tasks',
      entities: [Employee, EmployeeProject, Team, Position],
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '5h' },
    }),
    EmployeeModule,
    EmployeeProjectsModule,
    TeamModule,
    PositionModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    CoreService,
  ],
})
export class AppModule {}
