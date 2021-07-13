import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParkingsModule } from './parkings/parkings.module';
import { Parking } from './parkings/parkings.model';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/categories.model';
import { VouchersModule } from './vouchers/vouchers.module';
import { Voucher } from './vouchers/vouchers.model';
import { VehiclesModule } from './vehicles/vehicles.module';
import { Vehicle } from './vehicles/vehicles.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 9998,
      username: 'postgres',
      password: 'postgres',
      database: 'parking-api',
      define: {
        timestamps: false,
      },
      models: [Parking, Category, Voucher, Vehicle],
    }),
    ParkingsModule,
    CategoriesModule,
    VouchersModule,
    VehiclesModule,
  ],
})
export class AppModule {}
