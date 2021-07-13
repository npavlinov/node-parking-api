import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from 'src/categories/categories.model';
import { Parking } from 'src/parkings/parkings.model';
import { Voucher } from 'src/vouchers/vouchers.model';

@Table
export class Vehicle extends Model {
  @ForeignKey(() => Parking)
  @Column
  parkingId: number;

  @ForeignKey(() => Voucher)
  @Column
  voucherId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @Column
  entryTime: Date;

  @Column
  exitTime: Date;

  @BelongsTo(() => Parking)
  parking: Parking;

  @BelongsTo(() => Voucher)
  voucher: Voucher;

  @BelongsTo(() => Category)
  category: Category;
}
