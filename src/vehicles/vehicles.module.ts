import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesModule } from 'src/categories/categories.module';
import { ParkingsModule } from 'src/parkings/parkings.module';
import { VehiclesController } from './vehicles.controller';
import { Vehicle } from './vehicles.model';
import { VehiclesService } from './vehicles.service';
import { CheckVehicleExistsMiddleware } from './middlewares/check-vehicle-exists.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Vehicle]), ParkingsModule, CategoriesModule],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckVehicleExistsMiddleware)
      .exclude({
        path: 'vehicles',
        method: RequestMethod.POST,
      })
      .forRoutes(VehiclesController);
  }
}
