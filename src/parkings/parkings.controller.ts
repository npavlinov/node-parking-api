import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ParkingDTO } from './dto/parking.dto';
import { Parking } from './parkings.model';
import { ParkingsService } from './parkings.service';

@Controller('parkings')
export class ParkingsController {
  constructor(private readonly parkingsService: ParkingsService) {}

  @Post()
  create(@Body() createUserDto: ParkingDTO): Promise<Parking> {
    return this.parkingsService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Parking[]> {
    return this.parkingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Parking> {
    return this.parkingsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.parkingsService.remove(id);
  }
}
