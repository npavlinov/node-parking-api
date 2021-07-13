import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VouchersController } from './vouchers.controller';
import { Voucher } from './vouchers.model';
import { VouchersService } from './vouchers.service';

@Module({
  imports: [SequelizeModule.forFeature([Voucher])],
  controllers: [VouchersController],
  providers: [VouchersService],
})
export class VouchersModule {}
