import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVoucherDTO } from './dto/create-voucher.dto';
import { Voucher } from './vouchers.model';

@Injectable()
export class VouchersService {
  constructor(
    @InjectModel(Voucher)
    private voucherModel: typeof Voucher,
  ) {}

  async findAll(): Promise<Voucher[]> {
    return this.voucherModel.findAll();
  }

  async create(voucher: CreateVoucherDTO): Promise<Voucher> {
    const parkingInstance = new Voucher(voucher);
    return parkingInstance.save();
  }

  async findOne(id: string): Promise<Voucher> {
    return this.voucherModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
