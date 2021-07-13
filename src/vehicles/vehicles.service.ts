import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from 'src/categories/categories.model';
import { Parking } from 'src/parkings/parkings.model';
import { Voucher } from 'src/vouchers/vouchers.model';
import { CreateVehicleDTO } from './dto/create-vehicle.dto';
import { Vehicle } from './vehicles.model';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle)
    private vehicleModel: typeof Vehicle,
  ) {}

  async create(vehicle: CreateVehicleDTO): Promise<Vehicle> {
    const createdVehicle = await this.vehicleModel.create({ ...vehicle, entryTime: new Date() });
    return createdVehicle.get({ plain: true });
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.vehicleModel.findOne({
      where: {
        id,
      },
      raw: true,
      nest: true,
      include: [Voucher, Category, Parking],
    });
  }

  /**
   *  1. calc minutes stayed
   *  2. if multiple of 24 add according to day/night minutes
   *  3.  if vehicleStartTimeMinutes < dayTaxTimeStart =>
   *        if currentTimeMinutes < dayTaxTimeStart
   *          add all minutes to nightMinutes
   *        else
   *          add dayTaxTimeStart - vehicleStartTimeMinutes to nightMinutes
   *          add currentTimeMinutes - dayTaxTimeStart to dayMinutes
   *      else
   *        if currentTimeMinutes < dayTaxTimeEnd
   *          add all minutes to dayMinutes
   *        else
   *          add dayTaxTimeEnd - vehicleStartTimeMinutes to dayMinutes
   *          add currentTimeMinutes - dayTaxTimeEnd to nightMinutes
   * @param id the id of the vehicle
   */
  async calculateTimeStayed(vehicle: Vehicle) {
    const { dayTaxTimeStart, dayTaxTimeEnd } = vehicle.parking;

    let dayMinutes = 0;
    let nightMinutes = 0;

    const exitTime = vehicle.exitTime || new Date();
    const exitTimeMinutes = exitTime.getUTCHours() * 60 + exitTime.getUTCMinutes();
    const vehicleStartTime = vehicle.entryTime;
    const vehicleStartTimeMinutes = vehicleStartTime.getUTCHours() * 60 + vehicleStartTime.getUTCMinutes();
    const vehicleTimeStayed = exitTime.getTime() - vehicleStartTime.getTime();
    const vehicleTimeStayedDays = Math.floor(vehicleTimeStayed / (1000 * 60 * 60 * 24));
    dayMinutes += vehicleTimeStayedDays * 600;
    nightMinutes += vehicleTimeStayedDays * 840;

    // the following code is explained in the function comment
    if (vehicleStartTimeMinutes < dayTaxTimeStart) {
      if (exitTimeMinutes < dayTaxTimeStart) {
        nightMinutes += exitTimeMinutes - vehicleStartTimeMinutes;
      } else {
        nightMinutes += dayTaxTimeStart - vehicleStartTimeMinutes;
        dayMinutes += exitTimeMinutes - dayTaxTimeStart;
      }
    } else {
      if (exitTimeMinutes < dayTaxTimeEnd) {
        dayMinutes += exitTimeMinutes - vehicleStartTimeMinutes;
      } else {
        dayMinutes += dayTaxTimeEnd - vehicleStartTimeMinutes;
        nightMinutes += exitTimeMinutes - dayTaxTimeEnd;
      }
    }

    return {
      dayMinutes,
      nightMinutes,
    };
  }

  async calculateParkingCost(vehicle: Vehicle): Promise<number> {
    // const vehicle = await this.findOne(vehicleId);
    const timeStayed = await this.calculateTimeStayed(vehicle);
    const dayTax = vehicle.category.dayTax;
    const nightTax = vehicle.category.nightTax;
    const dayPrice = (timeStayed.dayMinutes / 60) * dayTax;
    const nightPrice = (timeStayed.nightMinutes / 60) * nightTax;
    let total = dayPrice + nightPrice;
    if (vehicle.voucher) {
      total = total - (vehicle.voucher.discountPercentage / 100) * total;
    }
    return total;
  }

  async deregisterVehicle(id: string) {
    await this.vehicleModel.update({ exitTime: new Date() }, { where: { id } });
  }
}
