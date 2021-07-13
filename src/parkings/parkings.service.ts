import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ParkingDTO } from './dto/parking.dto';
import { Parking } from './parkings.model';

@Injectable()
export class ParkingsService {
  constructor(
    @InjectModel(Parking)
    private parkingModel: typeof Parking,
  ) {}

  async findAll(): Promise<Parking[]> {
    return this.parkingModel.findAll();
  }

  async create(parking: ParkingDTO): Promise<Parking> {
    const parkingInstance = new Parking(parking);
    return parkingInstance.save();
  }

  async findOne(id: string): Promise<Parking> {
    return this.parkingModel.findOne({
      where: {
        id,
      },
    });
  }

  async decrementSpaces(id: string, spaces: number): Promise<Parking> {
    const parking = await this.findOne(id);
    return parking.decrement('spaces', { by: spaces });
  }

  async incrementSpaces(id: string, spaces: number): Promise<Parking> {
    const parking = await this.findOne(id);
    return await parking.increment('spaces', { by: spaces });
  }

  async remove(id: string): Promise<void> {
    const parking = await this.findOne(id);
    await parking.destroy();
  }
}
