import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParkingsController } from './parkings.controller';
import { Parking } from './parkings.model';
import { ParkingsService } from './parkings.service';

@Module({
  imports: [SequelizeModule.forFeature([Parking])],
  providers: [ParkingsService],
  controllers: [ParkingsController],
  exports: [ParkingsService],
})
export class ParkingsModule {}
