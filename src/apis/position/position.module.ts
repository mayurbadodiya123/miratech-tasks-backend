import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Team } from 'src/apis/team/entities/team.entity';
import { TeamModule } from '../team/team.module';
import { PositionRepository } from 'src/repositories/position.repository';

@Module({
  imports: [TeamModule, TypeOrmModule.forFeature([Position, Team])],
  controllers: [PositionController],
  providers: [PositionService, PositionRepository],
  exports: [PositionRepository],
})
export class PositionModule {}
