import { Model, Table, Column, HasMany } from 'sequelize-typescript';
import { Vehicle } from 'src/vehicles/vehicles.model';

@Table
export class Voucher extends Model {
  @Column
  type: string;

  @Column
  discountPercentage: number;

  @HasMany(() => Vehicle)
  vehicles: Vehicle[];
}
