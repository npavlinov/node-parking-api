import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { throwException } from '../../utils';
import { VehiclesService } from '../vehicles.service';
@Injectable()
export class CheckVehicleExistsMiddleware implements NestMiddleware {
  constructor(private readonly vehiclesService: VehiclesService) {}
  async use(req: any, res: any, next: () => void) {
    const vehicleId = req.params.id;
    const vehicle = await this.vehiclesService.findOne(vehicleId);
    if (!vehicle) {
      throwException(HttpStatus.BAD_REQUEST, 'Vehicle with such id does not exist!');
    }
    req.vehicle = vehicle;
    next();
  }
}
