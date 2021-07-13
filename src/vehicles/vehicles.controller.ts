import { Body, Controller, Get, Param, Post, HttpStatus, ParseIntPipe, Req } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { ParkingsService } from 'src/parkings/parkings.service';
import { CategoriesService } from 'src/categories/categories.service';
import { throwException } from '../utils';

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly parkingsService: ParkingsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  async register(@Body() vehicle: CreateVehicleDTO) {
    const parking = await this.parkingsService.findOne(vehicle.parkingId);
    const category = await this.categoriesService.findOne(vehicle.categoryId);
    if (category.spaceSize > parking.spaces) {
      throwException(HttpStatus.BAD_REQUEST, 'Parking full!');
    }
    const createdVehicle = await this.vehiclesService.create(vehicle);
    const vehicleInstance = await this.vehiclesService.findOne(createdVehicle.id);
    const updatedParking = await this.parkingsService.decrementSpaces(parking.id, category.spaceSize);
    return {
      vehicle: vehicleInstance,
      spaces: updatedParking.spaces,
    };
  }

  @Get(':id/credit')
  async calculateCurrentCredit(@Param('id', new ParseIntPipe()) id: string, @Req() req: any) {
    const cost = await this.vehiclesService.calculateParkingCost(req.vehicle);
    return { cost };
  }

  @Post(':id/deregister')
  async deregister(@Param('id') id: string, @Req() req: any) {
    // const vehicle = await this.vehiclesService.findOne(id);
    const { id: vehicleId, parking, category } = req.vehicle;
    await this.vehiclesService.deregisterVehicle(vehicleId);
    await this.parkingsService.incrementSpaces(parking.id, category.spaceSize);
    const cost = await this.vehiclesService.calculateParkingCost(req.vehicle);
    return { cost };
  }
}
