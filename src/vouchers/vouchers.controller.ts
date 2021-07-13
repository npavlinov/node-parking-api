import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateVoucherDTO } from './dto/create-voucher.dto';
import { Voucher } from './vouchers.model';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Post()
  create(@Body() createUserDto: CreateVoucherDTO): Promise<Voucher> {
    return this.vouchersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<Voucher[]> {
    return this.vouchersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Voucher> {
    return this.vouchersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.vouchersService.remove(id);
  }
}
